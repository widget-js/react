export interface WidgetThemeOption {
  useGlobalTheme?: boolean
  borderRadius?: boolean
  backgroundColor?: boolean
  backgroundBorderColor?: boolean
  backgroundBoxShadowColor?: boolean
  fontSize?: number[]
  dividerColor?: boolean
  primaryColor?: boolean
  color?: boolean
  fontFamily?: boolean
}

export interface IWidgetConfigOption {
  custom?: boolean
  title?: string
  theme?: WidgetThemeOption
  showFooter?: boolean
}

export class WidgetConfigOption implements IWidgetConfigOption {
  custom: boolean
  theme?: WidgetThemeOption
  title?: string
  showFooter?: boolean

  constructor(option: IWidgetConfigOption) {
    this.custom = option.custom ?? true
    this.showFooter = option.showFooter
    this.theme = option.theme
    this.title = option.title
  }

  isSupportBackgroundSetting(): boolean | undefined {
    if (!this.theme) {
      return false
    }

    return this.theme.borderRadius || this.theme.backgroundColor
  }

  isSupportTextSetting(): boolean | undefined {
    if (!this.theme) {
      return false
    }

    if (this.theme.fontSize) {
      return true
    }

    return !!this.theme.color
  }
}
