import type { Meta, StoryObj } from "@storybook/react";
import { DeltaBadge } from "@turtle/ui";

const meta: Meta = {
  title: "Data Display/DeltaBadge",
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj;

export const Positive: Story = {
  render: () => (
    <DeltaBadge
      format="percent"
      locale="en-US"
      percent="ratio"
      prefix="vs 이전"
      sign="always"
      value={0.123}
    />
  ),
};

export const Negative: Story = {
  render: () => (
    <DeltaBadge
      format="percent"
      locale="en-US"
      percent="ratio"
      sign="always"
      value={-0.071}
    />
  ),
};

export const Neutral: Story = {
  render: () => (
    <DeltaBadge
      format="percent"
      locale="en-US"
      percent="ratio"
      sign="auto"
      tone="neutral"
      value={0}
    />
  ),
};

export const Currency: Story = {
  render: () => (
    <DeltaBadge
      currency="KRW"
      format="currency"
      locale="ko-KR"
      prefix="Δ"
      sign="always"
      value={12000}
    />
  ),
};
