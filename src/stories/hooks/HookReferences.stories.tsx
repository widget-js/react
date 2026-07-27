import type { Meta, StoryObj } from '@storybook/react-vite'
import { HookReferencePage } from './hook-reference-docs'

const meta = {
  title: 'Hooks',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

function createReferenceStory(referenceKey: string, storyName: string): Story {
  return {
    name: storyName,
    render: () => <HookReferencePage hookName={referenceKey} />,
    parameters: {
      docs: {
        page: () => <HookReferencePage hookName={referenceKey} />,
      },
    },
  }
}

export const useWidget = createReferenceStory('use-widget', 'useWidget')
export const useWidgetParams = createReferenceStory('use-widget-params', 'useWidgetParams')
export const useWidgetTheme = createReferenceStory('use-widget-theme', 'useWidgetTheme')
export const useWidgetSize = createReferenceStory('use-widget-size', 'useWidgetSize')
export const useWidgetScale = createReferenceStory('use-widget-scale', 'useWidgetScale')
export const useWidgetWrapper = createReferenceStory('use-widget-wrapper', 'useWidgetWrapper')
export const useOverlapWidgetWrapper = createReferenceStory('use-overlap-widget-wrapper', 'useOverlapWidgetWrapper')
export const useAutoHideOnEdge = createReferenceStory('use-auto-hide-on-edge', 'useAutoHideOnEdge')
export const useWindowAnimationX = createReferenceStory('use-window-animation-x', 'useWindowAnimationX')
export const useWindowAnimationY = createReferenceStory('use-window-animation-y', 'useWindowAnimationY')
export const useWindowSize = createReferenceStory('use-window-size', 'useWindowSize')
export const useWindowSizeLock = createReferenceStory('use-window-size-lock', 'useWindowSizeLock')
export const useDefaultOverlapContextMenu = createReferenceStory('use-default-overlap-context-menu', 'useDefaultOverlapContextMenu')
export const useContextMenu = createReferenceStory('use-context-menu', 'useContextMenu')
export const useAppBroadcast = createReferenceStory('use-app-broadcast', 'useAppBroadcast')
export const useIpcListener = createReferenceStory('use-ipc-listener', 'useIpcListener')
export const useMenuListener = createReferenceStory('use-menu-listener', 'useMenuListener')
export const useShortcutListener = createReferenceStory('use-shortcut-listener', 'useShortcutListener')
export const useKeyboardEvent = createReferenceStory('use-keyboard-event', 'useKeyboardEvent')
export const useMouseEvent = createReferenceStory('use-mouse-event', 'useMouseEvent')
export const useNotification = createReferenceStory('use-notification', 'useNotification')
export const useAppLanguage = createReferenceStory('use-app-language', 'useAppLanguage')
export const useAppVersion = createReferenceStory('use-app-version', 'useAppVersion')
export const useTray = createReferenceStory('use-tray', 'useTray')
export const useUser = createReferenceStory('use-user', 'useUser')
export const useSupabaseChannel = createReferenceStory('use-supabase-channel', 'useSupabaseChannel')
export const useWidgetStorage = createReferenceStory('use-widget-storage', 'useWidgetStorage')
export const useWidgetProxyConfig = createReferenceStory('use-widget-proxy-config', 'useWidgetProxyConfig')
