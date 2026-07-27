---
category: Hooks
alias: useIpcListener
source: src/hooks/use-ipc-listener.ts
---

# useIpcListener

监听 IPC channel。

Learn more at `src/hooks/use-ipc-listener.ts`.

## Usage

```ts
import { useIpcListener } from '@widget-js/react'

export function Demo() {
  const state = useIpcListener(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useIpcListener(channel: string,
  callback: (...args: any[])
```

## API Snapshot

- 导入：`import { useIpcListener } from '@widget-js/react'`

