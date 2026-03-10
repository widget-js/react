import type { AppNotification } from '@widget-js/core'
import { Channel } from '@widget-js/core'
import { useIpcListener } from './use-ipc-listener'

export function useNotification(callback: (notification?: AppNotification) => void) {
  useIpcListener(Channel.NOTIFICATION, (notification?: AppNotification) => {
    callback(notification)
  })
}
