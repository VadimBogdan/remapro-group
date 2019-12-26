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

    //'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    //'plugin:vue/recommended',
    //'plugin:prettier/recommended'

    //"@nuxtjs",

    //"plugin:vue/recommended",
    //"eslint:recommended",
    //"prettier/vue"

    //"plugin:prettier/recommended"
  ],
  rules: {
    // "no-var": 0,
    "space-before-function-paren": ["error", "never"],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false, "endOfLine":"auto"} ],
    // "vue/html-self-closing": ["error", {
    //   "html": {
    //     "void": "any",
    //     "normal": "any",
    //     "component": "any"
    //   }
    // }],
    // "vue/max-attributes-per-line": ["error", {
    //   "singleline": 1,
    //   "multiline": {
    //     "max": 1,
    //     "allowFirstLine": false
    //   }
    // }]
    //indent: ["error", 2],
    //semi: ["error", "never"]
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
