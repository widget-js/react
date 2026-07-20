import type { ReactNode } from 'react'
import { useWidgetScale } from '@/hooks/use-widget'

export interface WidgetFitBoxProps {
  width?: number
  height?: number
  widgetHeight?: number
  widgetWidth?: number
  children?: ReactNode
}

export function WidgetFitBox(props: WidgetFitBoxProps) {
  const width = props.width ?? 0
  const height = props.height ?? 0
  const widgetWidth = props.widgetWidth ?? 0
  const widgetHeight = props.widgetHeight ?? 0
  const scale = useWidgetScale(width, height, widgetWidth, widgetHeight)

  return (
    <div className="widget-fit-box" style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}>
      <div style={{ transform: `scale(${scale})` }}>
        {props.children}
      </div>
    </div>
  )
}
