---
category: Form
alias: WidgetFormField
source: src/components/form/widget-form-field.tsx
---

# WidgetFormField

字段布局骨架组件。

Learn more at `src/components/form/widget-form-field.tsx`.

::: tip
- 新增 `Widget*Field` 时优先复用这个骨架。
:::

## Usage

```tsx
import { WidgetFormField } from '@widget-js/react'

export function Demo() {
  return (
    <WidgetFormField
    >
      <div />
    </WidgetFormField>
  )
}
```

## Type Declarations

```tsx
export interface WidgetFormFieldProps {
  title?: ReactNode
  htmlFor?: string
  labelWidth?: string | number
  className?: string
  contentClassName?: string
  children: ReactNode
}

export function WidgetFormField({
  title,
  htmlFor,
  labelWidth,
  className,
  contentClassName,
  children,
}: WidgetFormFieldProps)
```

## API Snapshot

- 导入：`import { WidgetFormField } from '@widget-js/react'`
- Props:
  - `title?: ReactNode`
  - `htmlFor?: string`
  - `labelWidth?: string | number`
  - `className?: string`
  - `contentClassName?: string`
  - `children: ReactNode`

