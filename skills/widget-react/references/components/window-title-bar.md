---
category: Components
alias: WindowTitleBar
source: src/components/window-title-bar.tsx
---

# WindowTitleBar

窗口顶部标题栏，内置 `WindowControls`。

Learn more at `src/components/window-title-bar.tsx`.

::: tip
- 适合只接标题栏；完整窗口布局优先直接用 `Window`。
:::

## Usage

```tsx
import { WindowTitleBar } from '@widget-js/react'

export function Demo() {
  return (
    <WindowTitleBar
      title="Demo"
    />
  )
}
```

## Type Declarations

```tsx
export interface WindowTitleBarProps {
  title: ReactNode
  className?: string
  minimize?: boolean
  maximize?: boolean
  close?: boolean
  floating?: boolean
}

export function WindowTitleBar({
  title,
  className,
  minimize = true,
  maximize = true,
  close = true,
  floating = false,
}: WindowTitleBarProps)
```

## API Snapshot

- 导入：`import { WindowTitleBar } from '@widget-js/react'`
- Props:
  - `title: ReactNode`
  - `className?: string`
  - `minimize?: boolean`
  - `maximize?: boolean`
  - `close?: boolean`
  - `floating?: boolean`

