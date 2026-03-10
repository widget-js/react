import type { AppMouseEvent } from '@widget-js/core'
import { Channel } from '@widget-js/core'
import { useIpcListener } from './use-ipc-listener'

export function useMouseEvent(callback: (event: AppMouseEvent) => void) {
  useIpcListener(Channel.MOUSE, (event: any) => {
    callback(event)
  })
}
