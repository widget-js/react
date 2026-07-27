---
category: Hooks
alias: useWidgetProxyConfig
source: src/hooks/use-widget-proxy-config.ts
---

# useWidgetProxyConfig

读取或更新代理配置。

Learn more at `src/hooks/use-widget-proxy-config.ts`.

## Usage

```ts
import { useWidgetProxyConfig } from '@widget-js/react'

export function Demo() {
  const state = useWidgetProxyConfig(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseProxyConfigOption {
  storageKey?: string
}

export function useWidgetProxyConfig(option?: UseProxyConfigOption)
```

## API Snapshot

- 导入：`import { useWidgetProxyConfig } from '@widget-js/react'`

