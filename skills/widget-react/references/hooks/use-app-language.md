---
category: Hooks
alias: useAppLanguage
source: src/hooks/use-app-language.ts
---

# useAppLanguage

单独读取或同步应用语言。

Learn more at `src/hooks/use-app-language.ts`.

## Usage

```ts
import { useAppLanguage } from '@widget-js/react'

export function Demo() {
  const state = useAppLanguage(/* options */)
  return state
}
```

## Type Declarations

```ts
export interface UseAppLanguageOption {
  onLoad?: (code: string) => void
  onChange?: (code: string) => void
}

export function useAppLanguage(options: UseAppLanguageOption = {})
```

## API Snapshot

- 导入：`import { useAppLanguage } from '@widget-js/react'`

