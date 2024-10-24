import vitest from '@vitest/eslint-plugin'
import config from 'eslint-config-love'

export default [
  {
    ...config,
    files: ['**/*.ts'],
    ignores: ['**/vite-env.d.ts']
  },
  {
    files: ['**/*.test.ts'],
    languageOptions: { globals: vitest.environments.env.globals },
    plugins: { vitest },
    rules: vitest.configs.all.rules,
    settings: { vitest: { typecheck: true } }
  }
]
