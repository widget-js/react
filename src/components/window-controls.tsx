import { BrowserWindowApi } from '@widget-js/core'
import { Minus, Square, X } from 'lucide-react'
import './window-controls.css'

export interface WindowControlsProps {
  minimize?: boolean
  maximize?: boolean
  close?: boolean
}

export function WindowControls({ minimize = true, maximize = true, close = true }: WindowControlsProps) {
  async function toggleMaximize() {
    if (await BrowserWindowApi.isMaximized()) {
      BrowserWindowApi.unmaximize()
    }
    else {
      BrowserWindowApi.maximize()
    }
  }
  return (
    <div className="window-controls">
      {minimize && (
        <button
          onClick={() => BrowserWindowApi.minimize()}
          className="minimize"
          title="Minimize"
        >
          <Minus />
        </button>
      )}
      {maximize && (
        <button
          onClick={toggleMaximize}
          className="maximize"
          title="Maximize"
        >
          <Square />
        </button>
      )}
      {close && (
        <button
          onClick={() => BrowserWindowApi.close()}
          className="close"
          title="Close"
        >
          <X />
        </button>
      )}
    </div>
  )
}
