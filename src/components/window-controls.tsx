import { BrowserWindowApi } from '@widget-js/core'
import { Minus, Square, X } from 'lucide-react'
import styled, { css } from 'styled-components'

const Root = styled.div<{ $floating: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ $floating }) =>
    $floating
      ? css`
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 50;
        `
      : ''}
`

const iconSize = {
  minimize: 12,
  maximize: 10,
  close: 12,
} as const

const ControlButton = styled.button<{ $variant: keyof typeof iconSize }>`
  appearance: none;
  app-region: no-drag;
  -webkit-appearance: none;
  -webkit-app-region: no-drag;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  border: none;
  outline: none;
  color: white;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  line-height: 1;

  ${({ $variant }) => {
    switch ($variant) {
      case 'minimize':
        return css`
          background-color: #eab308;

          &:hover {
            background-color: #ca8a04;
            box-shadow: 0 0 8px rgba(234, 179, 8, 0.6);
          }
        `
      case 'maximize':
        return css`
          background-color: #22c55e;

          &:hover {
            background-color: #16a34a;
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
          }
        `
      case 'close':
        return css`
          background-color: #ed4f4a;

          &:hover {
            background-color: #dc2626;
            box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
          }
        `
    }
  }}

  & svg {
    width: ${({ $variant }) => `${iconSize[$variant]}px`};
    height: ${({ $variant }) => `${iconSize[$variant]}px`};
    stroke-width: 2;
  }
`

export interface WindowControlsProps {
  minimize?: boolean
  maximize?: boolean
  close?: boolean
  floating?: boolean
}

export function WindowControls({
  minimize = true,
  maximize = true,
  close = true,
  floating = true,
}: WindowControlsProps) {
  async function toggleMaximize() {
    if (await BrowserWindowApi.isMaximized()) {
      BrowserWindowApi.unmaximize()
    }
    else {
      BrowserWindowApi.maximize()
    }
  }
  return (
    <Root $floating={floating}>
      {minimize && (
        <ControlButton
          onClick={() => BrowserWindowApi.minimize()}
          $variant="minimize"
          title="Minimize"
        >
          <Minus />
        </ControlButton>
      )}
      {maximize && (
        <ControlButton
          onClick={toggleMaximize}
          $variant="maximize"
          title="Maximize"
        >
          <Square />
        </ControlButton>
      )}
      {close && (
        <ControlButton
          onClick={() => BrowserWindowApi.close()}
          $variant="close"
          title="Close"
        >
          <X />
        </ControlButton>
      )}
    </Root>
  )
}
