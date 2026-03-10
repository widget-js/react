import { useLocalStorage } from '@uidotdev/usehooks'
import { DeployedWidgetApi } from '@widget-js/core'
import { useCallback, useMemo } from 'react'
import { useWidgetParams } from './use-widget-params'

export type ProxyProtocol = 'http' | 'https' | 'sock5' | 'sock4'

export interface ProxyConfig {
  protocol?: ProxyProtocol
  port?: string
  host?: string
}

export interface UseProxyConfigOption {
  storageKey?: string
}

export function useWidgetProxyConfig(option?: UseProxyConfigOption) {
  const widgetParams = useWidgetParams()
  const key = option?.storageKey ?? 'widget-proxy-config'
  const [config, setConfig] = useLocalStorage<ProxyConfig>(key, {})

  const hasProxyRule = useMemo(() => {
    return !!(config.protocol && config.host && config.port)
  }, [config])

  const proxyRule = useMemo(() => {
    if (hasProxyRule) {
      return `${config.protocol}://${config.host}:${config.port}`
    }
    return ''
  }, [hasProxyRule, config])

  const updateProxy = useCallback(async () => {
    await DeployedWidgetApi.setProxy(widgetParams.id ?? '', proxyRule)
  }, [widgetParams.id, proxyRule])

  return { config, setConfig, proxyRule, updateProxy, hasProxyRule }
}
