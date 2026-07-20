import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetColorField } from '@/components/form/widget-color-field'

const meta = {
  title: 'Form/WidgetColorField',
  component: WidgetColorField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetColorField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '#FFFFFF')

    return (
      <div style={{ width: 520, padding: 16 }}>
        <WidgetColorField
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
    title: '主色调',
    value: '#0095ff',
  },
}

export const Disabled: Story = {
  args: {
    title: '不可用',
    value: '#0095ff',
    disabled: true,
  },
}
