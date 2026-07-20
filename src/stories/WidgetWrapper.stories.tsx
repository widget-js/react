import type { Meta, StoryObj } from '@storybook/react-vite'
import { WidgetWrapper } from '@/components/widget-wrapper'

const meta = {
  title: 'Components/WidgetWrapper',
  component: WidgetWrapper,
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
          ['--widget-wallpaper' as any]: 'linear-gradient(135deg, rgba(59,130,246,0.35), rgba(236,72,153,0.25))',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WidgetWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    padding: 12,
    shadowColor: 'rgba(0,0,0,0.2)',
    children: (
      <div style={{ width: '100%', height: '100%', padding: 16, color: 'white' }}>
        <div style={{ fontSize: 14, opacity: 0.9 }}>WidgetWrapper</div>
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
          这里可以放你的组件内容，用于调试背景、内外边距与缩放效果
        </div>
      </div>
    ),
  },
}

export const CustomBackground: Story = {
  args: {
    padding: 12,
    shadowColor: 'rgba(0,0,0,0.25)',
    background: (
      <div
        className="widget-background-stack"
        style={{
          borderRadius: '22px',
          background: 'rgba(0,0,0,0.2)',
          border: '1px dashed rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 12,
        }}
      >
        Custom Background Slot
      </div>
    ),
    children: (
      <div style={{ width: '100%', height: '100%', padding: 16, color: 'white' }}>
        <div style={{ fontSize: 14, opacity: 0.9 }}>Custom Background</div>
      </div>
    ),
  },
}
