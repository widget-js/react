import type { MenuApiEvent, WidgetMenuItem } from '@widget-js/core'
import { Channel } from '@widget-js/core'
import { useIpcListener } from './use-ipc-listener'

export function useMenuListener(
  callback: (eventType: MenuApiEvent, menu: WidgetMenuItem) => void,
): void {
  useIpcListener(Channel.MENU, (eventType, menu) => {
    callback(eventType as MenuApiEvent, menu as WidgetMenuItem)
  })
}
