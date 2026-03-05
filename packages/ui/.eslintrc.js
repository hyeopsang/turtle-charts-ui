/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/react.js"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "react/jsx-sort-props": "off",
    "no-nested-ternary": "off",
  },
  overrides: [
    {
      files: [
        "**/*.test.{ts,tsx,js,jsx}",
        "**/*.spec.{ts,tsx,js,jsx}",
        "**/src/test/**",
        "**/src/lib/**",
        "**/.storybook/**",
        "**/vitest.config.*",
        "**/vite.config.*",
      ],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
      },
    },
  ],
};
