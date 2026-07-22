import type { ReactNode } from 'react'
import { WindowTitleBar } from './window-title-bar'

export interface WindowProps {
  title: ReactNode
  children: ReactNode
  footer?: ReactNode
}

export function Window({ title, children, footer }: WindowProps) {
  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      <section className="mx-auto flex h-full w-full flex-col">
        <WindowTitleBar title={title} className="shrink-0" />

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
            {children}
          </div>

          {footer
            ? (
                <div className="border border-border/60 bg-background/80 bg-muted/60 px-4 py-3 shadow-sm backdrop-blur">
                  {footer}
                </div>
              )
            : null}
        </div>
      </section>
    </main>
  )
}
