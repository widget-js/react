---
category: Hooks
alias: useWindowAnimationY
source: src/hooks/use-window-animation.ts
---

# useWindowAnimationY

窗口 Y 轴动画。

Learn more at `src/hooks/use-window-animation.ts`.

## Usage

```ts
import { useWindowAnimationY } from '@widget-js/react'

export function Demo() {
  const state = useWindowAnimationY(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseWindowAnimationOptions {
  spring?: Exclude<SpringOptions, 'from' | 'to' | 'duration'>
  duration?: number
  /**
   * Easing function or cubic bezier points for calculating transition values
   */
  transition?: EasingFunction | CubicBezierPoints
  onComplete?: () => void
  onStop?: () => void
  onStart?: () => void
}

export function useWindowAnimationY(options: UseWindowAnimationOptions)
```

## API Snapshot

- 导入：`import { useWindowAnimationY } from '@widget-js/react'`

