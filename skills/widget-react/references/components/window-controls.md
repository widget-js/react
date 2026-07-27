---
category: Components
alias: WindowControls
source: src/components/window-controls.tsx
---

# WindowControls

最小化、最大化、关闭按钮组。

Learn more at `src/components/window-controls.tsx`.

::: tip
- 依赖 `BrowserWindowApi`，需要运行在 Widget/Electron 窗口环境。
:::

## Usage

```tsx
import { WindowControls } from '@widget-js/react'

export function Demo() {
  return (
    <WindowControls />
  )
}
```

## Type Declarations

```tsx
export interface WindowControlsProps {
  minimize?: boolean
  maximize?: boolean
  close?: boolean
  floating?: boolean
}

export function WindowControls({
  minimize = true,
  maximize = true,
  close = true,
  floating = true,
}: WindowControlsProps)
```

## API Snapshot

- 导入：`import { WindowControls } from '@widget-js/react'`
- Props:
  - `minimize?: boolean`
  - `maximize?: boolean`
  - `close?: boolean`
  - `floating?: boolean`

