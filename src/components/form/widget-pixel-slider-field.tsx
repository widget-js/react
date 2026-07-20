import { WidgetSliderField } from './widget-slider-field'

function parsePixelValue(value: number | string | undefined, min: number) {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const parsedValue = Number.parseInt(value.replace('px', ''), 10)
    if (!Number.isNaN(parsedValue)) {
      return parsedValue
    }
  }

  return min
}

export interface WidgetPixelSliderFieldProps {
  title?: string
  value?: number | string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: string) => void
}

export function WidgetPixelSliderField({
  title = '',
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
}: WidgetPixelSliderFieldProps) {
  return (
    <WidgetSliderField
      title={title}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={parsePixelValue(value, min)}
      onChange={nextValue => onChange?.(`${nextValue}px`)}
    />
  )
}
