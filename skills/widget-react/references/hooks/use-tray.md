---
category: Hooks
alias: useTray
source: src/hooks/use-tray.ts
---

# useTray

托盘菜单和托盘交互。

Learn more at `src/hooks/use-tray.ts`.

::: tip
- 依赖宿主托盘环境。
:::

## Usage

```ts
import { useTray } from '@widget-js/react'

export function Demo() {
  const state = useTray(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseTrayOptions {
  image: string
  tooltip: string
  menu?: WidgetMenuItem[]
  onClick?: () => void
  onRightClick?: () => void
  onMiddleClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function useTray(options: UseTrayOptions)
```

## API Snapshot

- 导入：`import { useTray } from '@widget-js/react'`

