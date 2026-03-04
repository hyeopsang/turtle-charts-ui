/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/storybook.js"],
  overrides: [
    {
      files: ["**/*.stories.{ts,tsx}", "**/.storybook/**"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
