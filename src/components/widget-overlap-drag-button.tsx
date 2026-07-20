import { DeployMode } from '@widget-js/core'
import { useEffect, useRef } from 'react'
import { useWidgetParams } from '@/hooks/use-widget-params'

export function WidgetOverlapDragButton() {
  const widgetParams = useWidgetParams()
  const overlapDragButtonRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (widgetParams.mode !== DeployMode.OVERLAP) { return }

    const el = overlapDragButtonRef.current
    if (!el) { return }

    const stop = () => {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const start = () => {
      stop()
      timeoutRef.current = window.setTimeout(() => {
        if (overlapDragButtonRef.current) {
          overlapDragButtonRef.current.style.opacity = '0'
        }
      }, 3000)
    }

    const onButtonMouseEnter = () => {
      el.style.setProperty('app-region', 'drag')
      el.style.opacity = '1'
    }

    const onBodyMouseLeave = () => {
      start()
    }

    const onBodyMouseEnter = () => {
      el.style.opacity = '0.5'
      el.style.setProperty('app-region', 'no-drag')
      stop()
    }

    const onBodyMouseMove = () => {
      stop()
    }

    el.addEventListener('mouseenter', onButtonMouseEnter)
    document.body.addEventListener('mouseleave', onBodyMouseLeave)
    document.body.addEventListener('mouseenter', onBodyMouseEnter)
    document.body.addEventListener('mousemove', onBodyMouseMove)

    return () => {
      stop()
      el.removeEventListener('mouseenter', onButtonMouseEnter)
      document.body.removeEventListener('mouseleave', onBodyMouseLeave)
      document.body.removeEventListener('mouseenter', onBodyMouseEnter)
      document.body.removeEventListener('mousemove', onBodyMouseMove)
    }
  }, [widgetParams.mode])

  if (widgetParams.mode !== DeployMode.OVERLAP) {
    return null
  }

  return (
    <div ref={overlapDragButtonRef} className="overlap-drag-button">
      <svg
        style={{ color: 'white' }}
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
      >
        <path fill="white" d="M203.946667 483.136l99.370666 99.349333a32 32 0 1 1-45.248 45.248L158.72 528.384a32 32 0 1 1 45.248-45.248" />
        <path fill="white" d="M303.296 428.309333L203.946667 527.658667a32 32 0 1 1-45.248-45.248l99.370666-99.349334a32 32 0 1 1 45.248 45.248" />
        <path fill="white" d="M514.304 537.770667H181.333333a32 32 0 1 1 0-64h332.970667a32 32 0 0 1 0 64M819.989333 483.136l-99.349333 99.349333a32 32 0 1 0 45.248 45.248l99.349333-99.349333a32 32 0 1 0-45.248-45.248" />
        <path fill="white" d="M720.64 428.309333l99.349333 99.349334a32 32 0 1 0 45.248-45.248l-99.349333-99.349334a32 32 0 1 0-45.248 45.248" />
        <path fill="white" d="M509.653333 537.770667h332.949334a32 32 0 1 0 0-64H509.653333a32 32 0 0 0 0 64M535.04 203.946667l-99.370667 99.370666a32 32 0 1 1-45.248-45.248l99.349334-99.349333A32 32 0 1 1 535.04 203.946667" />
        <path fill="white" d="M589.866667 303.296L490.474667 203.946667a32 32 0 1 1 45.248-45.248l99.349333 99.370666a32 32 0 1 1-45.248 45.248" />
        <path fill="white" d="M480.384 514.304V181.333333a32 32 0 1 1 64 0v332.970667a32 32 0 0 1-64 0M535.04 820.010667l-99.370667-99.349334a32 32 0 1 0-45.248 45.248l99.349334 99.349334a32 32 0 1 0 45.248-45.248" />
        <path fill="white" d="M589.866667 720.661333l-99.370667 99.349334a32 32 0 1 0 45.248 45.248l99.349333-99.349334a32 32 0 1 0-45.248-45.248" />
        <path fill="white" d="M480.384 509.653333V842.666667a32 32 0 1 0 64 0V509.653333a32 32 0 0 0-64 0" />
      </svg>
    </div>
  )
}
