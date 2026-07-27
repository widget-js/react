---
category: Hooks
alias: useShortcutListener
source: src/hooks/use-shortcut-listener.ts
---

# useShortcutListener

监听快捷键触发结果。

Learn more at `src/hooks/use-shortcut-listener.ts`.

## Usage

```ts
import { useShortcutListener } from '@widget-js/react'

export function Demo() {
  const state = useShortcutListener(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useShortcutListener(callback: (shortcut: string)
```

## API Snapshot

- 导入：`import { useShortcutListener } from '@widget-js/react'`

