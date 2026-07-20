import type { BroadcastEvent } from '@widget-js/core'
import type { ReactNode } from 'react'
import { BrowserWindowApiEvent, DeployMode, WidgetApiEvent } from '@widget-js/core'
import { useMemo, useState } from 'react'
import { WidgetBackground } from '@/components/widget-background'
import { WidgetOverlapDragButton } from '@/components/widget-overlap-drag-button'
import { useAppBroadcast } from '@/hooks/use-app-broadcast'
import { useWidgetParams } from '@/hooks/use-widget-params'
import { useWidgetWrapper } from '@/hooks/use-widget-wrapper'

export interface WidgetWrapperProps {
  shadowColor?: string
  padding?: number
  children?: ReactNode
  background?: ReactNode
}

export function WidgetWrapper(props: WidgetWrapperProps) {
  const [editing, setEditing] = useState(false)
  const widgetParams = useWidgetParams()
  const isDesktop = widgetParams.mode === DeployMode.NORMAL

  const desktopEvents = useMemo(() => {
    return isDesktop
      ? [WidgetApiEvent.EDIT_DESKTOP_WIDGETS, BrowserWindowApiEvent.BLUR]
      : []
  }, [isDesktop])

  useAppBroadcast(desktopEvents, async (broadcastEvent: BroadcastEvent) => {
    if (broadcastEvent.event === WidgetApiEvent.EDIT_DESKTOP_WIDGETS) {
      setEditing(!!broadcastEvent.payload)
    }
  })

  const { wrapperRef } = useWidgetWrapper(props)

  return (
    <div className="widget-window">
      {editing && <div className="widget-click-mask" />}
      <div ref={wrapperRef} className={`widget-wrapper ${editing ? 'editing' : ''}`.trim()}>
        <div className="widget-root">
          {props.children}
        </div>
        {props.background ?? <WidgetBackground />}
      </div>
      <WidgetOverlapDragButton />
    </div>
  )
}
