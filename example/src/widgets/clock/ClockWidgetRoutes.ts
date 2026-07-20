import type { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import ClockWidget from './Clock.widget'
import ClockConfigView from './ClockConfigView'
import ClockWidgetView from './ClockWidgetView'

const path = ClockWidget.path
const name = ClockWidget.name

const configPagePath = ClockWidget.configPagePath!.split('?')[0]!

const ClockWidgetRoutes: RouteObject[] = [
  {
    path,
    id: `${name}`,
    element: createElement(ClockWidgetView),
  },
  {
    path: configPagePath,
    id: `${name}.config`,
    element: createElement(ClockConfigView),
  },
]

export default ClockWidgetRoutes
