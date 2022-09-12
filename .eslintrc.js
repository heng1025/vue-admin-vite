module.exports = {
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' },
    ],
  },
  overrides: [
    // https://github.com/vuejs/eslint-plugin-vue/issues/1625
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['./scripts/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
