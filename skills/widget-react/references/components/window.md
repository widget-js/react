---
category: Components
alias: Window
source: src/components/window.tsx
---

# Window

标准窗口化页面骨架。

Learn more at `src/components/window.tsx`.

::: tip
- 适合配置页、设置页、管理页这类固定标题栏布局。
:::

## Usage

```tsx
import { Window } from '@widget-js/react'

export function Demo() {
  return (
    <Window
      title="Demo"
    >
      <div />
    </Window>
  )
}
```

## Type Declarations

```tsx
export interface WindowProps {
  title: ReactNode
  children: ReactNode
  footer?: ReactNode
}

export function Window({ title, children, footer }: WindowProps)
```

## API Snapshot

- 导入：`import { Window } from '@widget-js/react'`
- Props:
  - `title: ReactNode`
  - `children: ReactNode`
  - `footer?: ReactNode`

