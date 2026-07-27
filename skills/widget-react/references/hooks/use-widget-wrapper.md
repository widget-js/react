---
category: Hooks
alias: useWidgetWrapper
source: src/hooks/use-widget-wrapper.ts
---

# useWidgetWrapper

给包装层 DOM 写样式变量。

Learn more at `src/hooks/use-widget-wrapper.ts`.

## Usage

```ts
import { useWidgetWrapper } from '@widget-js/react'

export function Demo() {
  const state = useWidgetWrapper(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface WidgetWrapperStyleProps {
  shadowColor?: string
  padding?: number
}

export function useWidgetWrapper(props: WidgetWrapperStyleProps)
```

## API Snapshot

- 导入：`import { useWidgetWrapper } from '@widget-js/react'`

