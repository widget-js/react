---
category: Form
alias: WidgetThemeForm
source: src/components/form/widget-theme-form.tsx
---

# WidgetThemeForm

统一主题配置表单。

Learn more at `src/components/form/widget-theme-form.tsx`.

::: tip
- 适合把颜色、字体、背景和圆角配置集中在一个表单里编辑。
:::

## Usage

```tsx
import { WidgetThemeForm } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetThemeForm
      themeOption={{} as WidgetThemeOption}
      value={{} as AppTheme}
    />
  )
}
```

## Type Declarations

```tsx
export interface WidgetThemeFormProps {
  themeOption: WidgetThemeOption
  value: AppTheme
  onChange?: (value: AppTheme) => void
  showSectionHeader?: boolean
  className?: string
}

export function WidgetThemeForm({
  themeOption,
  value,
  onChange,
  showSectionHeader = true,
  className,
}: WidgetThemeFormProps)
```

## API Snapshot

- 导入：`import { WidgetThemeForm } from '@widget-js/react'`
- Props:
  - `themeOption: WidgetThemeOption`
  - `value: AppTheme`
  - `onChange?: (value: AppTheme) => void`
  - `showSectionHeader?: boolean`
  - `className?: string`

