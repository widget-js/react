---
name: "widget-react-components"
description: "提供 @widget-js/react 组件选型与使用约定。用户要搭建桌面挂件 UI、窗口壳层、悬浮态容器或标题栏按钮时调用。"
---

# Widget React Components

用于在 `@widget-js/react` 包内优先复用 `src/components` 和 `src/index.ts` 已有组件，而不是重复手写窗口壳层、挂件容器、背景、缩放盒子、标题栏或表单控件。

## 何时调用

当用户有以下意图时调用本技能：

- 要在当前包内新增或改造挂件 UI
- 要组合桌面挂件、悬浮挂件、窗口外壳
- 要搭建配置页、设置页或带标题栏的窗口页面
- 要添加标题栏最小化、最大化、关闭按钮
- 要复用现有表单字段、颜色/字体/代理配置控件
- 要让内容按目标尺寸缩放适配
- 要先判断应该复用哪个现有组件

## 组件来源

- `src/components`
- 包统一导出入口：`src/index.ts`
- 对外公开组件优先从 `@widget-js/react` 导入
- 仅在包内维护组件时，再按需引用 `src/components/ui/*` 等内部实现

## 公开组件地图

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

### `Window`

适合标准窗口化页面骨架，内置：

- 吸顶标题栏 `WindowTitleBar`
- 中间独立滚动内容区
- 可选底部固定操作区 `footer`

主要 props：

- `title: ReactNode`
- `children: ReactNode`
- `footer?: ReactNode`

适合配置页、设置页、管理页这类“固定标题栏 + 可滚动正文 + 固定底栏”的布局。

### `WindowTitleBar`

适合窗口顶部标题栏，已内置 `WindowControls`，并处理：

- `app-region: drag`
- 毛玻璃半透明背景
- 顶部 sticky 吸附

主要 props：

- `title: ReactNode`
- `className?: string`
- `minimize?: boolean`
- `maximize?: boolean`
- `close?: boolean`
- `floating?: boolean`

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
- `floating?: boolean`

默认 `floating` 为 `true`，单独使用时会固定到右上角；嵌入标题栏时应传 `floating={false}`，`WindowTitleBar` 已经处理好了这点。

如果页面运行环境不是 Widget/Electron 窗口，不要直接使用它。

### `Button`

来自 `src/components/ui/button.tsx`，已通过包入口公开，适合常规操作按钮。

## 公开表单组件

这些组件通过 `src/components/form/index.ts` 导出，优先用于配置页面而不是从零拼装：

- `WidgetBindShortcutField`：快捷键绑定
- `WidgetCheckboxField`：布尔开关/复选
- `WidgetCodeEditor`：代码编辑
- `WidgetColorField`：颜色选择
- `WidgetFontSelector`：字体选择
- `WidgetPixelSliderField`：像素类滑块输入
- `WidgetProxyField`：代理设置
- `WidgetSliderField`：数值滑块输入
- `WidgetThemeForm`：主题配置表单

## 包内内部基础件

这些文件位于 `src/components/ui/*`，更适合维护包内部组件时复用：

- `button.tsx`
- `field.tsx`
- `input.tsx`
- `select.tsx`
- `slider.tsx`
- `switch.tsx`
- `textarea.tsx`
- `dialog.tsx`
- `popover.tsx`
- `separator.tsx`

若用户是要“在当前包里新增一个字段组件”，可直接复用这些基础件；若用户是包使用方，则优先暴露/复用已经公开导出的高层组件。

## 选型建议

- 普通挂件壳层：优先 `WidgetWrapper`
- 悬浮挂件壳层：优先 `OverlapWidgetWrapper`
- 标准窗口配置页：优先 `Window`
- 只需要标题栏：优先 `WindowTitleBar`
- 仅需要背景：优先 `WidgetBackground`
- 需要缩放适配：优先 `WidgetFitBox`
- 需要系统窗口按钮：优先 `WindowControls`
- 需要现成配置字段：优先 `Widget*Field` / `WidgetThemeForm`
- 常规表单或动作按钮：优先 `Button`

## 使用约定

- 默认优先复用公开导出的组件，不要重复实现窗口壳层
- `Window` 已处理“标题栏和底栏在滚动区外”的布局，配置页优先直接使用
- `WindowControls` 依赖窗口环境；在可拖拽标题栏区域内必须保持 `app-region: no-drag`
- 如果需要背景定制，优先通过 `WidgetWrapper.background` 注入
- 如果要在包内新增字段组件，优先沿用 `src/components/ui/field.tsx` 的字段结构和现有 `Widget*Field` 命名
- 如果组件依赖窗口 API，先确认运行环境来自 `@widget-js/core`
- 如果要新增组件，优先保持与现有 `widget-*` 命名和导出方式一致

## 示例提示词

- “用 `@widget-js/react` 现有组件搭一个桌面挂件外壳”
- “给配置页面套一个带标题栏和底部操作区的窗口布局”
- “给窗口标题栏接入现有的 `WindowControls`，不要自己写关闭按钮”
- “给当前 widget 页面接入窗口控制按钮”
- “把内容放进可缩放容器，限制最大宽高”
- “为 overlap 模式页面套上现有 wrapper，不要重新造轮子”
- “在包内新增一个表单字段组件，尽量复用现有 `ui` 基础件”

## 示例代码

```tsx
import { WidgetFitBox, Window } from '@widget-js/react'
import { Button } from '@widget-js/react'

export function DemoWindow() {
  return (
    <Window
      title="Clock Config"
      footer={<Button>Save</Button>}
    >
      <WidgetFitBox width={320} height={180} widgetWidth={400} widgetHeight={220}>
        <div>Hello Widget</div>
      </WidgetFitBox>
    </Window>
  )
}
```
