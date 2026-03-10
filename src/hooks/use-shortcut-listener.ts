import { Channel } from '@widget-js/core'
import { useIpcListener } from './use-ipc-listener'

export function useShortcutListener(callback: (shortcut: string) => void) {
  useIpcListener(Channel.SHORTCUT, (shortcut: any) => {
    if (typeof shortcut === 'string') {
      callback(shortcut)
    }
  })
}
