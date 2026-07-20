import { useEffect, useMemo, useState } from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

interface LocalFont {
  family: string
}

interface FontOption {
  label: string
  value: string
  preview: string
}

function getDocumentLanguage() {
  if (typeof document !== 'undefined' && document.documentElement.lang) {
    return document.documentElement.lang
  }

  if (typeof navigator !== 'undefined') {
    return navigator.language
  }

  return 'zh-CN'
}

export interface WidgetFontSelectorProps {
  value?: string
  disabled?: boolean
  placeholder?: string
  options?: string[]
  onChange?: (value: string | undefined) => void
}

export function WidgetFontSelector({
  value,
  disabled = false,
  placeholder = '默认字体',
  options,
  onChange,
}: WidgetFontSelectorProps) {
  const [localFonts, setLocalFonts] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const previewText = useMemo(() => {
    return getDocumentLanguage().toLowerCase().startsWith('zh')
      ? '中国智造，慧及全球'
      : 'The quick brown fox jumps over the lazy dog'
  }, [])
  const hasCustomOptions = (options?.length ?? 0) > 0
  const hasLocalFontApi = typeof window !== 'undefined' && typeof (window as Window & {
    queryLocalFonts?: () => Promise<LocalFont[]>
  }).queryLocalFonts === 'function'
  const fonts = useMemo(() => {
    const source = hasCustomOptions ? options : localFonts
    return [...new Set((source ?? []).filter(Boolean))]
  }, [hasCustomOptions, localFonts, options])
  const fontOptions = useMemo<FontOption[]>(
    () => fonts.map(font => ({
      label: font,
      value: font,
      preview: previewText,
    })),
    [fonts, previewText],
  )
  const emptyText = loading
    ? '正在读取字体...'
    : (hasCustomOptions || hasLocalFontApi)
        ? '未找到匹配字体'
        : '当前环境不支持读取本地字体'

  useEffect(() => {
    if (hasCustomOptions) {
      setLoading(false)
      return
    }

    async function loadFonts() {
      if (typeof document === 'undefined' || document.visibilityState !== 'visible') {
        return
      }

      const localWindow = window as Window & {
        queryLocalFonts?: () => Promise<LocalFont[]>
      }

      if (typeof localWindow.queryLocalFonts !== 'function') {
        return
      }

      setLoading(true)
      try {
        const localFonts = await localWindow.queryLocalFonts()
        const uniqueFamilies = [...new Set(localFonts.map(font => font.family).filter(Boolean))]
        setLocalFonts(uniqueFamilies)
      }
      finally {
        setLoading(false)
      }
    }

    void loadFonts()

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible' && localFonts.length === 0) {
        void loadFonts()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [hasCustomOptions, localFonts.length])

  return (
    <Combobox
      items={fontOptions}
      value={fontOptions.find(font => font.value === value) ?? null}
      disabled={disabled || loading || (!hasCustomOptions && !hasLocalFontApi)}
      onValueChange={nextValue => onChange?.(nextValue?.value ?? undefined)}
      autoHighlight
    >
      <ComboboxInput
        className="w-full"
        placeholder={loading ? '正在读取字体...' : placeholder}
        showClear={Boolean(value)}
      />
      <ComboboxContent>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {font => (
            <ComboboxItem key={font.value} value={font}>
              <div className="flex min-w-0 flex-col">
                <span className="truncate" style={{ fontFamily: font.value }}>
                  {font.label}
                </span>
                <span className="truncate text-xs text-muted-foreground" style={{ fontFamily: font.value }}>
                  {font.preview}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
