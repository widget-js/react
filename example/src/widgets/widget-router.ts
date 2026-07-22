import type { RouteObject } from 'react-router-dom'
import ClockWidgetRoutes from './clock/clock-widget-routes'
import ClockWidget from './clock/clock.widget'

export const widgets = [
  ClockWidget,
]

export const widgetRoutes: RouteObject[] = [
  ...ClockWidgetRoutes,
]
