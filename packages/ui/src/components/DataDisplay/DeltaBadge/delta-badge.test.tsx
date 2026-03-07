import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeltaBadge } from "./delta-badge";

describe("DeltaBadge", () => {
  it("value가 null이면 렌더링되지 않음.", () => {
    const { container } = render(<DeltaBadge value={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("양수면 + 부호가 포함되어 렌더링됨(sign=always).", () => {
    render(
      <DeltaBadge
        value={0.123}
        format="percent"
        percent="ratio"
        locale="en-US"
        sign="always"
      />,
    );
    expect(screen.getByText("+12.3%")).toBeInTheDocument();
  });

  it("음수면 - 부호가 포함되어 렌더링됨.", () => {
    render(
      <DeltaBadge
        value={-0.05}
        format="percent"
        percent="ratio"
        locale="en-US"
        sign="always"
      />,
    );
    expect(screen.getByText("-5%")).toBeInTheDocument();
  });

  it("prefix가 있으면 함께 렌더링됨.", () => {
    render(
      <DeltaBadge
        value={0.1}
        format="percent"
        percent="ratio"
        locale="en-US"
        sign="always"
        prefix="vs 이전"
      />,
    );
    expect(screen.getByText("vs 이전")).toBeInTheDocument();
    expect(screen.getByText("+10%")).toBeInTheDocument();
  });

  it("tone=neutral이면 중립 스타일로 렌더링됨.", () => {
    const { container } = render(
      <DeltaBadge
        value={0.1}
        format="percent"
        percent="ratio"
        locale="en-US"
        sign="always"
        tone="neutral"
      />,
    );

    expect(container.querySelector(".border-gray-200")).not.toBeNull();
  });
});
