---
category: Form
alias: WidgetCodeEditor
source: src/components/form/widget-code-editor.tsx
---

# WidgetCodeEditor

CSS / JS / TS 代码编辑字段。

Learn more at `src/components/form/widget-code-editor.tsx`.

## Usage

```tsx
import { WidgetCodeEditor } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetCodeEditor />
  )
}
```

## Type Declarations

```tsx
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
}: WidgetCodeEditorProps)
```

## API Snapshot

- 导入：`import { WidgetCodeEditor } from '@widget-js/react'`
- Props:
  - `title?: ReactNode`
  - `value?: string`
  - `language?: SupportedCodeLanguage`
  - `description?: ReactNode`
  - `placeholder?: string`
  - `height?: number | string`
  - `labelWidth?: string | number`
  - `className?: string`
  - `contentClassName?: string`
  - `readOnly?: boolean`
  - `readonly?: boolean`
  - `onChange?: (value: string) => void`

