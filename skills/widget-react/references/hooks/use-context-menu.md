---
category: Hooks
alias: useContextMenu
source: src/hooks/use-context-menu.ts
---

# useContextMenu

自定义右键菜单结构和回调。

Learn more at `src/hooks/use-context-menu.ts`.

## Usage

```ts
import { useContextMenu } from '@widget-js/react'

export function Demo() {
  const state = useContextMenu(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseMenuOptions {
  menus: WidgetMenuItem[] | Promise<WidgetMenuItem[]>
  onMenuClick?: (menu: WidgetMenuItem) => void
  onMenuCheckChanged?: (menu: WidgetMenuItem, checked: boolean) => void
}

export function useContextMenu(options: UseMenuOptions)
```

## API Snapshot

- 导入：`import { useContextMenu } from '@widget-js/react'`

