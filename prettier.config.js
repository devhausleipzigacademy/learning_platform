/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  useTabs: false,
  arrowParens: "avoid",
  bracketSpacing: true,
  importOrder: ["^@assets/(.*)$", "<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
};

export default config;
