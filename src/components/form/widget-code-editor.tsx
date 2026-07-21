import type { editor as MonacoEditorNamespace } from 'monaco-editor'
import type { CSSProperties, ReactNode } from 'react'
import Editor from '@monaco-editor/react'
import { Copy } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { CSS } from '@/components/logos/css'
import { JavaScript } from '@/components/logos/javascript'
import { TypeScript } from '@/components/logos/typescript'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { cn } from '@/lib/utils'

type ValidationMarker = Pick<
  MonacoEditorNamespace.IMarker,
  'message' | 'severity' | 'startLineNumber' | 'startColumn'
>

type SupportedCodeLanguage = 'css' | 'javascript' | 'typescript'

export interface WidgetCodeEditorProps {
  title?: ReactNode
  value?: string
  language?: SupportedCodeLanguage
  description?: ReactNode
  placeholder?: string
  height?: number | string
  labelWidth?: string | number
  className?: string
  contentClassName?: string
  readOnly?: boolean
  readonly?: boolean
  onChange?: (value: string) => void
}

let themeConfigured = false
const MONACO_ERROR_SEVERITY = 8
const LINE_BREAK_REGEX = /\r\n|\r|\n/

function getLanguageMeta(language: SupportedCodeLanguage) {
  switch (language) {
    case 'javascript':
      return {
        label: 'JavaScript',
        Logo: JavaScript,
      }
    case 'typescript':
      return {
        label: 'TypeScript',
        Logo: TypeScript,
      }
    case 'css':
    default:
      return {
        label: 'CSS',
        Logo: CSS,
      }
  }
}

function toCssSize(value: number | string | undefined, fallback: string) {
  if (value === undefined) {
    return fallback
  }

  return typeof value === 'number' ? `${value}px` : value
}

function formatMarker(marker: ValidationMarker) {
  return `Line ${marker.startLineNumber}, Col ${marker.startColumn}: ${marker.message}`
}

function getLineCount(value: string) {
  if (value.length === 0) {
    return 1
  }

  return value.split(LINE_BREAK_REGEX).length
}

function getLabelStyle(labelWidth: string | number | undefined): CSSProperties | undefined {
  if (labelWidth === undefined) {
    return undefined
  }

  return {
    width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
    flex: '0 0 auto',
  }
}

async function copyText(value: string) {
  await navigator.clipboard.writeText(value)
}

export function WidgetCodeEditor({
  title,
  value = '',
  language = 'css',
  description,
  placeholder = 'Write CSS here...',
  height = 240,
  labelWidth,
  className,
  contentClassName,
  readOnly,
  readonly,
  onChange,
}: WidgetCodeEditorProps) {
  const editorId = useId()
  const isReadOnly = readOnly ?? readonly ?? false
  const [markers, setMarkers] = useState<ValidationMarker[]>([])

  const { label: languageLabel, Logo } = useMemo(() => getLanguageMeta(language), [language])
  const labelStyle = useMemo(() => getLabelStyle(labelWidth), [labelWidth])
  const editorHeight = useMemo(() => toCssSize(height, '240px'), [height])
  const syntaxErrors = useMemo(
    () => markers.filter(marker => marker.severity === MONACO_ERROR_SEVERITY),
    [markers],
  )
  const lineCount = useMemo(() => getLineCount(value), [value])
  const characterCount = value.length
  const statusErrorText = useMemo(() => {
    if (syntaxErrors.length === 0) {
      return '无错误'
    }

    return formatMarker(syntaxErrors[0])
  }, [syntaxErrors])

  return (
    <FieldGroup>
      <Field
        orientation="responsive"
        data-invalid={syntaxErrors.length > 0 ? true : undefined}
        className={className}
      >
        {title !== undefined && (
          <FieldLabel
            className="shrink-0 whitespace-nowrap md:justify-start"
            style={labelStyle}
          >
            {title}
          </FieldLabel>
        )}
        <FieldContent className={cn('min-w-0 flex-1 gap-2', contentClassName)}>
          <div
            id={editorId}
            aria-invalid={syntaxErrors.length > 0}
            className={cn(
              'w-full min-w-0 overflow-hidden rounded-lg border border-input bg-background transition-[border-color,box-shadow] shadow-xs',
              'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20',
              syntaxErrors.length > 0 && 'border-destructive ring-3 ring-destructive/20',
              isReadOnly && 'bg-muted/30',
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Logo className="size-4 shrink-0" />
                <span className="font-medium text-foreground">{languageLabel}</span>
                {isReadOnly && (
                  <span className="whitespace-nowrap rounded-md border border-border bg-background px-2 py-0.5">
                    Read only
                  </span>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="shrink-0"
                aria-label={`复制 ${languageLabel}`}
                title={`复制 ${languageLabel}`}
                onClick={() => {
                  void copyText(value)
                }}
              >
                <Copy />
              </Button>
            </div>
            <Editor
              width="100%"
              height={editorHeight}
              language={language}
              theme="widget-css-editor"
              value={value}
              beforeMount={(monacoInstance) => {
                if (language === 'css') {
                  monacoInstance.languages.css.cssDefaults.setDiagnosticsOptions({
                    validate: true,
                  })
                }

                if (!themeConfigured) {
                  monacoInstance.editor.defineTheme('widget-css-editor', {
                    base: 'vs',
                    inherit: true,
                    rules: [],
                    colors: {
                      'editor.background': '#00000000',
                      'editor.lineHighlightBackground': '#F4F4F520',
                    },
                  })
                  themeConfigured = true
                }
              }}
              loading={(
                <div className="flex h-full min-h-40 items-center justify-center text-sm text-muted-foreground">
                  Loading editor...
                </div>
              )}
              onChange={nextValue => onChange?.(nextValue ?? '')}
              onValidate={(nextMarkers) => {
                setMarkers(nextMarkers)
              }}
              options={{
                ariaLabel: typeof title === 'string' ? title : `${languageLabel} code editor`,
                automaticLayout: true,
                contextmenu: !isReadOnly,
                fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
                fontSize: 13,
                formatOnPaste: !isReadOnly,
                formatOnType: !isReadOnly,
                guides: {
                  indentation: true,
                },
                lineNumbersMinChars: 3,
                minimap: { enabled: false },
                padding: { top: 12, bottom: 12 },
                placeholder,
                readOnly: isReadOnly,
                renderLineHighlight: 'line',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                scrollbar: {
                  alwaysConsumeMouseWheel: false,
                  useShadows: false,
                },
                tabSize: 2,
                wordWrap: 'on',
              }}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              <span className="min-w-0 flex-1 truncate" title={statusErrorText}>
                {statusErrorText}
              </span>
              <span className="shrink-0 text-border">|</span>
              <span className="shrink-0 whitespace-nowrap">
                {lineCount}
                {' '}
                行
              </span>
              <span className="shrink-0 text-border">|</span>
              <span className="shrink-0 whitespace-nowrap">
                {characterCount}
                {' '}
                字符
              </span>
            </div>
          </div>
          {description && (
            <FieldDescription>{description}</FieldDescription>
          )}
          <FieldError
            errors={syntaxErrors.map(marker => ({ message: formatMarker(marker) }))}
          />
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
