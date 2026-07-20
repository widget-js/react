import type { AppTheme } from '@widget-js/core'
import type { WidgetThemeOption } from '@/model/WidgetConfigOption'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { WidgetColorField } from './widget-color-field'
import { WidgetFontSelector } from './widget-font-selector'
import { WidgetFormField } from './widget-form-field'
import { WidgetPixelSliderField } from './widget-pixel-slider-field'

const predefineDividerColor = [
  'rgba(255, 255, 255, 0.4)',
  'rgba(144,147,153,0.4)',
  'rgba(0, 0, 0, 0.4)',
  'rgba(229,57,53,0.4)',
  'rgba(251,140,0,0.4)',
  'rgba(253,216,53,0.4)',
  'rgba(67,160,71,0.4)',
  'rgba(3,155,229,0.4)',
  'rgba(57,73,171,0.4)',
  'rgba(142,36,170,0.4)',
]

export interface WidgetThemeFormProps {
  themeOption: WidgetThemeOption
  value: AppTheme
  onChange?: (value: AppTheme) => void
  showSectionHeader?: boolean
  className?: string
}

function SectionHeader({
  title,
}: {
  title: string
}) {
  return (
    <div className="flex items-center gap-3">
      <h4 className="shrink-0 whitespace-nowrap text-sm font-semibold text-foreground">{title}</h4>
      <Separator className="flex-1 shrink" />
    </div>
  )
}

export function WidgetThemeForm({
  themeOption,
  value,
  onChange,
  showSectionHeader = true,
  className,
}: WidgetThemeFormProps) {
  const isGlobalThemeDisabled = themeOption.useGlobalTheme === false || !value.useGlobalTheme
  const showColorSection = !!(themeOption.primaryColor || themeOption.dividerColor)
  const showTextSection = !!(themeOption.color || themeOption.fontSize || themeOption.fontFamily)
  const showBackgroundSection = !!(
    themeOption.backgroundColor
    || themeOption.backgroundBorderColor
    || themeOption.borderRadius
    || themeOption.backgroundBoxShadowColor
  )

  return (
    <div className={className}>
      <div className="flex flex-col gap-6 text-left">
        {themeOption.useGlobalTheme !== false && (
          <WidgetFormField title="使用全局主题">
            <Switch
              checked={value.useGlobalTheme}
              onCheckedChange={checked => onChange?.(value.copy({ useGlobalTheme: checked }))}
            />
          </WidgetFormField>
        )}

        {isGlobalThemeDisabled && (
          <>
            {showColorSection && (
              <section className="flex flex-col gap-4">
                {showSectionHeader && <SectionHeader title="颜色" />}
                {themeOption.primaryColor && (
                  <WidgetColorField
                    title="主色调"
                    value={value.colors.primary}
                    onChange={nextValue => onChange?.(value.copy({ colors: { primary: nextValue } }))}
                  />
                )}
                {themeOption.dividerColor && (
                  <WidgetColorField
                    title="分割线"
                    value={value.colors.border}
                    predefine={predefineDividerColor}
                    onChange={nextValue => onChange?.(value.copy({ colors: { border: nextValue } }))}
                  />
                )}
              </section>
            )}

            {showTextSection && (
              <section className="flex flex-col gap-4">
                {showSectionHeader && <SectionHeader title="文字" />}
                {themeOption.color && (
                  <WidgetColorField
                    title="文字颜色"
                    value={value.colors.foreground}
                    onChange={nextValue => onChange?.(value.copy({ colors: { foreground: nextValue } }))}
                  />
                )}
                {themeOption.fontFamily && (
                  <WidgetFormField title="字体">
                    <WidgetFontSelector
                      value={value.typography.fontFamily}
                      onChange={nextValue => onChange?.(value.copy({ typography: { fontFamily: nextValue ?? '' } }))}
                    />
                  </WidgetFormField>
                )}
                {themeOption.fontSize && (
                  <WidgetPixelSliderField
                    title="文字大小"
                    value={value.typography.fontSize}
                    min={themeOption.fontSize[0] ?? 6}
                    max={themeOption.fontSize[1] ?? 50}
                    onChange={nextValue => onChange?.(value.copy({ typography: { fontSize: nextValue } }))}
                  />
                )}
              </section>
            )}

            {showBackgroundSection && (
              <section className="flex flex-col gap-4">
                {showSectionHeader && <SectionHeader title="背景" />}
                {themeOption.backgroundColor && (
                  <WidgetColorField
                    title="背景颜色"
                    value={value.colors.background}
                    onChange={nextValue => onChange?.(value.copy({ colors: { background: nextValue } }))}
                  />
                )}
                {themeOption.backgroundBorderColor && (
                  <WidgetColorField
                    title="背景边框"
                    value={value.colors.border}
                    onChange={nextValue => onChange?.(value.copy({ colors: { border: nextValue } }))}
                  />
                )}
                {themeOption.borderRadius && (
                  <WidgetPixelSliderField
                    title="背景圆角"
                    value={value.radius.lg}
                    max={50}
                    onChange={nextValue => onChange?.(value.copy({ radius: { lg: nextValue } }))}
                  />
                )}
                {themeOption.backgroundBoxShadowColor && (
                  <WidgetColorField
                    title="内阴影"
                    value={value.colors.innerShadow}
                    onChange={nextValue => onChange?.(value.copy({ colors: { innerShadow: nextValue } }))}
                  />
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
