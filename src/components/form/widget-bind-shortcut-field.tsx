import { useEffect, useId, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { WidgetFormField } from './widget-form-field'

function displayShortcut(value: string) {
  return value.replaceAll('Meta', 'Win')
}

function normalizeKey(key: string) {
  if (key === ' ') {
    return 'Space'
  }

  return key.length === 1 ? key.toUpperCase() : key
}

export interface WidgetBindShortcutFieldProps {
  title?: string
  value?: string
  placeholder?: string
  clearable?: boolean
  onChange?: (value: string) => void
}

export function WidgetBindShortcutField({
  title,
  value = '',
  placeholder = '点击设置快捷键',
  clearable = true,
  onChange,
}: WidgetBindShortcutFieldProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [draftValue, setDraftValue] = useState(value)
  const shownDraftValue = useMemo(() => displayShortcut(draftValue), [draftValue])

  useEffect(() => {
    if (!open) {
      setDraftValue(value)
    }
  }, [open, value])

  useEffect(() => {
    if (!open) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Unidentified') {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        onChange?.('')
        setDraftValue('')
        setOpen(false)
        return
      }

      const notModifierKey = !['Alt', 'Shift', 'Control', 'Meta'].includes(event.key)
      const withModifierKey = event.ctrlKey || event.altKey || event.shiftKey || event.metaKey
      if (!notModifierKey || !withModifierKey) {
        return
      }

      event.preventDefault()
      const segments: string[] = []
      if (event.ctrlKey) {
        segments.push('Ctrl')
      }
      if (event.altKey) {
        segments.push('Alt')
      }
      if (event.shiftKey) {
        segments.push('Shift')
      }
      if (event.metaKey) {
        segments.push('Meta')
      }
      segments.push(normalizeKey(event.key))
      setDraftValue(segments.join('+'))
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [open, onChange])

  return (
    <>
      <WidgetFormField title={title} htmlFor={id}>
        <Input
          id={id}
          readOnly
          value={displayShortcut(value)}
          placeholder={placeholder}
          onClick={() => setOpen(true)}
        />
      </WidgetFormField>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>请按下快捷键</DialogTitle>
            <DialogDescription>
              如果没有反应，快捷键可能已被注册
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-10 text-center">
            <div className="text-2xl font-semibold">
              {shownDraftValue || placeholder}
            </div>
          </div>

          <DialogFooter>
            {clearable && (
              <Button
                variant="outline"
                onClick={() => {
                  onChange?.('')
                  setDraftValue('')
                  setOpen(false)
                }}
              >
                清除
              </Button>
            )}
            <Button
              onClick={() => {
                onChange?.(draftValue)
                setOpen(false)
              }}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
