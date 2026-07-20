import type { ReactNode } from 'react'
import styled from 'styled-components'
import { WindowControls } from './window-controls'

const TitleBarRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in oklch, var(--color-background) 82%, transparent);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  app-region: drag;
`

const Title = styled.div`
  min-width: 0;
  flex: 1;
  font-size: 1.125rem;
  font-weight: 700;
`

export interface WindowTitleBarProps {
  title: ReactNode
  className?: string
  minimize?: boolean
  maximize?: boolean
  close?: boolean
  floating?: boolean
}

export function WindowTitleBar({
  title,
  className,
  minimize = true,
  maximize = true,
  close = true,
  floating = false,
}: WindowTitleBarProps) {
  return (
    <TitleBarRoot className={className}>
      <Title>{title}</Title>
      <WindowControls
        minimize={minimize}
        maximize={maximize}
        close={close}
        floating={floating}
      />
    </TitleBarRoot>
  )
}
