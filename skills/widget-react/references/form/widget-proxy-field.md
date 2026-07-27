---
category: Form
alias: WidgetProxyField
source: src/components/form/widget-proxy-field.tsx
---

# WidgetProxyField

代理协议、地址、端口配置字段。

Learn more at `src/components/form/widget-proxy-field.tsx`.

## Usage

```tsx
import { WidgetProxyField } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetProxyField />
  )
}
```

## Type Declarations

```tsx
export interface WidgetProxyFieldProps {
  protocol?: ProxyProtocol
  host?: string
  port?: string
  disabled?: boolean
  locale?: string
  labelWidth?: string | number
  onProtocolChange?: (value: ProxyProtocol) => void
  onHostChange?: (value: string) => void
  onPortChange?: (value: string) => void
}

export function WidgetProxyField({
  protocol,
  host = '',
  port = '',
  disabled = false,
  locale,
  labelWidth,
  onProtocolChange,
  onHostChange,
  onPortChange,
}: WidgetProxyFieldProps)
```

## API Snapshot

- 导入：`import { WidgetProxyField } from '@widget-js/react'`
- Props:
  - `protocol?: ProxyProtocol`
  - `host?: string`
  - `port?: string`
  - `disabled?: boolean`
  - `locale?: string`
  - `labelWidth?: string | number`
  - `onProtocolChange?: (value: ProxyProtocol) => void`
  - `onHostChange?: (value: string) => void`
  - `onPortChange?: (value: string) => void`

