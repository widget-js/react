import type { Rectangle } from '@widget-js/core'
import type { AnimationOptions, SpringOptions } from 'popmotion'
import { BrowserWindowApi } from '@widget-js/core'
import { animate, linear } from 'popmotion'
import { useCallback, useRef, useState } from 'react'
import { useWindowSizeLock } from './use-window-size-lock'

export type CubicBezierPoints = [number, number, number, number]
export type EasingFunction = (v: number) => number

export interface UseWindowAnimationOptions {
  spring?: Exclude<SpringOptions, 'from' | 'to' | 'duration'>
  duration?: number
  /**
   * Easing function or cubic bezier points for calculating transition values
   */
  transition?: EasingFunction | CubicBezierPoints
  onComplete?: () => void
  onStop?: () => void
  onStart?: () => void
}

/**
 * Create an easing function from cubic bezier points.
 */
function createEasingFunction([p0, p1, p2, p3]: CubicBezierPoints): EasingFunction {
  const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1
  const b = (a1: number, a2: number) => 3 * a2 - 6 * a1
  const c = (a1: number) => 3 * a1

  const calcBezier = (t: number, a1: number, a2: number) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t

  const getSlope = (t: number, a1: number, a2: number) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1)

  const getTforX = (x: number) => {
    let aGuessT = x

    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2)
      if (currentSlope === 0) { return aGuessT }
      const currentX = calcBezier(aGuessT, p0, p2) - x
      aGuessT -= currentX / currentSlope
    }

    return aGuessT
  }

  return (x: number) => (p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3))
}

function createAnimationOptions(options: UseWindowAnimationOptions): AnimationOptions<number> {
  // Prefer spring animation
  if (options.spring) {
    return {
      type: 'spring',
      ...options.spring,
    }
  }
  else {
    const trans = options.transition ?? linear
    const ease = typeof trans === 'function' ? trans : createEasingFunction(trans)
    return {
      type: 'keyframes',
      ease,
      duration: options.duration,
    }
  }
}

export function useWindowAnimationY(options: UseWindowAnimationOptions) {
  const { lock, unlock } = useWindowSizeLock()
  const [isPlaying, setIsPlaying] = useState(false)
  const previousBounds = useRef<Rectangle>({ x: 0, y: 0, width: 0, height: 0 })
  const animationRef = useRef<{ stop: () => void } | null>(null)

  const onFinish = useCallback(() => {
    setIsPlaying(false)
    unlock()
    options.onComplete?.()
  }, [options, unlock])

  const animateY = useCallback(
    async (y: number) => {
      // Lock window position to prevent user manual changes causing jumps
      previousBounds.current = await lock()
      const animationOptions = createAnimationOptions(options)

      if (animationRef.current) {
        animationRef.current.stop()
      }

      animationRef.current = animate({
        ...animationOptions,
        from: previousBounds.current.y,
        to: y,
        onStop: () => {
          setIsPlaying(false)
          options.onStop?.()
        },
        onComplete: onFinish,
        onPlay: () => {
          setIsPlaying(true)
          options.onStart?.()
        },
        onUpdate: (latest) => {
          BrowserWindowApi.setBounds({
            y: latest,
            width: previousBounds.current.width,
            height: previousBounds.current.height,
          }, false)
        },
      })
    },
    [lock, onFinish, options],
  )

  return { animate: animateY, isPlaying }
}

export function useWindowAnimationX(options: UseWindowAnimationOptions) {
  const { lock, unlock } = useWindowSizeLock()
  const [isPlaying, setIsPlaying] = useState(false)
  const previousBounds = useRef<Rectangle>({ x: 0, y: 0, width: 0, height: 0 })
  const animationRef = useRef<{ stop: () => void } | null>(null)

  const onFinish = useCallback(() => {
    setIsPlaying(false)
    unlock()
    options.onComplete?.()
  }, [options, unlock])

  const animateX = useCallback(
    async (x: number) => {
      previousBounds.current = await lock()
      const animationOptions = createAnimationOptions(options)

      if (animationRef.current) {
        animationRef.current.stop()
      }

      animationRef.current = animate({
        ...animationOptions,
        from: previousBounds.current.x,
        to: x,
        onStop: () => {
          options.onStop?.()
          setIsPlaying(false)
        },
        onComplete: onFinish,
        onPlay: () => {
          setIsPlaying(true)
          options.onStart?.()
        },
        onUpdate: (latest) => {
          BrowserWindowApi.setBounds({
            x: latest,
            y: previousBounds.current.y,
            width: previousBounds.current.width,
            height: previousBounds.current.height,
          }, false)
        },
      })
    },
    [lock, onFinish, options],
  )

  return { animate: animateX, isPlaying }
}
