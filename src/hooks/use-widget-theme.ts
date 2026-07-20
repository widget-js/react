import { AppApi, AppTheme } from '@widget-js/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWidgetParams } from './use-widget-params'

function readWidgetThemeStorage(key: string, defaultTheme: AppTheme) {
  if (typeof window === 'undefined') {
    return defaultTheme
  }

  try {
    const item = window.localStorage.getItem(key)
    return item ? AppTheme.fromJSON(item) : defaultTheme
  }
  catch {
    return defaultTheme
  }
}

// Helper to manage widget theme storage with custom serialization
function useWidgetThemeStorage(id: string | undefined, defaultTheme: AppTheme) {
  const key = `widget-theme/${id}`
  const lastStorageValueRef = useRef<string | null>(null)
  const [theme, setTheme] = useState<AppTheme>(() => readWidgetThemeStorage(key, defaultTheme))

  useEffect(() => {
    if (!id) { return }
    try {
      const nextValue = JSON.stringify(theme)
      if (window.localStorage.getItem(key) !== nextValue) {
        window.localStorage.setItem(key, nextValue)
      }
      lastStorageValueRef.current = nextValue
    }
    catch (e) {
      console.warn(`Error setting localStorage key “${key}”:`, e)
    }
  }, [key, theme, id])

  useEffect(() => {
    if (!id || typeof window === 'undefined') {
      return
    }

    const syncThemeFromStorage = () => {
      const rawValue = window.localStorage.getItem(key)
      if (rawValue === lastStorageValueRef.current) {
        return
      }

      lastStorageValueRef.current = rawValue

      try {
        setTheme(rawValue ? AppTheme.fromJSON(rawValue) : defaultTheme)
      }
      catch (e) {
        console.warn(`Error reading localStorage key “${key}”:`, e)
        setTheme(defaultTheme)
      }
    }

    syncThemeFromStorage()

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) { return }
      if (event.key !== null && event.key !== key) { return }
      syncThemeFromStorage()
    }

    window.addEventListener('storage', handleStorage)
    const intervalId = window.setInterval(syncThemeFromStorage, 250)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.clearInterval(intervalId)
    }
  }, [defaultTheme, id, key])

  return [theme, setTheme] as const
}

export interface UseWidgetThemeReturn {
  widgetTheme: AppTheme
  setWidgetTheme: (theme: AppTheme) => void
  useGlobalTheme: () => Promise<void>
}

export interface UseWidgetThemeOptions {
  defaultTheme?: AppTheme
  /**
   * 是否立即注入主题
   */
  immediate?: boolean
  onThemeChanged?: (newValue: AppTheme) => void
}

export function useWidgetTheme(options?: UseWidgetThemeOptions): UseWidgetThemeReturn {
  const widgetParams = useWidgetParams()
  const id = widgetParams.id
  const immediate = options?.immediate ?? true
  const [widgetTheme, setWidgetTheme] = useWidgetThemeStorage(
    id,
    options?.defaultTheme ?? new AppTheme(),
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
    setWidgetTheme(AppTheme.fromCSS(globalTheme))
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
