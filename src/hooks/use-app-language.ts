import { AppApi } from '@widget-js/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppBroadcast } from './use-app-broadcast'

export interface UseAppLanguageOption {
  onLoad?: (code: string) => void
  onChange?: (code: string) => void
}

export function useAppLanguage(options: UseAppLanguageOption = {}) {
  const [languageCode, setLanguageCode] = useState<string>(navigator.language)

  // Use refs to avoid re-subscribing when options or state changes
  const optionsRef = useRef(options)
  const languageCodeRef = useRef(languageCode)

  // Keep options ref in sync
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  // Initial load
  useEffect(() => {
    AppApi.getLanguageCode().then((result) => {
      // Only update if different to avoid unnecessary renders/callbacks
      if (languageCodeRef.current !== result) {
        languageCodeRef.current = result
        setLanguageCode(result)
        optionsRef.current.onLoad?.(result)
      }
    })
  }, [])

  const handleBroadcast = useCallback((event: any) => {
    if (event.event === AppApi.EVENT_LANGUAGE_CHANGED) {
      const payload = event.payload
      if (typeof payload === 'string' && languageCodeRef.current !== payload) {
        languageCodeRef.current = payload
        setLanguageCode(payload)
        optionsRef.current.onChange?.(payload)
      }
    }
  }, [])

  useAppBroadcast([AppApi.EVENT_LANGUAGE_CHANGED], handleBroadcast)

  return languageCode
}
