---
category: Hooks
alias: useUser
source: src/hooks/use-user.ts
---

# useUser

读取当前登录用户信息。

Learn more at `src/hooks/use-user.ts`.

## Usage

```ts
import { useUser } from '@widget-js/react'

export function Demo() {
  const state = useUser(/* options */)
  return state
}
```

## Type Declarations

```ts
export function useUser(onload?: (user?: User)
```

## API Snapshot

- 导入：`import { useUser } from '@widget-js/react'`

