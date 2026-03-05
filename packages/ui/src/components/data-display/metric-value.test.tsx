import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricValue } from "./metric-value";

describe("MetricValue", () => {
  it("renders placeholder when value is null", () => {
    render(<MetricValue value={null} sign="auto" />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("formats number (default) in ko-KR with thousands separators", () => {
    render(<MetricValue value={1234567} sign="auto" locale="ko-KR" />);
    const el = screen.getByText("1,234,567");
    expect(el).toBeInTheDocument();
  });

  it("formats currency when format=currency and currency provided", () => {
    render(
      <MetricValue
        value={12000}
        format="currency"
        currency="KRW"
        locale="ko-KR"
        sign="auto"
      />,
    );

    const el = screen.getByText((txt) => txt.replace(/\s/g, "") === "₩12,000");
    expect(el).toBeInTheDocument();
  });

  it("falls back to number formatting when format=currency but currency missing", () => {
    render(
      <MetricValue
        value={12000}
        format="currency"
        locale="ko-KR"
        sign="auto"
      />,
    );
    expect(screen.getByText("12,000")).toBeInTheDocument();
  });

  it("formats percent ratio (value=0.123 -> 12.3%)", () => {
    render(
      <MetricValue
        value={0.123}
        format="percent"
        percent="ratio"
        locale="en-US"
        sign="auto"
      />,
    );

    expect(screen.getByText("12.3%")).toBeInTheDocument();
  });

  it("formats percent point (value=12.3 -> 12.3%)", () => {
    render(
      <MetricValue
        value={12.3}
        format="percent"
        percent="point"
        locale="en-US"
        sign="auto"
      />,
    );

    expect(screen.getByText("12.3%")).toBeInTheDocument();
  });

  it("adds title when compact=true and titleFormat=auto", () => {
    const { container } = render(
      <MetricValue
        value={1234567}
        compact
        titleFormat="auto"
        locale="en-US"
        sign="auto"
      />,
    );

    const dataEl = container.querySelector("data");
    expect(dataEl).not.toBeNull();
    expect(dataEl?.getAttribute("title")).toBe("1,234,567");
  });

  it("signDisplay=always shows plus sign for positive numbers (en-US)", () => {
    render(
      <MetricValue
        value={12000}
        format="number"
        locale="en-US"
        sign="always"
      />,
    );

    expect(screen.getByText("+12,000")).toBeInTheDocument();
  });

  it("sets value attribute with the normalized numeric value", () => {
    render(
      <MetricValue
        value={12.3}
        format="percent"
        percent="point"
        locale="en-US"
        sign="auto"
      />,
    );

    const dataEl = screen.getByText("12.3%").closest("data");
    expect(dataEl).not.toBeNull();

    const v = Number(dataEl?.getAttribute("value"));
    expect(v).toBeCloseTo(0.123, 10);
  });
});
