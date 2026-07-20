import type { CSSProperties, ReactNode } from 'react'
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { cn } from '@/lib/utils'

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
}: WidgetFormFieldProps) {
  const labelStyle: CSSProperties | undefined = labelWidth === undefined
    ? undefined
    : {
        width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
        flex: '0 0 auto',
      }

  return (
    <FieldGroup>
      <Field orientation="responsive" className={className}>
        {title !== undefined && (
          <FieldLabel
            htmlFor={htmlFor}
            className="shrink-0 whitespace-nowrap md:justify-start"
            style={labelStyle}
          >
            {title}
          </FieldLabel>
        )}
        <FieldContent
          className={cn('min-w-0 flex-1 flex-row items-center justify-end gap-3', contentClassName)}
        >
          {children}
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
