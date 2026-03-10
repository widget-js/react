import { useLocalStorage } from '@uidotdev/usehooks'
import { useWidgetParams } from './use-widget-params'

export function useWidgetStorage<T>(key: string, initialValue: T) {
  const { id } = useWidgetParams()
  return useLocalStorage<T>(`${key}-${id}`, initialValue)
}
