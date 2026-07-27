---
category: Form
alias: WidgetFontSelector
source: src/components/form/widget-font-selector.tsx
---

# WidgetFontSelector

字体选择字段。

Learn more at `src/components/form/widget-font-selector.tsx`.

## Usage

```tsx
import { WidgetFontSelector } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetFontSelector />
  )
}
```

## Type Declarations

```tsx
export interface WidgetFontSelectorProps {
  value?: string
  disabled?: boolean
  placeholder?: string
  options?: string[]
  onChange?: (value: string | undefined) => void
}

export function WidgetFontSelector({
  value,
  disabled = false,
  placeholder = '默认字体',
  options,
  onChange,
}: WidgetFontSelectorProps)
```

## API Snapshot

- 导入：`import { WidgetFontSelector } from '@widget-js/react'`
- Props:
  - `value?: string`
  - `disabled?: boolean`
  - `placeholder?: string`
  - `options?: string[]`
  - `onChange?: (value: string | undefined) => void`

