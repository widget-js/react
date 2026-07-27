---
category: Hooks
alias: useAutoHideOnEdge
source: src/hooks/use-auto-hide-on-edge.ts
---

# useAutoHideOnEdge

贴边隐藏、显示和吸边校正。

Learn more at `src/hooks/use-auto-hide-on-edge.ts`.

::: tip
- 依赖窗口与鼠标宿主 API，适合 overlap 悬浮窗行为。
:::

## Usage

```ts
import { useAutoHideOnEdge } from '@widget-js/react'

export function Demo() {
  const state = useAutoHideOnEdge(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseAutoHideOnEdgeOptions {
  /**
   * 状态存储
   * @see `https://vueuse.org/core/useStorage`
   */
  storageKey: string
  transition?: EasingFunction | CubicBezierPoints
}

export function useAutoHideOnEdge(options: UseAutoHideOnEdgeOptions)
```

## API Snapshot

- 导入：`import { useAutoHideOnEdge } from '@widget-js/react'`

