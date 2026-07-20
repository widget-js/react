---
name: "widget-react-hooks"
description: "提供 @widget-js/react hooks 选型与组合建议。用户要处理挂件参数、主题、广播、窗口动画、贴边隐藏或上下文菜单时调用。"
---

# Widget React Hooks

用于在 `@widget-js/react` 包内优先复用现有 hooks，统一处理挂件状态、窗口行为和宿主事件，而不是重新封装一套逻辑。

## 何时调用

当用户有以下意图时调用本技能：

- 要读取 widget 参数、尺寸、主题、语言
- 要监听宿主广播、IPC、快捷键、菜单或鼠标事件
- 要实现悬浮窗口贴边隐藏、显示、动画
- 要给 overlap 模式添加默认右键菜单
- 要先判断应该接哪个 hook

## Hook 来源

- `src/hooks`
- 统一导出入口：`src/hooks/index.ts`
- 包外通常从 `@widget-js/react` 直接导入

## 优先使用的核心 hooks

### `useWidget`

面向页面级挂件初始化，适合作为大多数 widget 页面入口 hook。

返回核心状态：

- `widgetParams`
- `widgetTheme`
- `dataLoaded`
- `setDataLoaded`
- `language`
- `sizeStyle`
- `size`
- `save`

适合场景：

- 页面初始化时一次性拿到挂件参数和主题
- 需要自动处理 `DATA_CHANGED` 与语言变更广播
- overlap 模式下需要默认右键菜单

### `useWidgetParams`

适合只读取 widget 参数，不需要完整页面级能力时使用。

### `useWidgetTheme`

适合单独读取或同步挂件主题。

### `useWidgetSize`

适合获取当前挂件宽高和样式尺寸。

### `useWidgetWrapper`

适合给挂件外层 DOM 写入样式变量：

- `--widget-padding`
- `--widget-shadow-color`

通常与 `WidgetWrapper`、`OverlapWidgetWrapper` 搭配。

### `useOverlapWidgetWrapper`

适合 overlap 外层包装动画，返回：

- `widgetYTransition`
- `isWidgetHide`

## 窗口与悬浮相关 hooks

### `useAutoHideOnEdge`

适合实现贴边隐藏行为，提供：

- `showWindow`
- `hideWindow`
- `isShowed`
- `isAutoHide`
- `setIsAutoHide`
- `correctPosition`
- `checkHideWindow`
- `calcEdge`
- `stickToEdge`
- `stickEdge`

依赖 `BrowserWindowApi`、`DeviceApi`、`MouseApi`、窗口动画 hooks。

### `useWindowAnimationX`

适合驱动窗口 X 轴动画。

### `useWindowAnimationY`

适合驱动窗口 Y 轴动画。

### `useWindowSize`

适合读取窗口尺寸。

### `useWindowSizeLock`

适合动画期间锁定窗口尺寸与位置。

## 菜单与事件相关 hooks

### `useDefaultOverlapContextMenu`

适合 overlap 模式快速接入默认右键菜单，默认包含：

- 置顶
- 贴边隐藏

### `useContextMenu`

适合自定义右键菜单结构和回调。

### `useAppBroadcast`

适合监听宿主广播事件，例如数据变更和语言变更。

### `useIpcListener`

适合监听 IPC channel 事件。

### `useMenuListener`

适合处理菜单项点击等事件。

### `useShortcutListener`

适合监听快捷键触发。

### `useKeyboardEvent`

适合监听键盘事件。

### `useMouseEvent`

适合监听鼠标事件。

### `useNotification`

适合接收宿主通知。

## 应用与数据相关 hooks

### `useAppLanguage`

适合读取或同步应用语言。

### `useAppVersion`

适合读取应用版本信息。

### `useTray`

适合托盘菜单和托盘交互。

### `useUser`

适合读取登录用户信息。

### `useSupabaseChannel`

适合订阅 Supabase 实时通道。

### `useWidgetStorage`

适合持久化 widget 本地状态。

### `useWidgetProxyConfig`

适合读取或更新代理配置。

## 选型建议

- 页面入口状态：优先 `useWidget`
- 单独读取参数：优先 `useWidgetParams`
- 单独处理主题：优先 `useWidgetTheme`
- 悬浮贴边隐藏：优先 `useAutoHideOnEdge`
- overlap 默认右键菜单：优先 `useDefaultOverlapContextMenu`
- 只要窗口动画：优先 `useWindowAnimationX` / `useWindowAnimationY`
- 需要包装层样式变量：优先 `useWidgetWrapper`

## 使用约定

- 先选高层 hook，再补低层 hook，不要重复订阅同一类事件
- 如果 `useWidget` 已满足需求，不要再手动拼一套参数、主题、语言监听
- 涉及 `BrowserWindowApi` 或宿主事件时，先确认代码运行于 Widget 宿主环境
- overlap 场景优先考虑 `useDefaultOverlapContextMenu` 与 `useAutoHideOnEdge`

## 示例提示词

- “给这个 widget 页面接入主题、参数和语言监听”
- “做一个贴边自动隐藏的悬浮窗”
- “当前 overlap 模式加默认右键菜单”
- “我只想拿窗口尺寸和 widget 尺寸，应该用哪个 hook”

## 示例代码

```tsx
import { useWidget, useAutoHideOnEdge } from '@widget-js/react'

export function WidgetPage() {
  const { widgetParams, widgetTheme, sizeStyle } = useWidget()
  const { isAutoHide, setIsAutoHide } = useAutoHideOnEdge({ storageKey: 'demo_auto_hide' })

  return (
    <div style={sizeStyle} data-theme={widgetTheme.mode}>
      <button onClick={() => setIsAutoHide(!isAutoHide)}>
        {isAutoHide ? 'Disable Auto Hide' : 'Enable Auto Hide'}
      </button>
      <div>{widgetParams.name}</div>
    </div>
  )
}
```
