import { useMemo } from 'react'
import { useWindowSize } from './use-window-size'

export function useWidgetSize() {
  const padding = 12
  const paddingFull = padding * 2
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const width = useMemo(() => (windowWidth ?? 0) - paddingFull, [windowWidth])
  const height = useMemo(() => (windowHeight ?? 0) - paddingFull, [windowHeight])

  const sizeStyle = useMemo(() => {
    return {
      width: `${width}px`,
      height: `${height}px`,
    }
  }, [width, height])

  return {
    windowWidth,
    windowHeight,
    width,
    height,
    sizeStyle,
  }
}
