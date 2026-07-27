---
category: Form
alias: WidgetColorPickerPanel
source: src/components/form/widget-color-picker-panel.tsx
---

# WidgetColorPickerPanel

颜色选择弹层的内部实现组件。

Learn more at `src/components/form/widget-color-picker-panel.tsx`.

::: tip
- 业务页面通常优先用 `WidgetColorField`，不是直接从这个内部组件起手。
:::

## Usage

```tsx
import { WidgetColorPickerPanel } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetColorPickerPanel
      hsva={{} as { h}
      rgba={{} as { r}
      opaqueColor="demo"
      draftValue="demo"
      textValue="demo"
      value="demo"
      colors="demo"
      setTextValue={{} as (value}
      commitFromText={{} as (value}
      normalizeHex={{} as (value}
      onSatValueChange={{} as (s}
      onHueChange={{} as (h}
      onAlphaChange={{} as (a}
      onPresetSelect={{} as (color}
    />
  )
}
```

## Type Declarations

```tsx
export interface WidgetColorPickerPanelProps {
  hsva: { h: number, s: number, v: number, a: number }
  rgba: { r: number, g: number, b: number, a: number }
  opaqueColor: string
  draftValue: string
  textValue: string
  value: string
  colors: string[]
  setTextValue: (value: string) => void
  commitFromText: (value: string) => void
  normalizeHex: (value: string) => string | undefined
  onSatValueChange: (s: number, v: number) => void
  onHueChange: (h: number) => void
  onAlphaChange: (a: number) => void
  onPresetSelect: (color: string) => void
}

export function WidgetColorPickerPanel({
  hsva,
  rgba,
  opaqueColor,
  draftValue,
  textValue,
  value,
  colors,
  setTextValue,
  commitFromText,
  normalizeHex,
  onSatValueChange,
  onHueChange,
  onAlphaChange,
  onPresetSelect,
}: WidgetColorPickerPanelProps)
```

## API Snapshot

- 导入：`import { WidgetColorPickerPanel } from '@widget-js/react'`
- Props:
  - `hsva: { h: number, s: number, v: number, a: number }`
  - `rgba: { r: number, g: number, b: number, a: number }`
  - `opaqueColor: string`
  - `draftValue: string`
  - `textValue: string`
  - `value: string`
  - `colors: string[]`
  - `setTextValue: (value: string) => void`
  - `commitFromText: (value: string) => void`
  - `normalizeHex: (value: string) => string | undefined`
  - `onSatValueChange: (s: number, v: number) => void`
  - `onHueChange: (h: number) => void`
  - `onAlphaChange: (a: number) => void`
  - `onPresetSelect: (color: string) => void`

