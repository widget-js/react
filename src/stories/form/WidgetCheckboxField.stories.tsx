import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetCheckboxField } from '@/components/form/widget-checkbox-field'

const meta = {
  title: 'Form/WidgetCheckboxField',
  component: WidgetCheckboxField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetCheckboxField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false)

    return (
      <div style={{ width: 420, padding: 16 }}>
        <WidgetCheckboxField
          {...args}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <div className="mt-3 text-xs text-muted-foreground">
          {`checked: ${String(checked)}`}
        </div>
      </div>
    )
  },
  args: {
    title: '启用功能',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    title: '不可用',
    checked: true,
    disabled: true,
  },
}
