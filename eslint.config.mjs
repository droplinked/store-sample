import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import security from 'eslint-plugin-security';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Security plugin configuration (MED-4)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      security: security,
    },
    rules: {
      ...security.configs.recommended.rules,
      // Disable false positives for Next.js patterns
      'security/detect-object-injection': 'off',
    },
  },
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '**/*.config.*',
    'vitest.setup.ts',
    'coverage/**',
  ]),
]);

export default eslintConfig;
