import type { WidgetMenuItem } from '@widget-js/core'
import type { AutoHideEdge } from './use-auto-hide-on-edge'
import type { UseMenuOptions } from './use-context-menu'
import { BrowserWindowApi } from '@widget-js/core'
import { useEffect, useRef } from 'react'
import { isPromise } from '../utils/is-promise'
import { useAutoHideOnEdge } from './use-auto-hide-on-edge'
import { useContextMenu } from './use-context-menu'
import { useWidgetStorage } from './use-widget-storage'

export interface UseDefaultOverlapContextMenuOption extends Partial<UseMenuOptions> {
  defaults?: {
    alwaysOnTop?: boolean
    overlapStickEdge?: AutoHideEdge
    overlapStickEdgeHide?: boolean
  }
}

export function useDefaultOverlapContextMenu(options?: UseDefaultOverlapContextMenuOption | boolean) {
  // Normalize options
  const normalizedOptions = typeof options === 'object' ? options : {}
  const { defaults } = normalizedOptions

  const [alwaysOnTop, setAlwaysOnTop] = useWidgetStorage(
    'overlap_always_top',
    defaults?.alwaysOnTop ?? true,
  )

  const stickScreenEdge = useAutoHideOnEdge({ storageKey: `overlap_auto_hide_on_edge` })

  // Ref to access current state in async callbacks
  const alwaysOnTopRef = useRef(alwaysOnTop)
  useEffect(() => {
    alwaysOnTopRef.current = alwaysOnTop
  }, [alwaysOnTop])

  // Initial setup for always on top
  useEffect(() => {
    if (alwaysOnTop) {
      BrowserWindowApi.setAlwaysOnTop(true)
    }
  }, [alwaysOnTop])

  const defaultMenus: WidgetMenuItem[] = [
    {
      label: '悬浮设置',
      id: 'overlap_setting',
      submenu: [
        {
          label: '置顶',
          id: 'overlap_always_top',
          type: 'checkbox',
          checked: alwaysOnTop,
        },
        {
          label: '贴边隐藏',
          id: 'overlap_stick_edge_hide',
          type: 'checkbox',
          checked: stickScreenEdge.isAutoHide,
        },
      ],
    },
  ]

  const { updateMenu } = useContextMenu({
    menus: defaultMenus,
    onMenuCheckChanged: async (menu, checked) => {
      if (menu.id === 'overlap_always_top') {
        BrowserWindowApi.setAlwaysOnTop(checked)
        setAlwaysOnTop(checked)
      }
      else if (menu.id === 'overlap_stick_edge_hide') {
        stickScreenEdge.setIsAutoHide(checked)
      }
      normalizedOptions.onMenuCheckChanged?.(menu, checked)
    },
    onMenuClick: (menu) => {
      normalizedOptions.onMenuClick?.(menu)
    },
  })

  // Update menu when state changes
  useEffect(() => {
    // Update checked state in defaultMenus
    const updatedMenus = defaultMenus.map((menu) => {
      if (menu.id === 'overlap_setting' && menu.submenu) {
        return {
          ...menu,
          submenu: menu.submenu.map((sub) => {
            if (sub.id === 'overlap_always_top') { return { ...sub, checked: alwaysOnTop } }
            if (sub.id === 'overlap_stick_edge_hide') { return { ...sub, checked: stickScreenEdge.isAutoHide } }
            return sub
          }),
        }
      }
      return menu
    })

    if (normalizedOptions.menus) {
      if (isPromise(normalizedOptions.menus)) {
        normalizedOptions.menus.then((res) => {
          updateMenu([...updatedMenus, ...res])
        })
      }
      else {
        updateMenu([...updatedMenus, ...normalizedOptions.menus])
      }
    }
    else {
      updateMenu(updatedMenus)
    }
  }, [alwaysOnTop, stickScreenEdge.isAutoHide, normalizedOptions.menus, updateMenu])
}
