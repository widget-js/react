import type {
  AppTheme,
  BroadcastEvent,
  WidgetParams,
} from '@widget-js/core'
import type {
  UseDefaultOverlapContextMenuOption,
} from './use-default-overlap-context-menu'
import type { UseWidgetParamsOptions } from './use-widget-params'
import type { UseWidgetThemeOptions } from './use-widget-theme'
import {
  AppApi,
  DeployMode,
  WidgetApi,
} from '@widget-js/core'
import consola from 'consola'
import { useEffect, useState } from 'react'
import { useAppBroadcast } from './use-app-broadcast'
import {
  useDefaultOverlapContextMenu,
} from './use-default-overlap-context-menu'
import { useWidgetParams } from './use-widget-params'
import { useWidgetSize } from './use-widget-size'
import { useWidgetTheme } from './use-widget-theme'

export interface UseWidgetOptions extends UseWidgetParamsOptions, UseWidgetThemeOptions {
  /**
   * 组件id，如果不传默认使用WidgetParams里的id
   */
  widgetId?: string
  /**
   * 组件名，如果不传默认使用WidgetParams里的name
   */
  widgetName?: string
  defaultOverlapMenu?: boolean | UseDefaultOverlapContextMenuOption
  useBroadcastEvent?: string[]
  onBroadcastEvent?: (broadcastEvent: BroadcastEvent) => void
}

export interface SaveOptions {
  closeWindow?: boolean
  sendBroadcast?: boolean
}

export interface UseWidgetReturn {
  widgetParams: WidgetParams
  widgetTheme: AppTheme
  dataLoaded: boolean
  setDataLoaded: (loaded: boolean) => void
  language: string
  sizeStyle: { width: string, height: string }
  save: (saveOptions?: SaveOptions) => Promise<void>
  size: {
    width: number
    height: number
  }
}

export function useWidget(options?: UseWidgetOptions): UseWidgetReturn {
  const widgetParams = useWidgetParams(options)
  const { widgetTheme } = useWidgetTheme(options)
  const [language, setLanguage] = useState(typeof navigator !== 'undefined' ? navigator.language : 'en')
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (widgetParams.id) {
      consola.info('Widget id', widgetParams.id)
    }
  }, [widgetParams.id])

  useDefaultOverlapContextMenu(
    widgetParams.mode === DeployMode.OVERLAP
      ? (options?.defaultOverlapMenu ?? true)
      : false,
  )

  const events = options?.useBroadcastEvent ?? []
  if (!events.includes(WidgetApi.EVENT_DATA_CHANGED)) {
    events.push(WidgetApi.EVENT_DATA_CHANGED)
  }

  if (!events.includes(AppApi.EVENT_LANGUAGE_CHANGED)) {
    events.push(AppApi.EVENT_LANGUAGE_CHANGED)
  }

  useAppBroadcast(events, (broadcastEvent) => {
    if (broadcastEvent.event === AppApi.EVENT_LANGUAGE_CHANGED) {
      setLanguage(broadcastEvent.payload as string)
    }
    options?.onBroadcastEvent?.(broadcastEvent)
  })

  const save = async (saveOptions?: SaveOptions) => {
    if (saveOptions?.closeWindow) {
      window.close()
    }
  }

  const widgetSize = useWidgetSize()

  return {
    widgetParams,
    dataLoaded,
    setDataLoaded,
    widgetTheme,
    save,
    language,
    sizeStyle: widgetSize.sizeStyle,
    size: {
      width: widgetSize.width,
      height: widgetSize.height,
    },
  }
}

export function useWidgetScale(
  width: number,
  height: number,
  widgetWidth: number,
  widgetHeight: number,
): number {
  if (width >= widgetWidth && height >= widgetHeight) {
    return 1
  }
  else if (widgetWidth > width && widgetHeight < height) {
    return width / widgetWidth
  }
  else if (widgetWidth < width && widgetHeight > height) {
    return height / widgetHeight
  }
  else {
    // 按长边缩放
    if (widgetWidth > widgetHeight) {
      return width / widgetWidth
    }
    else {
      return height / widgetHeight
    }
  }
}
