import { useEffect, useId, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { WidgetColorPickerPanel } from './widget-color-picker-panel'

const defaultPredefineColors = [
  '#FFFFFF',
  '#909399',
  '#000000',
  '#e53935',
  '#fb8c00',
  '#fdd835',
  '#43a047',
  '#039be5',
  '#3949ab',
  '#8e24aa',
]
const hexColorPattern = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i
const rgbaColorPattern = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([01](?:\.\d+)?|\.\d+)\s*)?\)$/i

interface RGBA { r: number, g: number, b: number, a: number }
interface HSVA { h: number, s: number, v: number, a: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeHex(value: string) {
  const trimmed = value.trim()
  if (!hexColorPattern.test(trimmed)) {
    return undefined
  }

  if (trimmed.length === 4) {
    const [, r, g, b] = trimmed
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
  }

  return trimmed.toUpperCase()
}

function hexToRgba(value: string): RGBA | undefined {
  const normalized = normalizeHex(value)
  if (!normalized) {
    return undefined
  }

  const r = Number.parseInt(normalized.slice(1, 3), 16)
  const g = Number.parseInt(normalized.slice(3, 5), 16)
  const b = Number.parseInt(normalized.slice(5, 7), 16)
  return { r, g, b, a: 1 }
}

function parseRgba(value: string): RGBA | undefined {
  const match = value.trim().match(rgbaColorPattern)
  if (!match) {
    return undefined
  }

  const r = clamp(Number(match[1]), 0, 255)
  const g = clamp(Number(match[2]), 0, 255)
  const b = clamp(Number(match[3]), 0, 255)
  const a = match[4] === undefined ? 1 : clamp(Number(match[4]), 0, 1)
  return { r, g, b, a }
}

function parseColor(value: string | undefined): RGBA {
  if (!value) {
    return { r: 255, g: 255, b: 255, a: 1 }
  }

  return parseRgba(value) ?? hexToRgba(value) ?? { r: 255, g: 255, b: 255, a: 1 }
}

function rgbaToHex({ r, g, b }: RGBA) {
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`.toUpperCase()
}

function rgbaToHsva({ r, g, b, a }: RGBA): HSVA {
  const rr = r / 255
  const gg = g / 255
  const bb = b / 255

  const max = Math.max(rr, gg, bb)
  const min = Math.min(rr, gg, bb)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rr) {
      h = ((gg - bb) / delta) % 6
    }
    else if (max === gg) {
      h = (bb - rr) / delta + 2
    }
    else {
      h = (rr - gg) / delta + 4
    }
    h *= 60
    if (h < 0) {
      h += 360
    }
  }

  const s = max === 0 ? 0 : delta / max
  const v = max
  return { h, s, v, a }
}

function hsvaToRgba({ h, s, v, a }: HSVA): RGBA {
  const hh = ((h % 360) + 360) % 360
  const c = v * s
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1))
  const m = v - c

  let rr = 0
  let gg = 0
  let bb = 0

  if (hh < 60) {
    rr = c
    gg = x
    bb = 0
  }
  else if (hh < 120) {
    rr = x
    gg = c
    bb = 0
  }
  else if (hh < 180) {
    rr = 0
    gg = c
    bb = x
  }
  else if (hh < 240) {
    rr = 0
    gg = x
    bb = c
  }
  else if (hh < 300) {
    rr = x
    gg = 0
    bb = c
  }
  else {
    rr = c
    gg = 0
    bb = x
  }

  return {
    r: Math.round((rr + m) * 255),
    g: Math.round((gg + m) * 255),
    b: Math.round((bb + m) * 255),
    a,
  }
}

function formatColor(value: RGBA) {
  if (value.a >= 1) {
    return rgbaToHex(value)
  }

  const a = Number(value.a.toFixed(2))
  return `rgba(${value.r}, ${value.g}, ${value.b}, ${a})`
}

export interface WidgetColorFieldProps {
  title?: string
  value?: string
  predefine?: string[]
  disabled?: boolean
  onChange?: (value: string) => void
}

export function WidgetColorField({
  title = '',
  value = '#FFFFFF',
  predefine,
  disabled = false,
  onChange,
}: WidgetColorFieldProps) {
  const id = useId()
  const colors = predefine ?? defaultPredefineColors
  const [open, setOpen] = useState(false)
  const [hsva, setHsva] = useState<HSVA>(() => rgbaToHsva(parseColor(value)))
  const [textValue, setTextValue] = useState(() => formatColor(parseColor(value)))

  useEffect(() => {
    if (!open) {
      const rgba = parseColor(value)
      setHsva(rgbaToHsva(rgba))
      setTextValue(formatColor(rgba))
    }
  }, [open, value])

  const rgba = useMemo(() => hsvaToRgba(hsva), [hsva])
  const opaqueRgba = useMemo(() => ({ ...rgba, a: 1 }), [rgba])
  const opaqueColor = useMemo(() => formatColor(opaqueRgba), [opaqueRgba])
  const draftValue = useMemo(() => formatColor(rgba), [rgba])

  function commit(next: string) {
    onChange?.(next)
  }

  function updateDraft(nextHsva: HSVA) {
    setHsva(nextHsva)
    setTextValue(formatColor(hsvaToRgba(nextHsva)))
  }

  function commitFromText(nextText: string) {
    const parsed = parseRgba(nextText) ?? hexToRgba(nextText)
    if (!parsed) {
      setTextValue(draftValue)
      return
    }

    updateDraft(rgbaToHsva(parsed))
  }

  return (
    <FieldGroup>
      <Field
        orientation="responsive"
        data-disabled={disabled ? true : undefined}
      >
        {title !== undefined && (
          <FieldLabel htmlFor={id} className="shrink-0 whitespace-nowrap md:justify-start">
            {title}
          </FieldLabel>
        )}
        <FieldContent className="min-w-0 flex-1 flex-row items-center justify-end gap-3">
          <Popover
            open={open}
            onOpenChange={(nextOpen) => {
              if (disabled) {
                return
              }

              setOpen(nextOpen)

              if (nextOpen) {
                const nextRgba = parseColor(value)
                setHsva(rgbaToHsva(nextRgba))
                setTextValue(formatColor(nextRgba))
              }
            }}
          >
            <PopoverTrigger asChild>
              <div className="flex w-full max-w-sm items-center justify-end gap-2">
                <div
                  className="relative shrink-0 overflow-hidden rounded-full border border-border shadow-sm"
                  style={{ width: 32, height: 32 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: '#ffffff',
                      backgroundImage: `
                      linear-gradient(45deg, #d4d4d8 25%, transparent 25%, transparent 75%, #d4d4d8 75%, #d4d4d8 100%),
                      linear-gradient(45deg, #d4d4d8 25%, transparent 25%, transparent 75%, #d4d4d8 75%, #d4d4d8 100%)
                    `,
                      backgroundPosition: '0 0, 6px 6px',
                      backgroundSize: '12px 12px',
                    }}
                  />
                  <div
                    className="absolute inset-0 cursor-pointer"
                    style={{ backgroundColor: value }}
                  />
                </div>

                <Input
                  id={id}
                  className="w-48"
                  value={value}
                  disabled={disabled}
                  onChange={event => onChange?.(event.target.value)}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={8}
              className="overflow-hidden p-0"
              style={{ width: 380, maxWidth: 'calc(100vw - 2rem)' }}
            >
              <WidgetColorPickerPanel
                hsva={hsva}
                rgba={rgba}
                opaqueColor={opaqueColor}
                draftValue={draftValue}
                textValue={textValue}
                value={value}
                colors={colors}
                setTextValue={setTextValue}
                commitFromText={commitFromText}
                normalizeHex={normalizeHex}
                onSatValueChange={(s, v) => updateDraft({ ...hsva, s, v })}
                onHueChange={h => updateDraft({ ...hsva, h })}
                onAlphaChange={a => updateDraft({ ...hsva, a })}
                onPresetSelect={(normalized) => {
                  const next = parseColor(normalized)
                  updateDraft(rgbaToHsva(next))
                }}
              />

              <div className="flex items-center justify-end gap-2 border-t border-border/60 bg-muted/20 px-3 py-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-8 px-3"
                  onClick={() => {
                    commit('')
                    setOpen(false)
                  }}
                >
                  Clear
                </Button>
                <Button
                  type="button"
                  className="h-8 px-4"
                  onClick={() => {
                    commit(draftValue)
                    setOpen(false)
                  }}
                >
                  OK
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
