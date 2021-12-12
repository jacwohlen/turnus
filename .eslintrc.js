module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: [],
  // add your custom rules here
  rules: {
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'vue/no-unused-vars': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-control-regex': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'no-undef': 0,
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
  },
};
