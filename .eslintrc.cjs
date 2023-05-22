module.exports = {
  env: { browser: true, es2020: true },
  ignorePatterns: ["./src/vite.config.ts"],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint", "import"],
  parserOptions: {
    parser: {
      js: '@typescript-eslint/parser',
      ts: '@typescript-eslint/parser',
    },
    project: ['./tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'import/no-extraneous-dependencies': "off",
    "import/prefer-default-export": "off",
    'import/extensions': 'off',
  }
}
