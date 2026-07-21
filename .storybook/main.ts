import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { mergeConfig } from 'vite'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(dirname, '..')
const storybookBasePath = process.env.STORYBOOK_BASE_PATH?.trim()

function normalizeBasePath(basePath?: string) {
  if (!basePath) { return undefined }

  return basePath.endsWith('/') ? basePath : `${basePath}/`
}

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) => {
    const merged = mergeConfig(viteConfig, {
      base: normalizeBasePath(storybookBasePath),
      resolve: {
        alias: {
          '@': path.resolve(projectRoot, './src'),
        },
      },
    })

    merged.plugins = [tailwindcss(), ...(merged.plugins ?? [])]
    // Storybook should not run library declaration generation from the root Vite config.
    merged.plugins = merged.plugins.filter(plugin => plugin?.name !== 'vite:dts')
    return merged
  },
}
export default config
