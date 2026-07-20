import type { Meta, StoryObj } from '@storybook/react-vite'
import { WidgetFitBox } from '@/components/widget-fit-box'

const meta = {
  title: 'Components/WidgetFitBox',
  component: WidgetFitBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'number', min: 50, max: 600, step: 10 } },
    height: { control: { type: 'number', min: 50, max: 600, step: 10 } },
    widgetWidth: { control: { type: 'number', min: 50, max: 800, step: 10 } },
    widgetHeight: { control: { type: 'number', min: 50, max: 800, step: 10 } },
  },
} satisfies Meta<typeof WidgetFitBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 320,
    height: 220,
    widgetWidth: 480,
    widgetHeight: 320,
    children: (
      <div
        style={{
          width: 480,
          height: 320,
          background: 'rgba(59,130,246,0.15)',
          border: '1px dashed rgba(59,130,246,0.6)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
        }}
      >
        480×320 内容区域（会按容器缩放）
      </div>
    ),
  },
}
