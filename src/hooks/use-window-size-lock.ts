import { BrowserWindowApi } from '@widget-js/core'
import { useCallback, useRef } from 'react'

/**
 * 用于处理electron窗口动画，会导致窗口变小或变大的问题
 */
export function useWindowSizeLock() {
  const previousMaxSize = useRef<number[]>([])
  const previousMiniSize = useRef<number[]>([])
  const previousResizable = useRef<boolean>(true)

  const lock = useCallback(async () => {
    const bounds = await BrowserWindowApi.getBounds()
    previousResizable.current = await BrowserWindowApi.isResizable()
    previousMaxSize.current = await BrowserWindowApi.getMaximumSize()
    previousMiniSize.current = await BrowserWindowApi.getMinimumSize()
    await BrowserWindowApi.setMaximumSize(bounds.width, bounds.height)
    await BrowserWindowApi.setMinimumSize(bounds.width, bounds.height)
    await BrowserWindowApi.setResizable(false)
    return bounds
  }, [])

  const unlock = useCallback(async () => {
    if (previousMaxSize.current.length > 0) {
      await BrowserWindowApi.setMaximumSize(previousMaxSize.current[0], previousMaxSize.current[1])
    }
    if (previousMiniSize.current.length > 0) {
      await BrowserWindowApi.setMinimumSize(previousMiniSize.current[0], previousMiniSize.current[1])
    }
    await BrowserWindowApi.setResizable(previousResizable.current)
  }, [])

  return { lock, unlock }
}
