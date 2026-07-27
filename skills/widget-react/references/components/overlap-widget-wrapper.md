---
category: Components
alias: OverlapWidgetWrapper
source: src/components/overlap-widget-wrapper.tsx
---

# OverlapWidgetWrapper

overlap 悬浮挂件外层容器，内置纵向过渡。

Learn more at `src/components/overlap-widget-wrapper.tsx`.

::: tip
- 适合 overlap 页面壳层，不适合普通桌面挂件。
:::

## Usage

```tsx
import { OverlapWidgetWrapper } from '@widget-js/react'

export function Demo() {
  return (
    <OverlapWidgetWrapper />
  )
}
```

## Type Declarations

```tsx
export interface OverlapWidgetWrapperProps {
  shadowColor?: string
  padding?: number
  children?: ReactNode
}

export function OverlapWidgetWrapper(props: OverlapWidgetWrapperProps)
```

## API Snapshot

- 导入：`import { OverlapWidgetWrapper } from '@widget-js/react'`
- Props:
  - `shadowColor?: string`
  - `padding?: number`
  - `children?: ReactNode`

