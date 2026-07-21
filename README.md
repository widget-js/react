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

## Styles

Import the built-in CSS once in your app entry (e.g. `main.tsx`):

```ts
import '@widget-js/react/style.css'
```

## Features

- **Window Management**: Control window size, position, and animations easily.
- **System Integration**: Interact with system tray, notifications, and shortcuts.
- **Widget Lifecycle**: Access widget instances, parameters, and storage.
- **Event Handling**: Simplified hooks for keyboard, mouse, and IPC events.
- **UI Components**: Ready-to-use components like `WindowControls`.

## Tech Stack

- Tailwind CSS
- shadcn/ui

## Storybook

Preview: https://widget-js.github.io/react/

## AI Skills

### Install These Skills

```shell
npx skills@latest add widget-js/react
```

### Included Skills

- `widget-react-components`: Helps AI choose and reuse existing components in `src/components`.
- `widget-react-hooks`: Helps AI choose and combine existing hooks in `src/hooks`.

### Repository Layout

```text
skills/
  widget-react-components/
    SKILL.md
  widget-react-hooks/
    SKILL.md
```

### Notes

- Each skill must stay in its own folder and must contain a `SKILL.md` file.
- Keep the skill name and directory name stable so the `skills` CLI can discover them correctly.

## License

MIT
