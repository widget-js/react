import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
  jsonc: false,
  yaml: false,
  ignores: [
    '**/fixtures',
    '**/components/ui/**',
  ],
  rules: {
    'curly': ['error', 'multi-line'],
    'no-use-before-define': 'off',
    'node/prefer-global/process': 'off',
    'ts/explicit-function-return-type': 'off',
    'unused-imports/no-unused-vars': ['error', { caughtErrors: 'none', varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
  },
})
