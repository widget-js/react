import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetBindShortcutField } from '@/components/form/widget-bind-shortcut-field'

const meta = {
  title: 'Form/WidgetBindShortcutField',
  component: WidgetBindShortcutField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetBindShortcutField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '')
    const shownValue = value || '(empty)'

    return (
      <div style={{ width: 420, padding: 16 }}>
        <WidgetBindShortcutField
          {...args}
          value={value}
          onChange={setValue}
        />
        <div className="mt-3 text-xs text-muted-foreground">
          {`value: ${shownValue}（点击输入框，按 Ctrl/Alt/Shift/Win + 任意键）`}
        </div>
      </div>
    )
  },
  args: {
    title: '快捷键',
    placeholder: '点击设置快捷键',
    clearable: true,
  },
}
