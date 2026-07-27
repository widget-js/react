---
category: Hooks
alias: useKeyboardEvent
source: src/hooks/use-keyboard-event.ts
---

# useKeyboardEvent

监听原生键盘事件。

Learn more at `src/hooks/use-keyboard-event.ts`.

::: tip
- 如果需求是快捷键语义，优先考虑 `useShortcutListener`。
:::

## Usage

```ts
import { useKeyboardEvent } from '@widget-js/react'

export function Demo() {
  const state = useKeyboardEvent(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useKeyboardEvent(callback: (event: NativeKeyboardEvent)
```

## API Snapshot

- 导入：`import { useKeyboardEvent } from '@widget-js/react'`

