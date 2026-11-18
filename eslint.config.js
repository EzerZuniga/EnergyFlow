import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const deepRelative = {
  regex: String.raw`^\.\./\.\./`,
  message: 'Usa el alias "@/" para importar entre módulos.',
};

const APP = String.raw`app(?!/(paths|navigation)$)`;

const forbidAlias = (dirs, message) => ({
  regex: String.raw`^@/(${dirs.join('|')})(/|$)`,
  message,
});

const restrict = (...patterns) => ({
  'no-restricted-imports': ['error', { patterns: [deepRelative, ...patterns] }],
});

const reactLibs = {
  regex: String.raw`^(react|react-dom|react-router|zustand|recharts|lucide-react)(/|$)`,
  message: 'Esta capa debe ser independiente de React y de la interfaz.',
};

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'node_modules']),

  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      ...restrict(),
    },
  },

  {
    files: ['src/engine/**/*.ts'],
    rules: restrict(reactLibs, {
      regex: String.raw`^@/(?!(engine|types)(/|$))`,
      message: 'engine/ solo puede importar de engine/ y types/.',
    }),
  },
  {
    files: ['src/content/**/*.ts'],
    rules: restrict(reactLibs, {
      regex: String.raw`^@/(?!types(/|$))`,
      message: 'content/ es solo datos editables: únicamente puede importar tipos de types/.',
    }),
  },
  {
    files: ['src/services/**/*.ts'],
    rules: restrict(
      reactLibs,
      forbidAlias(
        [APP, 'pages', 'layouts', 'features', 'components', 'stores', 'hooks'],
        'services/ no puede depender de la interfaz ni de los stores.',
      ),
    ),
  },
  {
    files: ['src/stores/**/*.ts'],
    rules: restrict(
      forbidAlias(
        [APP, 'pages', 'layouts', 'features', 'components'],
        'stores/ no puede depender de la interfaz.',
      ),
    ),
  },
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: restrict(
      forbidAlias(
        [APP, 'pages', 'layouts', 'features', 'stores', 'services'],
        'components/ debe ser genérico: sin estado de dominio ni features.',
      ),
    ),
  },
  {
    files: ['src/layouts/**/*.{ts,tsx}'],
    rules: restrict(
      forbidAlias([APP, 'pages', 'features', 'services'], 'layouts/ solo estructura la página.'),
    ),
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: restrict(
      forbidAlias(
        [APP, 'pages', 'layouts', 'services'],
        'features/ accede a los datos a través de stores/.',
      ),
      {
        regex: String.raw`^@/features/[^/]+/.+`,
        message: 'Importa otra feature solo por su API pública: "@/features/<nombre>".',
      },
    ),
  },
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: restrict(
      forbidAlias([APP, 'services'], 'pages/ compone features; no accede a servicios.'),
    ),
  },

  {
    files: ['src/**/*.test.{ts,tsx}', 'src/tests/**'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  prettier,
]);
