module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/strongly-recommended',
    'prettier',
    'prettier/vue',
  ],
  rules: {
    "space-before-function-paren": ["error", "never"],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false, "endOfLine":"auto"} ],
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: [
    'prettier',
    'vue'
  ],
}
