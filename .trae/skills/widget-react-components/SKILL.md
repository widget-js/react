---
name: "widget-react-components"
description: "提供 @widget-js/react 组件选型与使用约定。用户要搭建桌面挂件 UI、窗口壳层、悬浮态容器或标题栏按钮时调用。"
---

# Widget React Components

用于在 `@widget-js/react` 包内优先复用现有组件，而不是重复手写窗口容器、背景、缩放盒子或窗口控制按钮。

## 何时调用

当用户有以下意图时调用本技能：

- 要在当前包内新增或改造挂件 UI
- 要组合桌面挂件、悬浮挂件、窗口外壳
- 要添加标题栏最小化、最大化、关闭按钮
- 要让内容按目标尺寸缩放适配
- 要先判断应该复用哪个现有组件

## 组件来源

- `src/components`
- 包统一导出入口：`src/index.ts`
- 推荐从 `@widget-js/react` 直接导入公开组件

## 可用组件

### `WidgetWrapper`

适合普通桌面挂件容器，自动组合：

- 编辑态遮罩
- 默认背景 `WidgetBackground`
- 悬浮拖拽按钮 `WidgetOverlapDragButton`
- 包裹层样式变量，来自 `useWidgetWrapper`

主要 props：

- `shadowColor?: string`
- `padding?: number`
- `children?: ReactNode`
- `background?: ReactNode`

### `OverlapWidgetWrapper`

适合悬浮模式容器，结合：

- `useOverlapWidgetWrapper`
- `useWidgetWrapper`

它会把内容包在 `widget-wrapper` 中，并通过 `translate3d` 应用纵向过渡。

主要 props：

- `shadowColor?: string`
- `padding?: number`
- `children?: ReactNode`

### `WidgetBackground`

适合需要默认挂件背景层时复用，输出：

- `.widget-background-stack`
- `.widget-background`
- `.widget-background-mask`

### `WidgetFitBox`

适合让挂件内容在给定外框内按比例缩放。

主要 props：

- `width?: number`
- `height?: number`
- `widgetWidth?: number`
- `widgetHeight?: number`
- `children?: ReactNode`

内部使用 `useWidgetScale` 计算缩放比。

### `WidgetOverlapDragButton`

适合悬浮模式下提供拖拽入口：

- 仅在 `DeployMode.OVERLAP` 下渲染
- 鼠标进入时切换 `app-region`
- 一段时间无交互后自动降低可见度

通常无需手动单独接入，`WidgetWrapper` 已内置。

### `WindowControls`

适合桌面窗口标题栏控制按钮，直接调用 `BrowserWindowApi`：

- `minimize`
- `maximize`
- `close`

主要 props：

- `minimize?: boolean`
- `maximize?: boolean`
- `close?: boolean`

如果页面运行环境不是 Widget/Electron 窗口，不要直接使用它。

### `Button`

来自 `src/components/ui/button.tsx`，适合常规操作按钮。

## 选型建议

- 普通挂件壳层：优先 `WidgetWrapper`
- 悬浮挂件壳层：优先 `OverlapWidgetWrapper`
- 仅需要背景：优先 `WidgetBackground`
- 需要缩放适配：优先 `WidgetFitBox`
- 需要系统窗口按钮：优先 `WindowControls`
- 常规表单或动作按钮：优先 `Button`

## 使用约定

- 默认优先复用公开导出的组件，不要重复实现窗口壳层
- 如果需要背景定制，优先通过 `WidgetWrapper.background` 注入
- 如果组件依赖窗口 API，先确认运行环境来自 `@widget-js/core`
- 如果要新增组件，优先保持与现有 `widget-*` 命名和导出方式一致

## 示例提示词

- “用 `@widget-js/react` 现有组件搭一个桌面挂件外壳”
- “给当前 widget 页面接入窗口控制按钮”
- “把内容放进可缩放容器，限制最大宽高”
- “为 overlap 模式页面套上现有 wrapper，不要重新造轮子”

## 示例代码

```tsx
import { WidgetWrapper, WindowControls, WidgetFitBox } from '@widget-js/react'

export function DemoWidget() {
  return (
    <WidgetWrapper padding={12}>
      <WindowControls maximize={false} />
      <WidgetFitBox width={320} height={180} widgetWidth={400} widgetHeight={220}>
        <div>Hello Widget</div>
      </WidgetFitBox>
    </WidgetWrapper>
  )
}
```
