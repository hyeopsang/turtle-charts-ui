import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ChartCard,
  ChartCardHeader,
  ChartCardContent,
  ChartCardFooter,
} from "./chart-card";

describe("ChartCard", () => {
  it("정상 동작 확인.", () => {
    render(
      <ChartCard state="ready" height={200}>
        <ChartCardHeader head="매출 추이" description="최근 30일" />
        <ChartCardContent>CONTENT</ChartCardContent>
      </ChartCard>,
    );

    expect(screen.getByText("매출 추이")).toBeInTheDocument();
    expect(screen.getByText("최근 30일")).toBeInTheDocument();
    expect(screen.getByText("CONTENT")).toBeInTheDocument();
  });

  it("actions가 있으면 헤더 오른쪽 렌더링.", () => {
    render(
      <ChartCard state="ready">
        <ChartCardHeader
          head="차트"
          actions={<button type="button">필터</button>}
        />
        <ChartCardContent>CONTENT</ChartCardContent>
      </ChartCard>,
    );

    expect(screen.getByText("필터")).toBeInTheDocument();
  });

  it("loading 상태 시 skeleton이 보임.", () => {
    const { container } = render(
      <ChartCard state="loading" height={240}>
        <ChartCardHeader head="로딩" />
        <ChartCardContent>CONTENT</ChartCardContent>
      </ChartCard>,
    );

    const busyEl = container.querySelector('[aria-busy="true"]');
    expect(busyEl).not.toBeNull();

    expect(screen.queryByText("CONTENT")).not.toBeInTheDocument();
  });

  it("empty 상태 시 emptyHead/emptyDescription이 보임.", () => {
    render(
      <ChartCard
        state="empty"
        emptyHead="데이터 없음"
        emptyDescription="조건을 바꿔보세요."
      >
        <ChartCardHeader head="빈 상태" />
        <ChartCardContent>CONTENT</ChartCardContent>
      </ChartCard>,
    );

    expect(screen.getByText("데이터 없음")).toBeInTheDocument();
    expect(screen.getByText("조건을 바꿔보세요.")).toBeInTheDocument();
    expect(screen.queryByText("CONTENT")).not.toBeInTheDocument();
  });

  it("error 상태 시 errorHead/errorDescription이 보임.", () => {
    render(
      <ChartCard
        state="error"
        errorHead="에러 발생"
        errorDescription="다시 시도해주세요."
      >
        <ChartCardHeader head="에러 상태" />
        <ChartCardContent>CONTENT</ChartCardContent>
      </ChartCard>,
    );

    expect(screen.getByText("에러 발생")).toBeInTheDocument();
    expect(screen.getByText("다시 시도해주세요.")).toBeInTheDocument();
    expect(screen.queryByText("CONTENT")).not.toBeInTheDocument();
  });

  it("Footer 추가 시 하단에 렌더링.", () => {
    render(
      <ChartCard state="ready">
        <ChartCardHeader head="푸터 테스트" />
        <ChartCardContent>CONTENT</ChartCardContent>
        <ChartCardFooter>Updated 5m ago</ChartCardFooter>
      </ChartCard>,
    );

    expect(screen.getByText("Updated 5m ago")).toBeInTheDocument();
  });
  it("ChartCard 없이 Content 사용 시 에러가 발생.", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      expect(() =>
        render(<ChartCardContent>CONTENT</ChartCardContent>),
      ).toThrow(/must be used within <ChartCard \/>/i);
    } finally {
      spy.mockRestore();
    }
  });
});
