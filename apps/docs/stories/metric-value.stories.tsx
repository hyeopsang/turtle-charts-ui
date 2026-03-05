import type { Meta, StoryObj } from "@storybook/react";
import { MetricValue } from "@turtle/ui";

const meta: Meta<typeof MetricValue> = {
  title: "Data Display/MetricValue",
  component: MetricValue,
  args: { value: 1234567 },
};

export default meta;

type Story = StoryObj<typeof MetricValue>;

export const Default: Story = {};

export const Currency: Story = {
  args: { format: "currency", currency: "KRW", value: 12000 },
};

export const PercentRatio: Story = {
  args: { format: "percent", value: 0.123 },
};

export const PercentPoint: Story = {
  args: { format: "percent", percent: "point", value: 12.3 },
};

export const Empty: Story = {
  args: { value: null },
};
