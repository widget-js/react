---
category: Hooks
alias: useWidget
source: src/hooks/use-widget.ts
---

# useWidget

页面级 widget 入口状态。

Learn more at `src/hooks/use-widget.ts`.

::: tip
- 大多数页面优先从这个 hook 起手，而不是手写参数、主题和语言同步。
:::

## Usage

```ts
import { useWidget } from '@widget-js/react'

export function Demo() {
  const state = useWidget(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useWidget(options?: UseWidgetOptions)
```

## API Snapshot

- 导入：`import { useWidget } from '@widget-js/react'`

