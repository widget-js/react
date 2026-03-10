# @widget-js/react

React hooks and components for building widgets in the widget-js ecosystem. This library provides a comprehensive set of tools to interact with the widget system, manage window states, and handle system events.

## Installation

```bash
npm install @widget-js/react @widget-js/core
# or
yarn add @widget-js/react @widget-js/core
# or
pnpm add @widget-js/react @widget-js/core
```

## Features

- **Window Management**: Control window size, position, and animations easily.
- **System Integration**: Interact with system tray, notifications, and shortcuts.
- **Widget Lifecycle**: Access widget instances, parameters, and storage.
- **Event Handling**: Simplified hooks for keyboard, mouse, and IPC events.
- **UI Components**: Ready-to-use components like `WindowControls`.

## Usage

### Components

#### WindowControls

A pre-built component for window control buttons (close, minimize, etc.).

```tsx
import { WindowControls } from '@widget-js/react'
import '@widget-js/react/style.css' // Import styles

function App() {
  return (
    <div className="relative">
      <WindowControls />
      <div className="p-4">
        <h1>My Widget</h1>
      </div>
    </div>
  )
}
```

### Hooks

#### useWidget

Access the current widget instance to perform core operations.

```tsx
import { useWidget } from '@widget-js/react'

function MyComponent() {
  const widget = useWidget()

  const refreshWidget = () => {
    widget?.reload()
  }

  return <button onClick={refreshWidget}>Reload</button>
}
```

#### useWindowAnimation

Animate the widget window position with spring physics or easing functions.

```tsx
import { useWindowAnimationY } from '@widget-js/react'

function AnimatedComponent() {
  const { animate, isPlaying } = useWindowAnimationY({
    spring: { stiffness: 100, damping: 20 },
    onComplete: () => console.log('Animation complete'),
  })

  return (
    <button onClick={() => animate(200)} disabled={isPlaying}>
      Move to Y=200
    </button>
  )
}
```

#### useIpcListener

Listen for Inter-Process Communication (IPC) messages from the main process.

```tsx
import { useIpcListener } from '@widget-js/react'

function ListenerComponent() {
  useIpcListener('custom-event', (event, data) => {
    console.log('Received data:', data)
  })

  return <div>Listening for events...</div>
}
```

#### useWidgetStorage

Persist data easily using the widget's storage system.

```tsx
import { useWidgetStorage } from '@widget-js/react'

function StorageComponent() {
  const [value, setValue] = useWidgetStorage('my-key', 'default-value')

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}
```

## API Reference

### Hooks

| Hook | Description |
|------|-------------|
| `useWidget` | Get the current widget instance. |
| `useWidgetParams` | Access widget URL parameters. |
| `useWidgetStorage` | Persist state in widget storage. |
| `useWindowSize` | Get or set window size. |
| `useWindowAnimation` | Animate window position (X or Y). |
| `useAutoHideOnEdge` | Automatically hide window when moving to screen edge. |
| `useTray` | Manage system tray icon and menu. |
| `useNotification` | Send system notifications. |
| `useIpcListener` | Listen for IPC messages. |
| `useShortcutListener` | Listen for global shortcuts. |
| `useKeyboardEvent` | Listen for keyboard events. |
| `useMouseEvent` | Listen for mouse events. |

### Components

- **WindowControls**: Standard window control buttons.
- **Button**: Styled button component.

## License

MIT
