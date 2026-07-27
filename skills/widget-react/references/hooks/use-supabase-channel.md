---
category: Hooks
alias: useSupabaseChannel
source: src/hooks/use-supabase-channel.ts
---

# useSupabaseChannel

订阅 Supabase 实时通道。

Learn more at `src/hooks/use-supabase-channel.ts`.

## Usage

```ts
import { useSupabaseChannel } from '@widget-js/react'

export function Demo() {
  const state = useSupabaseChannel(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useSupabaseChannel(channelName: string, onCallback: (payload: any)
```

## API Snapshot

- 导入：`import { useSupabaseChannel } from '@widget-js/react'`

