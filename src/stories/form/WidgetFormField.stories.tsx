import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId } from 'react'
import { WidgetFormField } from '@/components/form/widget-form-field'
import { Input } from '@/components/ui/input'

const meta = {
  title: 'Form/WidgetFormField',
  component: WidgetFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetFormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const id = useId()

    return (
      <div style={{ width: 480, padding: 16 }}>
        <WidgetFormField {...args} htmlFor={id}>
          <Input id={id} placeholder="Type something..." />
        </WidgetFormField>
      </div>
    )
  },
  args: {
    title: '标题',
  },
}

export const FixedLabelWidth: Story = {
  render: (args) => {
    const id = useId()

    return (
      <div style={{ width: 480, padding: 16 }}>
        <WidgetFormField {...args} htmlFor={id}>
          <Input id={id} placeholder="Label width 120" />
        </WidgetFormField>
      </div>
    )
  },
  args: {
    title: 'Label',
    labelWidth: 120,
  },
}
