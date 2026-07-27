---
category: Hooks
alias: useMouseEvent
source: src/hooks/use-mouse-event.ts
---

# useMouseEvent

监听宿主鼠标事件。

Learn more at `src/hooks/use-mouse-event.ts`.

## Usage

```ts
import { useMouseEvent } from '@widget-js/react'

export function Demo() {
  const state = useMouseEvent(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useMouseEvent(callback: (event: AppMouseEvent)
```

## API Snapshot

- 导入：`import { useMouseEvent } from '@widget-js/react'`

