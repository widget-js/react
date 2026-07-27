---
category: Hooks
alias: useDefaultOverlapContextMenu
source: src/hooks/use-default-overlap-context-menu.ts
---

# useDefaultOverlapContextMenu

overlap 默认右键菜单。

Learn more at `src/hooks/use-default-overlap-context-menu.ts`.

::: tip
- 只是要标准 overlap 菜单时，优先它，不要先手写 `useContextMenu`。
:::

## Usage

```ts
import { useDefaultOverlapContextMenu } from '@widget-js/react'

export function Demo() {
  const state = useDefaultOverlapContextMenu(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useDefaultOverlapContextMenu(options?: UseDefaultOverlapContextMenuOption | boolean)
```

## API Snapshot

- 导入：`import { useDefaultOverlapContextMenu } from '@widget-js/react'`

