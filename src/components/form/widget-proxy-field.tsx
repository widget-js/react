import { useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { WidgetFormField } from './widget-form-field'

const translations = {
  en: {
    protocol: 'Protocol',
    host: 'Host',
    port: 'Port',
  },
  zh: {
    protocol: '代理协议',
    host: '代理地址',
    port: '代理端口',
  },
  ru: {
    protocol: 'Протокол',
    host: 'Адрес',
    port: 'Порт',
  },
  jp: {
    protocol: 'プロトコル',
    host: 'ホスト',
    port: 'ポート',
  },
} as const

type ProxyProtocol = 'http' | 'https' | 'sock4' | 'sock5'

function detectLocale(locale?: string) {
  const rawLocale = locale
    ?? (typeof document !== 'undefined' && document.documentElement.lang)
    ?? (typeof navigator !== 'undefined' ? navigator.language : 'zh-CN')

  const lowerLocale = rawLocale.toString().toLowerCase()
  if (lowerLocale.startsWith('ru')) {
    return 'ru'
  }

  if (lowerLocale.startsWith('ja') || lowerLocale.startsWith('jp')) {
    return 'jp'
  }

  if (lowerLocale.startsWith('en')) {
    return 'en'
  }

  return 'zh'
}

export interface WidgetProxyFieldProps {
  protocol?: ProxyProtocol
  host?: string
  port?: string
  disabled?: boolean
  locale?: string
  labelWidth?: string | number
  onProtocolChange?: (value: ProxyProtocol) => void
  onHostChange?: (value: string) => void
  onPortChange?: (value: string) => void
}

export function WidgetProxyField({
  protocol,
  host = '',
  port = '',
  disabled = false,
  locale,
  labelWidth,
  onProtocolChange,
  onHostChange,
  onPortChange,
}: WidgetProxyFieldProps) {
  const label = useMemo(() => translations[detectLocale(locale)], [locale])

  return (
    <div className="flex flex-col gap-4">
      <WidgetFormField title={label.protocol} labelWidth={labelWidth} contentClassName="items-start">
        <RadioGroup
          className="flex flex-wrap gap-4"
          value={protocol}
          disabled={disabled}
          onValueChange={value => onProtocolChange?.(value as ProxyProtocol)}
        >
          {['http', 'https', 'sock4', 'sock5'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <RadioGroupItem id={`proxy-${item}`} value={item} />
              <Label htmlFor={`proxy-${item}`}>{item.toUpperCase()}</Label>
            </div>
          ))}
        </RadioGroup>
      </WidgetFormField>

      <WidgetFormField title={label.host} labelWidth={labelWidth}>
        <Input
          placeholder="127.0.0.1"
          value={host}
          disabled={disabled}
          onChange={event => onHostChange?.(event.target.value)}
        />
      </WidgetFormField>

      <WidgetFormField title={label.port} labelWidth={labelWidth} contentClassName="max-w-28">
        <Input
          placeholder="7890"
          value={port}
          disabled={disabled}
          onChange={event => onPortChange?.(event.target.value)}
        />
      </WidgetFormField>
    </div>
  )
}
