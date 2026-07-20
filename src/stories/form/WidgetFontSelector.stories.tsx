import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetFontSelector } from '@/components/form/widget-font-selector'

const demoFonts = [
  'Geist Variable',
  'Inter',
  'SF Pro Display',
  'PingFang SC',
  'Microsoft YaHei',
  'HarmonyOS Sans SC',
  'Noto Sans SC',
  'Source Han Sans SC',
  'JetBrains Mono',
  'Fira Code',
  'IBM Plex Sans',
  'Roboto',
]

const meta = {
  title: 'Form/WidgetFontSelector',
  component: WidgetFontSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetFontSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(args.value)

    return (
      <div style={{ width: 520, padding: 16 }}>
        <WidgetFontSelector
          {...args}
          value={value}
          onChange={setValue}
        />
        <div className="mt-3 text-xs text-muted-foreground">
          输入关键字可搜索字体，点击右侧清除按钮可恢复默认值。
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {`value: ${value ?? '(default)'}`}
        </div>
      </div>
    )
  },
  args: {
    placeholder: '默认字体',
    options: demoFonts,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: '默认字体',
    options: demoFonts,
    disabled: true,
  },
}
