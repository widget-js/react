---
category: Form
alias: WidgetBindShortcutField
source: src/components/form/widget-bind-shortcut-field.tsx
---

# WidgetBindShortcutField

快捷键录制与绑定字段。

Learn more at `src/components/form/widget-bind-shortcut-field.tsx`.

## Usage

```tsx
import { WidgetBindShortcutField } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetBindShortcutField />
  )
}
```

## Type Declarations

```tsx
export interface WidgetBindShortcutFieldProps {
  title?: string
  value?: string
  placeholder?: string
  clearable?: boolean
  onChange?: (value: string) => void
}

export function WidgetBindShortcutField({
  title,
  value = '',
  placeholder = '点击设置快捷键',
  clearable = true,
  onChange,
}: WidgetBindShortcutFieldProps)
```

## API Snapshot

- 导入：`import { WidgetBindShortcutField } from '@widget-js/react'`
- Props:
  - `title?: string`
  - `value?: string`
  - `placeholder?: string`
  - `clearable?: boolean`
  - `onChange?: (value: string) => void`

