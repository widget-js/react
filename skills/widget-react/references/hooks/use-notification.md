---
category: Hooks
alias: useNotification
source: src/hooks/use-notification.ts
---

# useNotification

接收宿主通知。

Learn more at `src/hooks/use-notification.ts`.

## Usage

```ts
import { useNotification } from '@widget-js/react'

export function Demo() {
  const state = useNotification(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useNotification(callback: (notification?: AppNotification)
```

## API Snapshot

- 导入：`import { useNotification } from '@widget-js/react'`

