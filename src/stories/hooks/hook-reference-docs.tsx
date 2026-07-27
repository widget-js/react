type CalloutType = 'info' | 'tip'

interface HookReferenceCallout {
  type: CalloutType
  content: string
}

interface HookReferenceBlock {
  type: 'paragraph' | 'list'
  content: string | string[]
}

export interface HookReference {
  name: string
  title: string
  category?: string
  alias?: string
  source?: string
  overview: HookReferenceBlock[]
  callouts: HookReferenceCallout[]
  usageCode?: string
  usageLanguage: string
  typeDeclarationsCode?: string
  typeDeclarationsLanguage: string
  apiSnapshot: string[]
}

const referenceModules = import.meta.glob(
  '../../../skills/widget-react/references/hooks/*.md',
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
) as Record<string, string>

const BLANK_LINE_SPLIT_RE = /\n{2,}/
const INLINE_CODE_SPLIT_RE = /(`[^`]+`)/
const LEADING_BULLET_RE = /^- /
const BACKSLASH_RE = /\\/g
const WINDOWS_NEWLINE_RE = /\r\n/g

function trimFenceBlock(block?: string) {
  return block?.trim().replace(WINDOWS_NEWLINE_RE, '\n')
}

function extractFrontmatter(source: string) {
  const normalizedSource = trimFenceBlock(source) ?? ''
  if (!normalizedSource.startsWith('---\n')) {
    return {
      frontmatter: {} as Record<string, string>,
      content: normalizedSource,
    }
  }

  const frontmatterEnd = normalizedSource.indexOf('\n---\n', 4)
  if (frontmatterEnd === -1) {
    return {
      frontmatter: {} as Record<string, string>,
      content: normalizedSource,
    }
  }

  const rawFrontmatter = normalizedSource.slice(4, frontmatterEnd)
  const content = normalizedSource.slice(frontmatterEnd + 5).trim()

  const frontmatter = rawFrontmatter
    .split('\n')
    .reduce<Record<string, string>>((result, line) => {
      const separatorIndex = line.indexOf(':')
      if (separatorIndex === -1) {
        return result
      }

      const key = line.slice(0, separatorIndex).trim()
      const value = line.slice(separatorIndex + 1).trim()
      if (key) {
        result[key] = value
      }
      return result
    }, {})

  return {
    frontmatter,
    content,
  }
}

function extractSection(content: string, title: string) {
  const normalizedContent = trimFenceBlock(content) ?? ''
  const heading = `## ${title}\n`
  const start = normalizedContent.indexOf(heading)
  if (start === -1) {
    return undefined
  }

  const sectionStart = start + heading.length
  const nextSection = normalizedContent.indexOf('\n## ', sectionStart)
  return normalizedContent.slice(
    sectionStart,
    nextSection === -1 ? normalizedContent.length : nextSection,
  ).trim()
}

function removeSection(content: string, title: string) {
  const normalizedContent = trimFenceBlock(content) ?? ''
  const heading = `## ${title}\n`
  const start = normalizedContent.indexOf(heading)
  if (start === -1) {
    return normalizedContent
  }

  const nextSection = normalizedContent.indexOf('\n## ', start + heading.length)
  const before = normalizedContent.slice(0, start).trimEnd()
  const after = nextSection === -1
    ? ''
    : normalizedContent.slice(nextSection).trimStart()

  return [before, after].filter(Boolean).join('\n\n').trim()
}

function extractCodeSection(content: string | undefined) {
  if (!content) {
    return { language: 'ts', code: undefined as string | undefined }
  }

  const normalizedContent = trimFenceBlock(content) ?? ''
  if (!normalizedContent.startsWith('```')) {
    return { language: 'ts', code: normalizedContent }
  }

  const lines = normalizedContent.split('\n')
  const firstLine = lines[0]
  const lastLine = lines.at(-1)
  if (lastLine !== '```') {
    return { language: 'ts', code: normalizedContent }
  }

  return {
    language: firstLine.slice(3).trim() || 'ts',
    code: lines.slice(1, -1).join('\n').trim(),
  }
}

function parseCallouts(content: string) {
  const callouts: HookReferenceCallout[] = []
  const overviewLines: string[] = []
  const lines = (trimFenceBlock(content) ?? '').split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim()
    const marker = line.startsWith(':::') ? line.slice(3).trim() : ''
    if (marker === 'info' || marker === 'tip') {
      const body: string[] = []
      index += 1
      while (index < lines.length && lines[index].trim() !== ':::') {
        body.push(lines[index])
        index += 1
      }

      callouts.push({
        type: marker,
        content: body.join('\n').trim(),
      })
      continue
    }

    overviewLines.push(lines[index])
  }

  return {
    overview: overviewLines.join('\n').trim(),
    callouts,
  }
}

function parseOverviewBlocks(content: string): HookReferenceBlock[] {
  if (!content) {
    return []
  }

  return content
    .split(BLANK_LINE_SPLIT_RE)
    .map(block => block.trim())
    .filter(Boolean)
    .map<HookReferenceBlock>((block) => {
      const lines = block
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)

      if (lines.length > 0 && lines.every(line => line.startsWith('- '))) {
        return {
          type: 'list',
          content: lines.map(line => line.replace(LEADING_BULLET_RE, '').trim()),
        }
      }

      return {
        type: 'paragraph',
        content: block,
      }
    })
}

function parseApiSnapshot(content: string | undefined) {
  if (!content) {
    return []
  }

  return content
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
}

function parseHookReference(name: string, source: string): HookReference {
  const { frontmatter, content } = extractFrontmatter(source)
  const lines = content.split('\n')
  const titleLine = lines.find(line => line.startsWith('# '))
  const title = titleLine?.slice(2).trim() || name
  const titleIndex = titleLine ? lines.indexOf(titleLine) : -1
  const contentWithoutTitle = titleIndex === -1
    ? content.trim()
    : lines.slice(titleIndex + 1).join('\n').trim()

  const usage = extractCodeSection(extractSection(contentWithoutTitle, 'Usage'))
  const typeDeclarations = extractCodeSection(extractSection(contentWithoutTitle, 'Type Declarations'))
  const apiSnapshot = parseApiSnapshot(extractSection(contentWithoutTitle, 'API Snapshot'))

  const overviewSource = [
    'Usage',
    'Type Declarations',
    'API Snapshot',
  ].reduce((currentContent, sectionTitle) => {
    return removeSection(currentContent, sectionTitle)
  }, contentWithoutTitle)

  const { overview, callouts } = parseCallouts(overviewSource)

  return {
    name,
    title,
    category: frontmatter.category,
    alias: frontmatter.alias,
    source: frontmatter.source,
    overview: parseOverviewBlocks(overview),
    callouts,
    usageCode: usage.code,
    usageLanguage: usage.language,
    typeDeclarationsCode: typeDeclarations.code,
    typeDeclarationsLanguage: typeDeclarations.language,
    apiSnapshot,
  }
}

function toHookName(path: string) {
  const normalizedPath = path.replace(BACKSLASH_RE, '/')
  const parts = normalizedPath.split('/')
  const fileName = parts.at(-1) ?? normalizedPath
  return fileName.endsWith('.md') ? fileName.slice(0, -3) : fileName
}

const hookReferenceMap = Object.entries(referenceModules).reduce<Record<string, HookReference>>(
  (result, [path, source]) => {
    const name = toHookName(path)
    result[name] = parseHookReference(name, source)
    return result
  },
  {},
)

function InlineCode({ children }: { children: string }) {
  const segments = children.split(INLINE_CODE_SPLIT_RE).filter(Boolean)

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.startsWith('`') && segment.endsWith('`')) {
          return (
            <code
              key={`${segment}-${index}`}
              className="rounded bg-muted px-1.5 py-0.5 text-[0.9em]"
            >
              {segment.slice(1, -1)}
            </code>
          )
        }

        return <span key={`${segment}-${index}`}>{segment}</span>
      })}
    </>
  )
}

function ReferenceCallout({
  type,
  content,
}: HookReferenceCallout) {
  const label = type === 'info' ? 'Info' : 'Tip'
  const className = type === 'info'
    ? 'border-sky-200/80 bg-sky-50/80 text-sky-950 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100'
    : 'border-emerald-200/80 bg-emerald-50/80 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100'

  return (
    <div className={`rounded-xl border px-4 py-3 ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-wide">{label}</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6">
        <InlineCode>{content}</InlineCode>
      </p>
    </div>
  )
}

function ReferenceCodeBlock({
  language,
  code,
}: {
  language: string
  code: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-zinc-950 text-zinc-50 shadow-sm">
      <div className="border-b border-zinc-800 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
        {language}
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ReferenceMetadata({
  reference,
}: {
  reference: HookReference
}) {
  const items = [
    reference.category ? `category: ${reference.category}` : undefined,
    reference.alias ? `alias: ${reference.alias}` : undefined,
    reference.source ? `source: ${reference.source}` : undefined,
  ].filter(Boolean)

  if (items.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span
          key={item}
          className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function ReferenceOverview({
  blocks,
}: {
  blocks: HookReferenceBlock[]
}) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'list') {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {(block.content as string[]).map(item => (
                <li key={item}>
                  <InlineCode>{item}</InlineCode>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index} className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
            <InlineCode>{block.content as string}</InlineCode>
          </p>
        )
      })}
    </>
  )
}

export function HookReferencePage({
  hookName,
}: {
  hookName: string
}) {
  const reference = hookReferenceMap[hookName]

  if (!reference) {
    return (
      <div className="rounded-2xl border border-dashed bg-background p-6 text-sm text-muted-foreground">
        未找到
        {' '}
        <code>{hookName}</code>
        {' '}
        对应的 reference 文档。
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-2">
      <ReferenceMetadata reference={reference} />

      <header className="space-y-3 rounded-3xl border bg-card/70 p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Hooks
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{reference.title}</h1>
        <ReferenceOverview blocks={reference.overview} />
      </header>

      {reference.callouts.length > 0 && (
        <section className="space-y-3">
          {reference.callouts.map(callout => (
            <ReferenceCallout
              key={`${reference.name}-${callout.type}-${callout.content}`}
              {...callout}
            />
          ))}
        </section>
      )}

      {reference.usageCode && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
          <ReferenceCodeBlock
            language={reference.usageLanguage}
            code={reference.usageCode}
          />
        </section>
      )}

      {reference.typeDeclarationsCode && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Type Declarations</h2>
          <ReferenceCodeBlock
            language={reference.typeDeclarationsLanguage}
            code={reference.typeDeclarationsCode}
          />
        </section>
      )}

      {reference.apiSnapshot.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">API Snapshot</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            {reference.apiSnapshot.map(item => (
              <li key={item}>
                <InlineCode>{item.startsWith('- ') ? item.slice(2) : item}</InlineCode>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
