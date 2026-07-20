import type { Meta, StoryObj } from '@storybook/react-vite'
import type { WidgetThemeOption } from '@/model/WidgetConfigOption'
import { AppTheme } from '@widget-js/core'
import { useState } from 'react'
import { WidgetThemeForm } from '@/components/form/widget-theme-form'

const meta = {
  title: 'Form/WidgetThemeForm',
  component: WidgetThemeForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetThemeForm>

export default meta
type Story = StoryObj<typeof meta>

function ThemeFormStory({
  themeOption,
  showSectionHeader,
}: {
  themeOption: WidgetThemeOption
  showSectionHeader?: boolean
}) {
  const [theme, setTheme] = useState(() => new AppTheme({ useGlobalTheme: false }))

  return (
    <div style={{ width: 640, padding: 16 }}>
      <WidgetThemeForm
        themeOption={themeOption}
        value={theme}
        onChange={setTheme}
        showSectionHeader={showSectionHeader}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ThemeFormStory
      themeOption={{
        borderRadius: true,
        backgroundColor: true,
        useGlobalTheme: false,
        backgroundBorderColor: true,
        fontSize: [10, 40],
        dividerColor: true,
        primaryColor: true,
        color: true,
        fontFamily: true,
      }}
    />
  ),
}

export const NoBackground: Story = {
  render: () => (
    <ThemeFormStory
      themeOption={{
        fontSize: [10, 40],
        dividerColor: true,
        primaryColor: true,
        color: true,
        useGlobalTheme: false,
        fontFamily: true,
      }}
    />
  ),
}

export const NoText: Story = {
  render: () => (
    <ThemeFormStory
      themeOption={{
        borderRadius: true,
        useGlobalTheme: false,
        backgroundColor: true,
        backgroundBorderColor: true,
        dividerColor: true,
        primaryColor: true,
      }}
    />
  ),
}

export const UseGlobalTheme: Story = {
  render: () => (
    <ThemeFormStory
      themeOption={{
        borderRadius: true,
        backgroundColor: true,
        backgroundBorderColor: true,
        fontSize: [10, 40],
        color: true,
        fontFamily: true,
      }}
    />
  ),
}

export const WithoutSectionHeader: Story = {
  render: () => (
    <ThemeFormStory
      showSectionHeader={false}
      themeOption={{
        borderRadius: true,
        backgroundColor: true,
        backgroundBorderColor: true,
        fontSize: [10, 40],
        dividerColor: true,
        primaryColor: true,
        color: true,
        fontFamily: true,
        useGlobalTheme: false,
      }}
    />
  ),
}
