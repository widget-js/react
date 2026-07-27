---
category: Hooks
alias: useWidgetTheme
source: src/hooks/use-widget-theme.ts
---

# useWidgetTheme

单独读取或同步 widget 主题。

Learn more at `src/hooks/use-widget-theme.ts`.

::: tip
- 页面入口已经使用 `useWidget` 时，通常不需要再单独接这层主题能力。
:::

## Usage

```ts
import { useWidgetTheme } from '@widget-js/react'

export function Demo() {
  const state = useWidgetTheme(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseWidgetThemeOptions {
  defaultTheme?: AppTheme
  /**
   * 是否立即注入主题
   */
  immediate?: boolean
  onThemeChanged?: (newValue: AppTheme) => void
}

export function useWidgetTheme(options?: UseWidgetThemeOptions)
```

## API Snapshot

- 导入：`import { useWidgetTheme } from '@widget-js/react'`

