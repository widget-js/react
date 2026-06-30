import { BrowserWindowApi } from '@widget-js/core'
import { animate } from 'popmotion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindowSize } from './use-window-size'

export interface WidgetWrapperStyleProps {
  shadowColor?: string
  padding?: number
}

export function useWidgetWrapper(props: WidgetWrapperStyleProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) { return }
    wrapper.style.setProperty('--widget-padding', `${(props.padding ?? 12) * 2}px`)
    wrapper.style.setProperty('--widget-shadow-color', props.shadowColor ?? 'rgba(0,0,0,0.2)')
  }, [props.padding, props.shadowColor])

  return { wrapperRef }
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export function useOverlapWidgetWrapper() {
  const [widgetY, _setWidgetY] = useState(0)
  const [widgetYTransition, setWidgetYTransition] = useState(0)
  const widgetYTransitionRef = useRef(0)
  const animationRef = useRef<{ stop: () => void } | null>(null)
  const { height } = useWindowSize()

  const isWidgetHide = useMemo(() => {
    return widgetY < -height + 24
  }, [height, widgetY])

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop()
    }

    animationRef.current = animate({
      from: widgetYTransitionRef.current,
      to: widgetY,
      duration: 300,
      ease: easeOutCubic,
      onUpdate: (latest) => {
        widgetYTransitionRef.current = latest
        setWidgetYTransition(latest)
      },
    })

    return () => {
      animationRef.current?.stop()
      animationRef.current = null
    }
  }, [widgetY])

  useEffect(() => {
    BrowserWindowApi.setIgnoreMouseEvent(false)
  }, [])

  return { widgetYTransition, isWidgetHide }
}
