import type { Meta, StoryObj } from '@storybook/react'
import { WindowControls } from '../components/window-controls'

const meta = {
  title: 'Components/WindowControls',
  component: WindowControls,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    minimize: { control: 'boolean' },
    maximize: { control: 'boolean' },
    close: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div className="relative w-full h-64 bg-slate-100 dark:bg-slate-800 p-4">
        <p className="text-sm text-muted-foreground">
          Window controls will appear in the top-right corner of this container (if fixed positioning allows) or the viewport.
          <br />
          Note: Functional buttons require @widget-js/core environment.
        </p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WindowControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    minimize: true,
    maximize: true,
    close: true,
  },
}

export const HideMinimize: Story = {
  args: {
    minimize: false,
    maximize: true,
    close: true,
  },
}

export const OnlyClose: Story = {
  args: {
    minimize: false,
    maximize: false,
    close: true,
  },
}
