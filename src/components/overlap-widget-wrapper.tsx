import type { ReactNode } from 'react'
import { useOverlapWidgetWrapper, useWidgetWrapper } from '@/hooks/use-widget-wrapper'

export interface OverlapWidgetWrapperProps {
  shadowColor?: string
  padding?: number
  children?: ReactNode
}

export function OverlapWidgetWrapper(props: OverlapWidgetWrapperProps) {
  const { widgetYTransition } = useOverlapWidgetWrapper()
  const { wrapperRef } = useWidgetWrapper(props)

  return (
    <div className="widget-window">
      <div
        ref={wrapperRef}
        className="widget-wrapper"
        style={{ transform: `translate3d(0,${widgetYTransition}px,0)` }}
      >
        {props.children}
      </div>
    </div>
  )
}
