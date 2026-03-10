import type { Rectangle } from '@widget-js/core'
import type {
  CubicBezierPoints,
  EasingFunction,
  UseWindowAnimationOptions,
} from './use-window-animation'
import { BrowserWindowApi, Channel, DeviceApi, MouseApi, MouseApiEvent } from '@widget-js/core'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useIpcListener } from './use-ipc-listener'
import { useWidgetStorage } from './use-widget-storage'
import {
  useWindowAnimationX,
  useWindowAnimationY,
} from './use-window-animation'

export type AutoHideEdge = 'top' | 'left' | 'right' | 'none'

export interface UseAutoHideOnEdgeOptions {
  /**
   * 状态存储
   * @see `https://vueuse.org/core/useStorage`
   */
  storageKey: string
  transition?: EasingFunction | CubicBezierPoints
}

export interface UseAutoHideOnEdgeReturn {
  showWindow: (edge?: AutoHideEdge) => Promise<void>
  hideWindow: (edge?: AutoHideEdge) => Promise<void>
  isShowed: boolean
  isAutoHide: boolean
  setIsAutoHide: (value: boolean) => void
  correctPosition: () => Promise<void>
  checkHideWindow: () => Promise<void>
  calcEdge: () => Promise<AutoHideEdge>
  stickToEdge: (edge?: AutoHideEdge) => Promise<void>
  stickEdge: AutoHideEdge
}

export function useAutoHideOnEdge(options: UseAutoHideOnEdgeOptions): UseAutoHideOnEdgeReturn {
  const [isShowed, setIsShowed] = useState(true)
  const [stickEdge, setStickEdge] = useState<AutoHideEdge>('none')
  const [isAutoHide, setIsAutoHide] = useWidgetStorage<boolean>(options.storageKey, false)

  const latestShowAt = useRef(Date.now())
  const latestHideAt = useRef(Date.now())
  const stickEdgeRef = useRef<AutoHideEdge>('none')
  const isShowedRef = useRef(isShowed)
  const isAutoHideRef = useRef(isAutoHide)

  useEffect(() => {
    stickEdgeRef.current = stickEdge
  }, [stickEdge])

  useEffect(() => {
    isShowedRef.current = isShowed
  }, [isShowed])

  useEffect(() => {
    isAutoHideRef.current = isAutoHide
  }, [isAutoHide])

  // Default easeOutCubic: [0.215, 0.61, 0.355, 1]
  const transition = options.transition ?? [0.215, 0.61, 0.355, 1]

  const animationOption = useMemo<UseWindowAnimationOptions>(() => ({
    transition,
  }), [options.transition])

  const animationX = useWindowAnimationX(animationOption)
  const animationY = useWindowAnimationY(animationOption)

  const animating = animationX.isPlaying || animationY.isPlaying
  const animatingRef = useRef(animating)
  useEffect(() => {
    animatingRef.current = animating
  }, [animating])

  useEffect(() => {
    if (isAutoHide) {
      BrowserWindowApi.setBackgroundThrottling(false)
    }
  }, [isAutoHide])

  const calcEdge = useCallback(async (): Promise<AutoHideEdge> => {
    const windowBounds = await BrowserWindowApi.getBounds()
    const display = await DeviceApi.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y })
    const workArea = display.workArea
    if (windowBounds.y - workArea.y <= 10) {
      return 'top'
    }
    if (windowBounds.x - workArea.x <= 10) {
      return 'left'
    }
    if (windowBounds.x + windowBounds.width >= workArea.x + workArea.width - 10) {
      return 'right'
    }
    return 'none'
  }, [])

  const correctPosition = useCallback(async () => {
    const windowBounds = await BrowserWindowApi.getBounds()
    const display = await DeviceApi.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y })
    const workArea = display.workArea
    const maxX = workArea.x + workArea.width - windowBounds.width
    const minX = workArea.x
    const minY = workArea.y
    if (windowBounds.x > maxX) {
      await BrowserWindowApi.setPosition({ x: maxX })
    }
    else if (windowBounds.x < minX) {
      await BrowserWindowApi.setPosition({ x: minX })
    }
    if (windowBounds.y < minY) {
      await BrowserWindowApi.setPosition({ y: minY })
    }
  }, [])

  // Call correctPosition on mount
  useEffect(() => {
    correctPosition()
  }, [])

  const createHotspotInternal = useCallback(async (currentStickEdge: AutoHideEdge) => {
    const bounds = await BrowserWindowApi.getBounds()
    const display = await DeviceApi.getDisplayNearestPoint({ x: bounds.x, y: bounds.y })
    const workArea = display.workArea
    const scale = display.scaleFactor
    const peakSize = 6
    const rect: Rectangle = { x: 0, y: 0, height: peakSize, width: peakSize }
    if (currentStickEdge === 'left') {
      rect.x = workArea.x
      rect.y = bounds.y
      rect.height = bounds.height
    }
    else if (currentStickEdge === 'right') {
      rect.y = bounds.y
      rect.x = workArea.width - peakSize
      rect.height = bounds.height
    }
    else {
      rect.width = bounds.width
      rect.x = bounds.x
      rect.y = workArea.y
    }
    await MouseApi.createHotspot({
      x: rect.x * scale,
      y: rect.y,
      width: rect.width * scale,
      height: rect.height * scale,
    })
  }, [])

  const hideWindow = useCallback(async (edge?: AutoHideEdge) => {
    const newEdge = edge ?? await calcEdge()
    setStickEdge(newEdge)
    stickEdgeRef.current = newEdge

    if (newEdge === 'none') {
      return
    }
    latestHideAt.current = Date.now()
    await correctPosition()
    const windowBounds = await BrowserWindowApi.getBounds()
    const display = await DeviceApi.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y })
    const workArea = display.workArea

    if (newEdge === 'left') {
      await animationX.animate(-windowBounds.width + workArea.x)
    }
    else if (newEdge === 'right') {
      await animationX.animate(workArea.width)
    }
    else {
      await animationY.animate(workArea.y - windowBounds.height)
    }
    setIsShowed(false)
    createHotspotInternal(newEdge)
  }, [calcEdge, correctPosition, animationX, animationY, createHotspotInternal])

  const stickToEdge = useCallback(async (edge?: AutoHideEdge) => {
    const newEdge = edge ?? await calcEdge()
    setStickEdge(newEdge)
    stickEdgeRef.current = newEdge

    const windowBounds = await BrowserWindowApi.getBounds()
    const display = await DeviceApi.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y })
    const workArea = display.workArea
    if (newEdge === 'left') {
      animationX.animate(workArea.x)
    }
    else if (newEdge === 'right') {
      animationX.animate(workArea.width - windowBounds.width)
    }
    else {
      animationY.animate(workArea.y)
    }
  }, [calcEdge, animationX, animationY])

  const isOnScreenEdge = useCallback(async () => {
    const windowBounds = await BrowserWindowApi.getBounds()
    const display = await DeviceApi.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y })
    const workArea = display.workArea
    if (windowBounds.x - workArea.x <= 10
      || (windowBounds.x + windowBounds.width) >= workArea.width - 10
      || windowBounds.y <= workArea.y + 10
      || (windowBounds.y + windowBounds.height) >= workArea.height - 10) {
      return true
    }
    return false
  }, [])

  const checkHideWindow = useCallback(async () => {
    if (isAutoHideRef.current) {
      if (await isOnScreenEdge()) {
        await stickToEdge()
      }
    }
  }, [isOnScreenEdge, stickToEdge])

  // Initial check
  useEffect(() => {
    checkHideWindow()
  }, [])

  const showWindow = useCallback(async (edge?: AutoHideEdge) => {
    latestShowAt.current = Date.now()
    await BrowserWindowApi.show()
    await BrowserWindowApi.setAlwaysOnTop(true)
    setIsShowed(true)
    await stickToEdge(edge)
  }, [stickToEdge])

  // Use refs in callback to avoid frequent re-binding
  const handleIpcMouse = useCallback((event: any) => {
    if (event === MouseApiEvent.HOTSPOT_ACTIVE) {
      if (!isShowedRef.current && !animatingRef.current && isAutoHideRef.current && Date.now() - latestHideAt.current > 500) {
        showWindow()
      }
    }
  }, [showWindow])

  useIpcListener(Channel.MOUSE, handleIpcMouse)

  useEffect(() => {
    const handleMouseLeave = async () => {
      const onEdge = await isOnScreenEdge()
      const diff = Date.now() - latestShowAt.current
      if (isAutoHideRef.current && !animatingRef.current && onEdge && diff > 500) {
        hideWindow()
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isOnScreenEdge, hideWindow])

  return {
    showWindow,
    hideWindow,
    isShowed,
    isAutoHide,
    setIsAutoHide,
    correctPosition,
    checkHideWindow,
    calcEdge,
    stickToEdge,
    stickEdge,
  }
}
