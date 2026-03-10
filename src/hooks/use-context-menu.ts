import type { WidgetMenuItem } from '@widget-js/core'
import { MenuApi, MenuApiEvent } from '@widget-js/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isPromise } from '../utils/is-promise'
import { useMenuListener } from './use-menu-listener'

export interface UseMenuOptions {
  menus: WidgetMenuItem[] | Promise<WidgetMenuItem[]>
  onMenuClick?: (menu: WidgetMenuItem) => void
  onMenuCheckChanged?: (menu: WidgetMenuItem, checked: boolean) => void
}

export interface UseMenuReturn {
  removeMenu: (id: string[]) => void
  updateMenu: (newMenus: WidgetMenuItem[]) => void
}

export function useContextMenu(options: UseMenuOptions): UseMenuReturn {
  const [_menus, setMenus] = useState<WidgetMenuItem[]>([])
  const menusRef = useRef<WidgetMenuItem[]>([])
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const updateMenu = useCallback(async (newMenus: Promise<WidgetMenuItem[]> | WidgetMenuItem[]) => {
    const resolvedMenus = isPromise(newMenus) ? await newMenus : newMenus
    setMenus(resolvedMenus)
    menusRef.current = resolvedMenus
    MenuApi.addContextMenuItem(resolvedMenus)
  }, [])

  // Initial load
  useEffect(() => {
    updateMenu(options.menus)
  }, [])

  const findMenuById = useCallback((id: string): WidgetMenuItem | undefined => {
    const currentMenus = menusRef.current
    // Level 1
    let menu = currentMenus.find(item => item.id === id)
    if (menu) { return menu }
    // Level 2
    for (const item of currentMenus) {
      if (item.submenu) {
        menu = item.submenu.find(subItem => subItem.id === id)
        if (menu) { return menu }
      }
    }
    return undefined
  }, [])

  const handleMenuEvent = useCallback(
    (type: MenuApiEvent, rawMenu: WidgetMenuItem) => {
      if (type === MenuApiEvent.ITEM_CLICK) {
        const menu = findMenuById(rawMenu.id)
        if (!menu) { return }

        optionsRef.current.onMenuClick?.(menu)

        if (menu.type === 'checkbox') {
          menu.checked = !menu.checked
          optionsRef.current.onMenuCheckChanged?.(menu, menu.checked)
          // Reflect changes in the menu
          updateMenu([...menusRef.current])
        }
      }
    },
    [findMenuById, updateMenu],
  )

  useMenuListener(handleMenuEvent)

  const removeMenu = useCallback((ids: string[]) => {
    let currentMenus = menusRef.current
    // Filter level 1
    currentMenus = currentMenus.filter(item => !ids.includes(item.id))
    // Filter level 2
    currentMenus.forEach((item) => {
      if (item.submenu) {
        item.submenu = item.submenu.filter(subItem => !ids.includes(subItem.id))
      }
    })

    setMenus(currentMenus)
    menusRef.current = currentMenus
    MenuApi.removeContextMenuItem(ids)
  }, [])

  return {
    removeMenu,
    updateMenu,
  }
}
