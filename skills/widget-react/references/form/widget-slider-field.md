---
category: Form
alias: WidgetSliderField
source: src/components/form/widget-slider-field.tsx
---

# WidgetSliderField

一般数值滑块字段。

Learn more at `src/components/form/widget-slider-field.tsx`.

## Usage

```tsx
import { WidgetSliderField } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetSliderField />
  )
}
```

## Type Declarations

```tsx
export interface WidgetSliderFieldProps {
  title?: string
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: number) => void
}

export function WidgetSliderField({
  title = '',
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
}: WidgetSliderFieldProps)
```

## API Snapshot

- 导入：`import { WidgetSliderField } from '@widget-js/react'`
- Props:
  - `title?: string`
  - `value?: number`
  - `min?: number`
  - `max?: number`
  - `step?: number`
  - `disabled?: boolean`
  - `onChange?: (value: number) => void`

