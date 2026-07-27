---
category: Hooks
alias: useAppBroadcast
source: src/hooks/use-app-broadcast.ts
---

# useAppBroadcast

监听宿主广播事件。

Learn more at `src/hooks/use-app-broadcast.ts`.

## Usage

```ts
import { useAppBroadcast } from '@widget-js/react'

export function Demo() {
  const state = useAppBroadcast(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useAppBroadcast(events: string[], callback: (event: BroadcastEvent)
```

## API Snapshot

- 导入：`import { useAppBroadcast } from '@widget-js/react'`

