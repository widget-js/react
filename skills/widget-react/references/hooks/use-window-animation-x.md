---
category: Hooks
alias: useWindowAnimationX
source: src/hooks/use-window-animation.ts
---

# useWindowAnimationX

窗口 X 轴动画。

Learn more at `src/hooks/use-window-animation.ts`.

## Usage

```ts
import { useWindowAnimationX } from '@widget-js/react'

export function Demo() {
  const state = useWindowAnimationX(/* options */)
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

export function useWindowAnimationX(options: UseWindowAnimationOptions)
```

## API Snapshot

- 导入：`import { useWindowAnimationX } from '@widget-js/react'`

