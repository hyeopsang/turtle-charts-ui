import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricValue } from "./metric-value";

describe("MetricValue", () => {
  it("null이면 placeholder가 렌더링됨.", () => {
    render(<MetricValue value={null} sign="auto" />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("기본 number 포맷이 적용됨.", () => {
    render(<MetricValue value={1234567} sign="auto" locale="ko-KR" />);
    expect(screen.getByText("1,234,567")).toBeInTheDocument();
  });

  it("currency + KRW 설정 시 통화 포맷이 적용됨.", () => {
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

  it("currency 설정이 없으면 number로 fallback 됨.", () => {
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

  it("percent 포맷이 적용됨.", () => {
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

  it("percent(point) 포맷이 적용됨(12.3 → 12.3%).", () => {
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

  it("compact + titleFormat=auto면 title에 full 값이 들어감.", () => {
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

  it("signDisplay=always면 양수에도 +가 붙음.", () => {
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

  it("value 속성에 정규화된 값이 들어감.", () => {
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
