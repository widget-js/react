---
category: Form
alias: WidgetPixelSliderField
source: src/components/form/widget-pixel-slider-field.tsx
---

# WidgetPixelSliderField

带 `px` 语义的数值滑块字段。

Learn more at `src/components/form/widget-pixel-slider-field.tsx`.

## Usage

```tsx
import { WidgetPixelSliderField } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetPixelSliderField />
  )
}
```

## Type Declarations

```tsx
export interface WidgetPixelSliderFieldProps {
  title?: string
  value?: number | string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: string) => void
}

export function WidgetPixelSliderField({
  title = '',
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
}: WidgetPixelSliderFieldProps)
```

## API Snapshot

- 导入：`import { WidgetPixelSliderField } from '@widget-js/react'`
- Props:
  - `title?: string`
  - `value?: number | string`
  - `min?: number`
  - `max?: number`
  - `step?: number`
  - `disabled?: boolean`
  - `onChange?: (value: string) => void`

