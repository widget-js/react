import type { RouteObject } from 'react-router-dom'
import ClockWidget from './clock/Clock.widget'
import ClockWidgetRoutes from './clock/ClockWidgetRoutes'

export const widgets = [
  ClockWidget,
]

export const widgetRoutes: RouteObject[] = [
  ...ClockWidgetRoutes,
]
