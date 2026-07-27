---
category: Components
alias: WidgetWrapper
source: src/components/widget-wrapper.tsx
---

# WidgetWrapper

普通桌面挂件外壳容器。

Learn more at `src/components/widget-wrapper.tsx`.

::: tip
- 普通桌面挂件优先用它，overlap 模式改用 `OverlapWidgetWrapper`。
:::

## Usage

```tsx
import { WidgetWrapper } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetWrapper />
  )
}
```

## Type Declarations

```tsx
export interface WidgetWrapperProps {
  shadowColor?: string
  padding?: number
  children?: ReactNode
  background?: ReactNode
}

export function WidgetWrapper(props: WidgetWrapperProps)
```

## API Snapshot

- 导入：`import { WidgetWrapper } from '@widget-js/react'`
- Props:
  - `shadowColor?: string`
  - `padding?: number`
  - `children?: ReactNode`
  - `background?: ReactNode`

