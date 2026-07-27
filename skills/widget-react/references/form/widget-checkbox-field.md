---
category: Form
alias: WidgetCheckboxField
source: src/components/form/widget-checkbox-field.tsx
---

# WidgetCheckboxField

布尔开关 / 复选字段。

Learn more at `src/components/form/widget-checkbox-field.tsx`.

## Usage

```tsx
import { WidgetCheckboxField } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetCheckboxField />
  )
}
```

## Type Declarations

```tsx
export interface WidgetCheckboxFieldProps {
  title?: string
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function WidgetCheckboxField({
  title = '',
  checked = false,
  disabled = false,
  onCheckedChange,
}: WidgetCheckboxFieldProps)
```

## API Snapshot

- 导入：`import { WidgetCheckboxField } from '@widget-js/react'`
- Props:
  - `title?: string`
  - `checked?: boolean`
  - `disabled?: boolean`
  - `onCheckedChange?: (checked: boolean) => void`

