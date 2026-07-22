import type { WidgetMenuItem } from '@widget-js/core'
import { BrowserWindowApi, Channel, TrayApi } from '@widget-js/core'
import { useEffect } from 'react'
import { useIpcListener } from './use-ipc-listener'

export interface UseTrayOptions {
  image: string
  tooltip: string
  menu?: WidgetMenuItem[]
  onClick?: () => void
  onRightClick?: () => void
  onMiddleClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function useTray(options: UseTrayOptions) {
  const {
    image,
    tooltip,
    menu,
    onClick,
    onRightClick,
    onMiddleClick,
    onMouseEnter,
    onMouseLeave,
  } = options

  useEffect(() => {
    const setupTray = async () => {
      await TrayApi.setTray({
        image,
        tooltip,
      })
      if (menu) {
        await TrayApi.setContextMenu(menu)
      }
    }
    setupTray()
  }, [image, tooltip, menu])

  useIpcListener(Channel.TRAY, (event: any) => {
    switch (event) {
      case TrayApi.EVENT_CLICK:
        if (onClick) {
          onClick()
        }
        else {
          BrowserWindowApi.show()
        }
        break
      case TrayApi.EVENT_RIGHT_CLICK:
        onRightClick?.()
        break
      case TrayApi.EVENT_MIDDLE_CLICK:
        onMiddleClick?.()
        break
      case TrayApi.EVENT_MOUSE_ENTER:
        onMouseEnter?.()
        break
      case TrayApi.EVENT_MOUSE_LEAVE:
        onMouseLeave?.()
        break
    }
  })
}
