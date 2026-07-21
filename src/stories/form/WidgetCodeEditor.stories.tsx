import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetCodeEditor } from '@/components/form/widget-code-editor'

const meta = {
  title: 'Form/WidgetCodeEditor',
  component: WidgetCodeEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: 'select',
      options: ['css', 'javascript', 'typescript'],
    },
    onChange: { control: false },
  },
} satisfies Meta<typeof WidgetCodeEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '')

    return (
      <div style={{ width: 720, padding: 16 }}>
        <WidgetCodeEditor
          {...args}
          value={value}
          onChange={setValue}
        />
        <pre className="mt-3 max-h-28 overflow-auto rounded-lg border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground">
          {value}
        </pre>
      </div>
    )
  },
  args: {
    title: '自定义 CSS',
    description: '支持 CSS 高亮与语法检查',
    language: 'css',
    height: 260,
    value: [
      '.widget {',
      '  color: #0095ff;',
      '  font-size: 14px;',
      '}',
      '',
      '.widget:hover {',
      '  transform: translateY(-1px);',
      '}',
    ].join('\n'),
  },
}

export const ReadOnly: Story = {
  render: args => (
    <div style={{ width: 720, padding: 16 }}>
      <WidgetCodeEditor {...args} />
    </div>
  ),
  args: {
    title: '预览 CSS',
    description: '只读模式',
    language: 'css',
    height: 240,
    readonly: true,
    value: [
      'body {',
      '  margin: 0;',
      '  background: rgba(0, 0, 0, 0.03);',
      '}',
    ].join('\n'),
  },
}

export const WithErrors: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '')

    return (
      <div style={{ width: 720, padding: 16 }}>
        <WidgetCodeEditor
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
  args: {
    title: '包含语法错误',
    description: '输入框下方会显示语法错误信息',
    language: 'css',
    height: 240,
    value: [
      '.widget {',
      '  color: ;',
      '}',
    ].join('\n'),
  },
}

const typeScriptExampleCode = `type User = {
  id: string
  name: string
}

export function greet(user: User) {
  return \`Hello, \${user.name}\`
}`

export const TypeScriptExample: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '')

    return (
      <div style={{ width: 720, padding: 16 }}>
        <WidgetCodeEditor
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
  args: {
    title: 'TypeScript 示例',
    description: '左侧显示 TypeScript Logo',
    language: 'typescript',
    height: 260,
    value: typeScriptExampleCode,
  },
}
