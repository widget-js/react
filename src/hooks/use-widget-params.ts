import { ElectronUtils, WidgetParams } from '@widget-js/core'
import { useMemo } from 'react'

export interface UseWidgetParamsOptions {
  /**
   * 在使用浏览器调试时使用，必传参数有：id,name,widthPx,heightPx
   */
  debugParams?: WidgetParams
}

export function useWidgetParams(option?: UseWidgetParamsOptions): WidgetParams {
  return useMemo(() => {
    // 从url地址获取组件参数
    if (ElectronUtils.getAPI() == null && option?.debugParams != null) {
      // 如果没在Electron上运行，生成测试的参数
      const widgetParams = option.debugParams
      widgetParams.widthPx = (widgetParams.width ?? 2) * 100
      widgetParams.heightPx = (widgetParams.height ?? 2) * 100
      return widgetParams
    }
    else {
      return WidgetParams.fromCurrentLocation()
    }
  }, [option?.debugParams])
}
