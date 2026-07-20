import type { Meta, StoryObj } from '@storybook/react-vite'
import { WindowTitleBar } from '@/components/window-title-bar'

const meta = {
  title: 'Components/WindowTitleBar',
  component: WindowTitleBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    minimize: { control: 'boolean' },
    maximize: { control: 'boolean' },
    close: { control: 'boolean' },
    floating: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%),linear-gradient(180deg,_rgba(15,23,42,0.04),_transparent_50%)] p-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-xl backdrop-blur">
          <Story />
        </div>
        <p className="mx-auto mt-4 max-w-5xl text-sm text-muted-foreground">
          标题栏按钮的点击行为依赖 `@widget-js/core` 运行环境；在 Storybook 中主要用于展示样式和布局。
        </p>
      </div>
    ),
  ],
} satisfies Meta<typeof WindowTitleBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Clock Settings',
    minimize: true,
    maximize: true,
    close: true,
    floating: false,
  },
}

export const MinimalActions: Story = {
  args: {
    title: 'Compact Window',
    minimize: false,
    maximize: false,
    close: true,
    floating: false,
  },
}

export const FloatingControls: Story = {
  args: {
    title: 'Floating Controls',
    minimize: true,
    maximize: true,
    close: true,
    floating: true,
  },
}
