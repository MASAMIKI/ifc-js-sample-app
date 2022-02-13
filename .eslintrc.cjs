module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'tsconfigRootDir': __dirname,
    'project': ['./tsconfig.json'],
    'extraFileExtensions': ['.svelte']
  },
  'plugins': [
    'svelte3',
    '@typescript-eslint',
  ],
  'overrides': [
    {
      'files': ['*.svelte'],
      'processor': 'svelte3/svelte3'
    }
  ],
  'settings': {
    'svelte3/typescript': require('typescript'),
    'svelte3/ignore-styles': () => true
  },
  'ignorePatterns': ['node_modules'],
  'rules': {
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn'
  },
};
