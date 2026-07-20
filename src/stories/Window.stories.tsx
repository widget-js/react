import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Window } from '@/components/window'

function DemoSection({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </section>
  )
}

function DemoContent({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <DemoSection
          key={index}
          title={`Section ${index + 1}`}
          description="用于展示 Window 组件的中间滚动内容区。你可以在这里放设置表单、说明文档或预览卡片，验证标题栏和底部操作区不会跟随内容滚动。"
        />
      ))}
    </div>
  )
}

const meta = {
  title: 'Components/Window',
  component: Window,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    children: { control: false },
    footer: { control: false },
  },
  decorators: [
    Story => (
      <div className="h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_36%),linear-gradient(180deg,_rgba(15,23,42,0.06),_transparent_55%)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Window>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Widget Preferences',
    children: <DemoContent count={5} />,
    footer: (
      <div className="flex flex-wrap justify-end gap-3">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="button">Save Changes</Button>
      </div>
    ),
  },
}

export const WithoutFooter: Story = {
  args: {
    title: 'Preview Window',
    children: <DemoContent count={4} />,
  },
}

export const LongContent: Story = {
  args: {
    title: 'Scrollable Content',
    children: <DemoContent count={12} />,
    footer: (
      <div className="flex flex-wrap justify-end gap-3">
        <Button type="button" variant="outline">Reset</Button>
        <Button type="button">Apply</Button>
      </div>
    ),
  },
}
