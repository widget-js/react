import { AppApi, DefaultWidgetTheme, WidgetTheme } from '@widget-js/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWidgetParams } from './use-widget-params'

// Helper to manage widget theme storage with custom serialization
function useWidgetThemeStorage(id: string | undefined, defaultTheme: WidgetTheme) {
  const key = `widget-theme/${id}`
  const [theme, setTheme] = useState<WidgetTheme>(() => {
    if (typeof window === 'undefined') { return defaultTheme }
    try {
      const item = window.localStorage.getItem(key)
      return item ? WidgetTheme.fromJSON(item) : defaultTheme
    }
    catch (e) {
      return defaultTheme
    }
  })

  useEffect(() => {
    if (!id) { return }
    try {
      window.localStorage.setItem(key, JSON.stringify(theme))
    }
    catch (e) {
      console.warn(`Error setting localStorage key “${key}”:`, e)
    }
  }, [key, theme, id])

  return [theme, setTheme] as const
}

export interface UseWidgetThemeReturn {
  widgetTheme: WidgetTheme
  setWidgetTheme: (theme: WidgetTheme) => void
  useGlobalTheme: () => Promise<void>
}

export interface UseWidgetThemeOptions {
  defaultTheme?: WidgetTheme
  /**
   * 是否立即注入主题
   */
  immediate?: boolean
  onThemeChanged?: (newValue: WidgetTheme) => void
}

export function useWidgetTheme(options?: UseWidgetThemeOptions): UseWidgetThemeReturn {
  const widgetParams = useWidgetParams()
  const id = widgetParams.id
  const immediate = options?.immediate ?? true
  const [widgetTheme, setWidgetTheme] = useWidgetThemeStorage(
    id,
    options?.defaultTheme ?? DefaultWidgetTheme,
  )
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const reloadTheme = useCallback(() => {
    if (widgetTheme.useGlobalTheme) {
      widgetTheme.removeCSS()
    }
    else {
      widgetTheme.injectCSS()
    }
  }, [widgetTheme])

  // Watch for theme changes
  useEffect(() => {
    reloadTheme()
    optionsRef.current?.onThemeChanged?.(widgetTheme)
  }, [widgetTheme, reloadTheme])

  const useGlobalTheme = useCallback(async () => {
    const globalTheme = await AppApi.getThemeCSS()
    setWidgetTheme(WidgetTheme.fromCSS(globalTheme))
  }, [setWidgetTheme])

  // Initial mount logic
  useEffect(() => {
    if (immediate && !widgetTheme.useGlobalTheme) {
      widgetTheme.injectCSS()
    }
  }, [])

  return {
    widgetTheme,
    setWidgetTheme,
    useGlobalTheme,
  }
}
