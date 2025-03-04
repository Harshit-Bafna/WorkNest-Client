import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'build'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // Base JS rules
      ...js.configs.recommended.rules,
      
      // React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // Accessibility rules
      ...jsxA11y.configs.recommended.rules,

      // Custom rules
      'react/jsx-no-target-blank': 'error', // Prevent security risks with target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off', // Disable PropTypes if using TypeScript
      'react/jsx-uses-react': 'off', // For React 17+ with JSX transform
      'react/react-in-jsx-scope': 'off', // For React 17+ with JSX transform

      // General JavaScript rules
      'no-console': 'error', // No console log allowed
      'no-debugger': 'error', // Disallow debugger in production
      'no-unused-vars': 'error', // No unused variables allowed
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }], // Consistent quote usage
      'prefer-const': 'error', // Prefer const where possible
      'eqeqeq': ['error', 'always'], // Enforce strict equality
      'no-var': 'error', // Disallow var, prefer let/const

      // React-specific rules
      'react/jsx-key': 'error', // Enforce keys in list rendering
      'react/jsx-no-duplicate-props': 'error', // No duplicate props in JSX
      'react/jsx-no-useless-fragment': 'warn', // Avoid unnecessary fragments
      'react/no-array-index-key': 'warn', // Avoid using array index as key
      'react/jsx-pascal-case': 'error', // Enforce PascalCase for component names

      // Hooks rules
      'react-hooks/rules-of-hooks': 'error', // Enforce Hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Check effect dependencies

      // Accessibility rules
      'jsx-a11y/alt-text': 'error', // Require alt text for images
      'jsx-a11y/no-autofocus': 'warn', // Avoid autofocus for accessibility
    },
  },
)
