import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Slider } from '@/components/ui/slider'

function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export interface WidgetSliderFieldProps {
  title?: string
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: number) => void
}

export function WidgetSliderField({
  title = '',
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
}: WidgetSliderFieldProps) {
  const sliderValue = clampValue(value ?? min, min, max)

  return (
    <FieldGroup>
      <Field
        orientation="responsive"
        className="items-center"
        data-disabled={disabled ? true : undefined}
      >
        {title !== undefined && (
          <FieldLabel className="shrink-0 whitespace-nowrap md:justify-start">
            {title}
          </FieldLabel>
        )}
        <FieldContent className="min-w-0 flex-1 flex-row items-center justify-end gap-2">
          <div className="flex w-full items-center gap-2">
            <div className="flex flex-1 items-center">
              <Slider
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className="w-full max-w-sm"
                value={[sliderValue]}
                onValueChange={nextValue => onChange?.(clampValue(nextValue[0] ?? min, min, max))}
              />
            </div>
            <div className="shrink-0 text-right text-sm tabular-nums text-muted-foreground">
              {sliderValue}
            </div>
          </div>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
