import type { NativeKeyboardEvent } from '@widget-js/core'
import { Channel } from '@widget-js/core'
import { useIpcListener } from './use-ipc-listener'

export function useKeyboardEvent(callback: (event: NativeKeyboardEvent) => void) {
  useIpcListener(Channel.KEYBOARD, (event: any) => {
    callback(event)
  })
}
