---
category: Hooks
alias: useWidgetParams
source: src/hooks/use-widget-params.ts
---

# useWidgetParams

单独读取 widget 参数。

Learn more at `src/hooks/use-widget-params.ts`.

## Usage

```ts
import { useWidgetParams } from '@widget-js/react'

export function Demo() {
  const state = useWidgetParams(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseWidgetParamsOptions {
  /**
   * 在使用浏览器调试时使用，必传参数有：id,name,widthPx,heightPx
   */
  debugParams?: WidgetParams
}

export function useWidgetParams(option?: UseWidgetParamsOptions)
```

## API Snapshot

- 导入：`import { useWidgetParams } from '@widget-js/react'`

