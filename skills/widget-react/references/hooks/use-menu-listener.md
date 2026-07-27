---
category: Hooks
alias: useMenuListener
source: src/hooks/use-menu-listener.ts
---

# useMenuListener

处理菜单项点击等菜单事件。

Learn more at `src/hooks/use-menu-listener.ts`.

## Usage

```ts
import { useMenuListener } from '@widget-js/react'

export function Demo() {
  const state = useMenuListener(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useMenuListener(callback: (eventType: MenuApiEvent, menu: WidgetMenuItem)
```

## API Snapshot

- 导入：`import { useMenuListener } from '@widget-js/react'`

