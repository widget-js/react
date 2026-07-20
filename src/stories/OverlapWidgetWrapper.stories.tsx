import type { Meta, StoryObj } from '@storybook/react-vite'
import { OverlapWidgetWrapper } from '@/components/overlap-widget-wrapper'

const meta = {
  title: 'Components/OverlapWidgetWrapper',
  component: OverlapWidgetWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    shadowColor: { control: 'text' },
    padding: { control: { type: 'number', min: 0, max: 48, step: 1 } },
  },
  decorators: [
    Story => (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          ['--widget-border-radius' as any]: '22px',
          ['--widget-background-color' as any]: 'rgba(0,0,0,0.45)',
          ['--widget-background-border-color' as any]: 'hsla(0,0%,100%,.06)',
          ['--widget-background-box-shadow-color' as any]: 'hsla(0, 0%, 100%, 0.1)',
          ['--widget-wallpaper-blur' as any]: '16px',
          ['--widget-wallpaper' as any]: 'linear-gradient(135deg, rgba(14,165,233,0.25), rgba(168,85,247,0.20))',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OverlapWidgetWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    padding: 12,
    shadowColor: 'rgba(0,0,0,0.2)',
    children: (
      <div style={{ width: '100%', height: '100%', padding: 16, color: 'white' }}>
        <div style={{ fontSize: 14, opacity: 0.9 }}>OverlapWidgetWrapper</div>
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
          当前 hook 会驱动 translateY 动画（用于悬浮窗上下滑动效果）
        </div>
      </div>
    ),
  },
}
