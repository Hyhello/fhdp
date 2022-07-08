module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "plugin:vue/essential", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    indent: "off",
    "space-before-function-paren": 0,
    "vue/multi-word-component-names": 0,
    camelcase: 0,
    "vue/return-in-computed-property": 0,
    semi: ["error", "always"],
  },
  globals: {
    Highcharts: "readonly",
  },
};
