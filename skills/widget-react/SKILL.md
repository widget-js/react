---
name: "widget-react"
description: "提供 @widget-js/react 中组件与 hooks 的统一选型、组合建议和实现约定。只要用户要处理 widget 参数、主题、语言、尺寸、广播、IPC、窗口动画、贴边隐藏、overlap 右键菜单、窗口壳层、标题栏按钮、悬浮挂件容器、配置页表单字段，或只是想先判断‘当前该用哪个组件 / hook’，都应优先调用本技能，而不是重复封装一套新的状态或 UI。"
---

# Widget React

用于在 `@widget-js/react` 包内优先复用现有公开组件、表单组件和 hooks，统一处理 widget 页面状态、宿主事件、窗口行为与桌面挂件 UI，而不是在当前任务里重新拼装窗口壳层、主题同步、广播监听或 overlap 行为。

## 何时调用

当用户有以下意图时调用本技能：

- 要在当前包内新增或改造 widget 页面、配置页、设置页、悬浮页
- 要读取 widget 参数、主题、语言、尺寸或保存配置
- 要监听广播、IPC、快捷键、菜单、鼠标、通知、托盘事件
- 要实现 overlap 模式、贴边隐藏、窗口动画、默认右键菜单
- 要接入窗口标题栏、窗口控制按钮、通用挂件外壳
- 要复用已有表单字段、主题表单、代理配置、颜色/字体/快捷键编辑组件
- 要先判断“应该用哪个组件 / hook”，或用户明确说“别重复造轮子”

## 来源

- 公开组件入口：`src/index.ts`
- hooks 入口：`src/hooks/index.ts`
- 组件源码：`src/components`
- hooks 源码：`src/hooks`

## 使用流程

1. 先判断任务更偏 `UI 壳层 / 表单` 还是 `状态 / 宿主事件 / 窗口行为`。
2. 进入对应 reference：
   - 组件：直接读取 `references/components/*.md`
   - 表单：直接读取 `references/form/*.md`
   - hooks：直接读取 `references/hooks/*.md`
3. 如果已经定位到具体组件名，再继续读取对应的单文件 reference，不要只停在索引或表格层。
4. 如果任务同时涉及页面状态和界面壳层，至少组合一个高层 hook 和一个高层组件，不要分别手写同类能力。
5. 优先从 `@widget-js/react` 导入公开导出；只有在“维护当前包内部组件”时，才去复用 `src/components/ui/*` 等内部基础件。

## Reference 索引

先从这里按名称或场景定位，再进入对应 reference 文件；不要只停留在表格层就直接下结论。

### Components

| Function | Description | Invocation |
|----------|-------------|------------|
| [`WidgetWrapper`](references/components/widget-wrapper.md) | 普通桌面挂件壳层，内置默认背景、编辑遮罩和拖拽按钮 | AUTO |
| [`OverlapWidgetWrapper`](references/components/overlap-widget-wrapper.md) | overlap 悬浮挂件壳层，适合配合贴边隐藏和默认右键菜单 | AUTO |
| [`WidgetBackground`](references/components/widget-background.md) | 默认挂件背景层结构说明 | AUTO |
| [`WidgetFitBox`](references/components/widget-fit-box.md) | 按目标尺寸缩放内容的适配容器 | AUTO |
| [`WidgetOverlapDragButton`](references/components/widget-overlap-drag-button.md) | overlap 模式拖拽入口，通常由 wrapper 内置 | AUTO |
| [`Window`](references/components/window.md) | 标准窗口页面骨架，含标题栏、滚动区和底栏 | AUTO |
| [`WindowTitleBar`](references/components/window-title-bar.md) | 窗口顶部标题栏，内置窗口控制按钮 | AUTO |
| [`WindowControls`](references/components/window-controls.md) | 最小化、最大化、关闭按钮 | AUTO |

### Form Components

| Function | Description | Invocation |
|----------|-------------|------------|
| [`WidgetBindShortcutField`](references/form/widget-bind-shortcut-field.md) | 快捷键录制与绑定字段 | AUTO |
| [`WidgetCheckboxField`](references/form/widget-checkbox-field.md) | 布尔开关 / 复选字段 | AUTO |
| [`WidgetCodeEditor`](references/form/widget-code-editor.md) | CSS / JavaScript / TypeScript 代码编辑字段 | AUTO |
| [`WidgetColorField`](references/form/widget-color-field.md) | 颜色输入与面板选择字段 | AUTO |
| [`WidgetColorPickerPanel`](references/form/widget-color-picker-panel.md) | 颜色选择弹层内部实现组件，维护包内颜色体验时查看 | AUTO |
| [`WidgetFontSelector`](references/form/widget-font-selector.md) | 字体选择字段，可读取本地字体或使用传入选项 | AUTO |
| [`WidgetFormField`](references/form/widget-form-field.md) | 字段行布局骨架，新增 `Widget*Field` 时优先复用 | AUTO |
| [`WidgetPixelSliderField`](references/form/widget-pixel-slider-field.md) | 带 `px` 语义的滑块字段 | AUTO |
| [`WidgetProxyField`](references/form/widget-proxy-field.md) | 代理协议、地址、端口配置字段 | AUTO |
| [`WidgetSliderField`](references/form/widget-slider-field.md) | 一般数值滑块字段 | AUTO |
| [`WidgetThemeForm`](references/form/widget-theme-form.md) | 统一主题配置表单 | AUTO |

### Hooks

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useWidget`](references/hooks/use-widget.md) | 页面级 widget 入口状态，优先作为大多数页面的起点 | AUTO |
| [`useWidgetParams`](references/hooks/use-widget-params.md) | 单独读取 widget 参数 | AUTO |
| [`useWidgetTheme`](references/hooks/use-widget-theme.md) | 单独读取或同步 widget 主题 | AUTO |
| [`useWidgetSize`](references/hooks/use-widget-size.md) | 读取 widget 尺寸与样式尺寸 | AUTO |
| [`useWidgetScale`](references/hooks/use-widget-scale.md) | 只做缩放比例计算 | AUTO |
| [`useWidgetWrapper`](references/hooks/use-widget-wrapper.md) | 给包装层 DOM 写样式变量 | AUTO |
| [`useOverlapWidgetWrapper`](references/hooks/use-overlap-widget-wrapper.md) | overlap 包装层纵向过渡 | AUTO |
| [`useAutoHideOnEdge`](references/hooks/use-auto-hide-on-edge.md) | 贴边隐藏、显示、吸边校正 | AUTO |
| [`useWindowAnimationX`](references/hooks/use-window-animation-x.md) | 窗口 X 轴动画 | AUTO |
| [`useWindowAnimationY`](references/hooks/use-window-animation-y.md) | 窗口 Y 轴动画 | AUTO |
| [`useWindowSize`](references/hooks/use-window-size.md) | 读取当前窗口尺寸 | AUTO |
| [`useWindowSizeLock`](references/hooks/use-window-size-lock.md) | 动画期间锁定窗口尺寸与位置 | AUTO |
| [`useDefaultOverlapContextMenu`](references/hooks/use-default-overlap-context-menu.md) | overlap 默认右键菜单 | AUTO |
| [`useContextMenu`](references/hooks/use-context-menu.md) | 自定义右键菜单结构和回调 | AUTO |
| [`useAppBroadcast`](references/hooks/use-app-broadcast.md) | 监听宿主广播事件 | AUTO |
| [`useIpcListener`](references/hooks/use-ipc-listener.md) | 监听 IPC channel | AUTO |
| [`useMenuListener`](references/hooks/use-menu-listener.md) | 处理菜单项点击等菜单事件 | AUTO |
| [`useShortcutListener`](references/hooks/use-shortcut-listener.md) | 监听快捷键触发结果 | AUTO |
| [`useKeyboardEvent`](references/hooks/use-keyboard-event.md) | 监听原生键盘事件 | AUTO |
| [`useMouseEvent`](references/hooks/use-mouse-event.md) | 监听宿主鼠标事件 | AUTO |
| [`useNotification`](references/hooks/use-notification.md) | 接收宿主通知 | AUTO |
| [`useAppLanguage`](references/hooks/use-app-language.md) | 单独读取或同步应用语言 | AUTO |
| [`useAppVersion`](references/hooks/use-app-version.md) | 读取应用版本信息 | AUTO |
| [`useTray`](references/hooks/use-tray.md) | 托盘菜单和托盘交互 | AUTO |
| [`useUser`](references/hooks/use-user.md) | 读取当前登录用户信息 | AUTO |
| [`useSupabaseChannel`](references/hooks/use-supabase-channel.md) | 订阅 Supabase 实时通道 | AUTO |
| [`useWidgetStorage`](references/hooks/use-widget-storage.md) | 持久化 widget 本地状态 | AUTO |
| [`useWidgetProxyConfig`](references/hooks/use-widget-proxy-config.md) | 读取或更新代理配置 | AUTO |

## 优先组合方式

### 页面级 widget

优先用 `useWidget` 作为入口，再按 UI 场景配合：

- 普通挂件：`WidgetWrapper`
- overlap 挂件：`OverlapWidgetWrapper`
- 配置页 / 设置页：`Window`

### overlap 场景

优先考虑这组组合：

- 容器：`OverlapWidgetWrapper`
- 行为：`useAutoHideOnEdge`
- 默认右键菜单：`useDefaultOverlapContextMenu`

如果只是要纵向视觉过渡，而不是完整贴边隐藏，可只用 `useOverlapWidgetWrapper`。

### 配置页 / 设置页

优先考虑这组组合：

- 页面骨架：`Window`
- 顶部标题栏：`WindowTitleBar`
- 底部保存区：`Window.footer`
- 表单内容：`WidgetThemeForm`、`WidgetProxyField` 或其他 `Widget*Field`

### 新增字段组件

如果任务是在当前包里新增一个字段组件：

- 优先沿用 `src/components/form/widget-form-field.tsx`
- 再复用 `src/components/ui/field.tsx`、`input.tsx`、`select.tsx`、`slider.tsx`、`switch.tsx` 等基础件
- 命名优先保持 `Widget*Field`

## 使用约定

- 先选高层 API，再补低层 API，不要重复订阅同类事件
- 如果 `useWidget` 已经满足页面初始化，就不要再单独拼参数、主题、语言广播监听
- 如果现有公开组件已经覆盖窗口壳层，不要再手写一套标题栏、拖拽区、背景层
- 涉及 `BrowserWindowApi`、`DeviceApi`、`MouseApi` 或宿主广播时，先确认代码运行在 Widget 宿主环境
- 用户没有明确要求内部实现时，优先写“如何复用现有 API”，不是“从零实现”

## 回答用户时的输出偏好

- 先明确推荐用哪些组件 / hooks
- 再说明为什么这么组合
- 如果要改代码，优先直接按 reference 中的推荐组合落地
- 如果存在运行环境前提，明确写出前提条件

## 示例提示词

- “给这个 widget 页面接入主题、参数和语言监听，再套一个现成容器”
- “当前 overlap 模式加默认右键菜单和贴边自动隐藏”
- “配置页别自己搭布局，看看现有 `@widget-js/react` 组件怎么拼”
- “我只想知道窗口标题栏、窗口控制按钮、主题表单分别该用什么”
