import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetPixelSliderField } from '@/components/form/widget-pixel-slider-field'

const meta = {
  title: 'Form/WidgetPixelSliderField',
  component: WidgetPixelSliderField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof WidgetPixelSliderField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>(args.value?.toString() ?? '14px')

    return (
      <div style={{ width: 520, padding: 16 }}>
        <WidgetPixelSliderField
          {...args}
          value={value}
          onChange={setValue}
        />
        <div className="mt-3 text-xs text-muted-foreground">
          {`value: ${value}`}
        </div>
      </div>
    )
  },
  args: {
    title: '文字大小',
    min: 10,
    max: 40,
    value: '14px',
  },
}

export const Disabled: Story = {
  args: {
    title: '不可用',
    min: 10,
    max: 40,
    value: '18px',
    disabled: true,
  },
}
