import { ElectronApi } from '@widget-js/core'
import { useEffect } from 'react'

export function useIpcListener(
  channel: string,
  callback: (...args: any[]) => void,
): void {
  useEffect(() => {
    // mounted：添加监听
    ElectronApi.addIpcListener(channel, (...args: any[]) => {
      callback(...args)
    })

    // unmounted：移除监听
    return () => {
      ElectronApi.removeIpcListener(channel)
    }
  }, [channel, callback])
}
