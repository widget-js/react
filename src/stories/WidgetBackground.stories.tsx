import type { Meta, StoryObj } from '@storybook/react-vite'
import { WidgetBackground } from '@/components/widget-background'

const meta = {
  title: 'Components/WidgetBackground',
  component: WidgetBackground,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div
        style={{
          width: 320,
          height: 220,
          position: 'relative',
          ['--widget-outer-padding' as any]: '12px',
          ['--widget-inner-width' as any]: '320px',
          ['--widget-inner-height' as any]: '220px',
          ['--widget-border-radius' as any]: '22px',
          ['--widget-background-color' as any]: 'rgba(0,0,0,0.45)',
          ['--widget-background-border-color' as any]: 'hsla(0,0%,100%,.06)',
          ['--widget-background-box-shadow-color' as any]: 'hsla(0, 0%, 100%, 0.1)',
          ['--widget-wallpaper-blur' as any]: '16px',
          ['--widget-wallpaper' as any]: 'linear-gradient(135deg, rgba(34,197,94,0.35), rgba(59,130,246,0.25))',
        }}
      >
        <Story />
        <div style={{ position: 'absolute', inset: 0, padding: 16, color: 'white', pointerEvents: 'none' }}>
          <div style={{ fontSize: 14, opacity: 0.9 }}>WidgetBackground</div>
          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>用于预览背景层叠、毛玻璃与壁纸变量</div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof WidgetBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
