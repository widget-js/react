import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { WidgetProxyField } from '@/components/form/widget-proxy-field'

const meta = {
  title: 'Form/WidgetProxyField',
  component: WidgetProxyField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetProxyField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [protocol, setProtocol] = useState(args.protocol)
    const [host, setHost] = useState(args.host ?? '127.0.0.1')
    const [port, setPort] = useState(args.port ?? '7890')
    const proxyRule = protocol ? `${protocol}://${host}:${port}` : '(not set)'

    return (
      <div style={{ width: 560, padding: 16 }}>
        <WidgetProxyField
          {...args}
          protocol={protocol}
          host={host}
          port={port}
          onProtocolChange={setProtocol}
          onHostChange={setHost}
          onPortChange={setPort}
        />
        <div className="mt-3 text-xs text-muted-foreground">
          {`proxy: ${proxyRule}`}
        </div>
      </div>
    )
  },
  args: {
    labelWidth: 88,
    protocol: 'http',
    host: '127.0.0.1',
    port: '7890',
  },
}

export const Disabled: Story = {
  args: {
    labelWidth: 88,
    protocol: 'http',
    host: '127.0.0.1',
    port: '7890',
    disabled: true,
  },
}
