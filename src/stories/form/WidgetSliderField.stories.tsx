import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetSliderField } from '@/components/form/widget-slider-field'

const meta = {
  title: 'Form/WidgetSliderField',
  component: WidgetSliderField,
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
} satisfies Meta<typeof WidgetSliderField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 40)

    return (
      <div style={{ width: 520, padding: 16 }}>
        <WidgetSliderField
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
    title: '透明度',
    min: 0,
    max: 100,
    step: 1,
    value: 40,
  },
}

export const Disabled: Story = {
  args: {
    title: '不可用',
    min: 0,
    max: 100,
    value: 25,
    disabled: true,
  },
}
