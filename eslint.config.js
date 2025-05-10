import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      quotes: ['error', 'single'],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
  },
];
