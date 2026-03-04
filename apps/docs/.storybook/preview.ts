import type { Decorator } from "@storybook/react";

export const globalTypes = {
  theme: {
    name: "Theme",
    defaultValue: "light",
    toolbar: { items: ["light", "dark"] },
  },
};

export const decorators: Decorator[] = [
  (Story, ctx) => {
    document.documentElement.classList.toggle(
      "dark",
      ctx.globals.theme === "dark",
    );
    return Story();
  },
];
