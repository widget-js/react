---
category: Form
alias: WidgetColorField
source: src/components/form/widget-color-field.tsx
---

# WidgetColorField

颜色输入与颜色面板字段。

Learn more at `src/components/form/widget-color-field.tsx`.

## Usage

```tsx
import { WidgetColorField } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetColorField />
  )
}
```

## Type Declarations

```tsx
export interface WidgetColorFieldProps {
  title?: string
  value?: string
  predefine?: string[]
  disabled?: boolean
  onChange?: (value: string) => void
}

export function WidgetColorField({
  title = '',
  value = '#FFFFFF',
  predefine,
  disabled = false,
  onChange,
}: WidgetColorFieldProps)
```

## API Snapshot

- 导入：`import { WidgetColorField } from '@widget-js/react'`
- Props:
  - `title?: string`
  - `value?: string`
  - `predefine?: string[]`
  - `disabled?: boolean`
  - `onChange?: (value: string) => void`

