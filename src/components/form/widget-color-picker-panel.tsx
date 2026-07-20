import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface WidgetColorPickerPanelProps {
  hsva: { h: number, s: number, v: number, a: number }
  rgba: { r: number, g: number, b: number, a: number }
  opaqueColor: string
  draftValue: string
  textValue: string
  value: string
  colors: string[]
  setTextValue: (value: string) => void
  commitFromText: (value: string) => void
  normalizeHex: (value: string) => string | undefined
  onSatValueChange: (s: number, v: number) => void
  onHueChange: (h: number) => void
  onAlphaChange: (a: number) => void
  onPresetSelect: (color: string) => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function eventPoint(event: { clientX: number, clientY: number }, rect: DOMRect) {
  return {
    x: clamp(event.clientX - rect.left, 0, rect.width),
    y: clamp(event.clientY - rect.top, 0, rect.height),
  }
}

export function WidgetColorPickerPanel({
  hsva,
  rgba,
  opaqueColor,
  draftValue,
  textValue,
  value,
  colors,
  setTextValue,
  commitFromText,
  normalizeHex,
  onSatValueChange,
  onHueChange,
  onAlphaChange,
  onPresetSelect,
}: WidgetColorPickerPanelProps) {
  const satRef = useRef<HTMLDivElement | null>(null)
  const hueRef = useRef<HTMLDivElement | null>(null)
  const alphaRef = useRef<HTMLDivElement | null>(null)
  const handleSize = 12
  const previewSize = 36
  const presetSize = 28
  const sliderThickness = 14

  function handleSatPointer(event: any) {
    const rect = satRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const { x, y } = eventPoint(event, rect)
    const s = rect.width === 0 ? 0 : x / rect.width
    const v = rect.height === 0 ? 0 : 1 - y / rect.height
    onSatValueChange(clamp(s, 0, 1), clamp(v, 0, 1))
  }

  function handleHuePointer(event: any) {
    const rect = hueRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const { y } = eventPoint(event, rect)
    const h = rect.height === 0 ? 0 : (1 - y / rect.height) * 360
    onHueChange(clamp(h, 0, 360))
  }

  function handleAlphaPointer(event: any) {
    const rect = alphaRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    const { x } = eventPoint(event, rect)
    const a = rect.width === 0 ? 1 : x / rect.width
    onAlphaChange(clamp(a, 0, 1))
  }

  return (
    <div className="p-3">
      <div className="grid gap-3" style={{ gridTemplateColumns: `minmax(0, 1fr) ${sliderThickness}px` }}>
        <div
          ref={satRef}
          className="relative overflow-hidden rounded-lg ring-1 ring-border/60"
          style={{ height: 180, backgroundColor: `hsl(${hsva.h} 100% 50%)` }}
          onPointerDown={(event) => {
            event.preventDefault()
            handleSatPointer(event)
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (event.buttons !== 1) {
              return
            }
            handleSatPointer(event)
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 shadow-sm ring-1 ring-black/10"
            style={{
              left: `${hsva.s * 100}%`,
              top: `${(1 - hsva.v) * 100}%`,
              backgroundColor: opaqueColor,
              width: handleSize,
              height: handleSize,
            }}
          />
        </div>

        <div
          ref={hueRef}
          className="relative cursor-pointer rounded-full ring-1 ring-border/60"
          style={{
            height: 180,
            width: sliderThickness,
            background: 'linear-gradient(to top, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
          }}
          onPointerDown={(event) => {
            event.preventDefault()
            handleHuePointer(event)
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (event.buttons !== 1) {
              return
            }
            handleHuePointer(event)
          }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-background shadow-sm ring-1 ring-foreground/20"
            style={{
              top: `${(1 - hsva.h / 360) * 100}%`,
              backgroundColor: `hsl(${hsva.h} 100% 50%)`,
              width: handleSize,
              height: handleSize,
            }}
          />
        </div>
      </div>

      <div className="pr-4">
        <div className="space-y-1 mt-4">
          <div
            ref={alphaRef}
            className="relative cursor-pointer overflow-hidden rounded-full ring-1 ring-border/60"
            style={{
              height: sliderThickness,
              backgroundColor: '#ffffff',
              backgroundImage: `
                linear-gradient(45deg, #d4d4d8 25%, transparent 25%, transparent 75%, #d4d4d8 75%, #d4d4d8 100%),
                linear-gradient(45deg, #d4d4d8 25%, transparent 25%, transparent 75%, #d4d4d8 75%, #d4d4d8 100%)
              `,
              backgroundPosition: '0 0, 6px 6px',
              backgroundSize: '12px 12px',
            }}
            onPointerDown={(event) => {
              event.preventDefault()
              handleAlphaPointer(event)
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              if (event.buttons !== 1) {
                return
              }
              handleAlphaPointer(event)
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0), rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1))` }}
            />
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-background shadow-sm ring-1 ring-foreground/20"
              style={{
                left: `${hsva.a * 100}%`,
                backgroundColor: draftValue,
                width: handleSize,
                height: handleSize,
              }}
            />
          </div>
        </div>
      </div>
      {colors.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((color) => {
            const normalized = normalizeHex(color) ?? color
            const isSelected = normalized === value

            return (
              <button
                key={normalized}
                type="button"
                aria-label={`选择颜色 ${normalized}`}
                className={cn(
                  'rounded-md border border-border shadow-sm transition-transform hover:scale-105 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/40',
                  isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
                )}
                style={{ width: presetSize, height: presetSize, backgroundColor: normalized }}
                onClick={() => onPresetSelect(normalized)}
              />
            )
          })}
        </div>
      )}
      <div className="mt-3 grid w-full items-center gap-3" style={{ gridTemplateColumns: `${previewSize}px minmax(0, 1fr)` }}>
        <div
          className="shrink-0 overflow-hidden rounded-md border border-border shadow-sm"
          style={{
            width: previewSize,
            height: previewSize,
            backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
          }}
        >
          <div
            className="h-full w-full"
            style={{ backgroundColor: draftValue }}
          />
        </div>

        <Input
          className="h-9 font-mono text-xs w-full"
          value={textValue}
          onChange={event => setTextValue(event.target.value)}
          onBlur={() => commitFromText(textValue)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') {
              return
            }
            event.preventDefault()
            commitFromText(textValue)
          }}
        />
      </div>

    </div>
  )
}
