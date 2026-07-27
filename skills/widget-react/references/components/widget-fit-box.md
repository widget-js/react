---
category: Components
alias: WidgetFitBox
source: src/components/widget-fit-box.tsx
---

# WidgetFitBox

按目标尺寸缩放内容的适配容器。

Learn more at `src/components/widget-fit-box.tsx`.

::: tip
- 适合做 widget 预览、缩略展示或定尺寸适配。
:::

## Usage

```tsx
import { WidgetFitBox } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetFitBox />
  )
}
```

## Type Declarations

```tsx
export interface WidgetFitBoxProps {
  width?: number
  height?: number
  widgetHeight?: number
  widgetWidth?: number
  children?: ReactNode
}

export function WidgetFitBox(props: WidgetFitBoxProps)
```

## API Snapshot

- 导入：`import { WidgetFitBox } from '@widget-js/react'`
- Props:
  - `width?: number`
  - `height?: number`
  - `widgetHeight?: number`
  - `widgetWidth?: number`
  - `children?: ReactNode`

