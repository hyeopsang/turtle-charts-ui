import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KpiCard } from "./kpi-card";

describe("KpiCard", () => {
  it("ready 상태에서 label/value가 렌더링됨.", () => {
    render(<KpiCard label="매출" value={1234567} locale="en-US" sign="auto" />);
    expect(screen.getByText("매출")).toBeInTheDocument();
    expect(screen.getByText("1,234,567")).toBeInTheDocument();
  });

  it("subLabel이 있으면 렌더링됨.", () => {
    render(
      <KpiCard
        label="매출"
        subLabel="최근 7일"
        value={1000}
        locale="en-US"
        sign="auto"
      />,
    );
    expect(screen.getByText("최근 7일")).toBeInTheDocument();
  });

  it("delta가 있으면 DeltaBadge가 렌더링됨.", () => {
    render(
      <KpiCard
        label="전환율"
        value={0.12}
        format="percent"
        percent="ratio"
        locale="en-US"
        sign="auto"
        delta={{
          value: 0.05,
          format: "percent",
          percent: "ratio",
          locale: "en-US",
          sign: "always",
        }}
      />,
    );

    expect(screen.getByText("+5%")).toBeInTheDocument();
  });

  it("loading 상태면 스켈레톤이 보이고 값 텍스트는 보이지 않음.", () => {
    const { container } = render(
      <KpiCard label="매출" value={123} state="loading" />,
    );
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
    expect(screen.queryByText("123")).not.toBeInTheDocument();
  });

  it("empty 상태면 placeholder가 렌더링됨.", () => {
    render(
      <KpiCard
        label="매출"
        value={1234567}
        state="empty"
        placeholder="—"
        locale="en-US"
        sign="auto"
      />,
    );
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
