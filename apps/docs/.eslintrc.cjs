/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/storybook.js"],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
  },
  overrides: [
    {
      files: ["**/*.stories.{ts,tsx}", "**/.storybook/**"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
