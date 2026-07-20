import type { Meta, StoryObj } from '@storybook/react-vite'
import { WidgetOverlapDragButton } from '@/components/widget-overlap-drag-button'

function setOverlapModeInUrl() {
  const url = new URL(window.location.href)
  url.searchParams.set('w_mode', '16')
  window.history.replaceState({}, '', url.toString())
}

const meta = {
  title: 'Components/WidgetOverlapDragButton',
  component: WidgetOverlapDragButton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      setOverlapModeInUrl()
      return (
        <div style={{ height: '100vh', width: '100vw' }}>
          <style>{`.overlap-drag-button{opacity:0.5 !important}`}</style>
          <div style={{ padding: 16, fontSize: 12, opacity: 0.8 }}>
            该按钮只在 DeployMode=OVERLAP（w_mode=16）时显示；此 Story 会自动写入 URL 参数。
          </div>
          <Story />
        </div>
      )
    },
  ],
} satisfies Meta<typeof WidgetOverlapDragButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
