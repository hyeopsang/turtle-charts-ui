/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ["../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(viteConfig) {
    return {
      ...viteConfig,
      define: { ...(viteConfig.define || {}), "process.env": {} },
      resolve: {
        ...(viteConfig.resolve || {}),
      },
    };
  },
};

export default config;
