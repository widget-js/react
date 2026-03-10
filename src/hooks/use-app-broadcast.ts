import type { BroadcastEvent, BroadcastEventType } from '@widget-js/core'
import { BroadcastApi, Channel } from '@widget-js/core'
import { useCallback, useEffect } from 'react'
import { useIpcListener } from './use-ipc-listener'

/**
 * 注册广播监听
 * @param events    广播事件类型
 * @param callback
 */
export function useAppBroadcast(events: BroadcastEventType[], callback: (event: BroadcastEvent) => void) {
  useEffect(() => {
    BroadcastApi.register(...events)
    return () => {
      BroadcastApi.unregister(...events)
    }
  }, [events])

  const listener = useCallback(
    (...args: any[]) => {
      const event = args[0] as BroadcastEvent
      if (events.includes(event.event)) {
        callback(event)
      }
    },
    [events, callback],
  )

  useIpcListener(Channel.BROADCAST, listener)
}
