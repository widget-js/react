import { useId } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { WidgetFormField } from './widget-form-field'

export interface WidgetCheckboxFieldProps {
  title?: string
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function WidgetCheckboxField({
  title = '',
  checked = false,
  disabled = false,
  onCheckedChange,
}: WidgetCheckboxFieldProps) {
  const id = useId()

  return (
    <WidgetFormField title={title} htmlFor={id} contentClassName="justify-start">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={value => onCheckedChange?.(value === true)}
      />
    </WidgetFormField>
  )
}
