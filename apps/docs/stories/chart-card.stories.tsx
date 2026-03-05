import type { Meta, StoryObj } from "@storybook/react";
import {
  ChartCard,
  ChartCardHeader,
  ChartCardContent,
  ChartCardFooter,
} from "@turtle/ui";

const meta: Meta = {
  title: "Charts/ChartCard",
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj;

function FakeChart(): JSX.Element {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-600">
      Chart Area
    </div>
  );
}

export const Ready: Story = {
  render: () => (
    <div className="w-180">
      <ChartCard height={320} state="ready">
        <ChartCardHeader
          actions={
            <button
              className="rounded-md border border-gray-200 px-2 py-1 text-xs"
              type="button"
            >
              필터
            </button>
          }
          description="최근 30일"
          head="매출 추이"
        />
        <ChartCardContent>
          <FakeChart />
        </ChartCardContent>
        <ChartCardFooter>Updated 5m ago</ChartCardFooter>
      </ChartCard>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="w-180">
      <ChartCard height={320} state="loading">
        <ChartCardHeader description="최근 30일" head="매출 추이" />
        <ChartCardContent>
          <FakeChart />
        </ChartCardContent>
      </ChartCard>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-180">
      <ChartCard
        emptyAction={
          <button
            className="rounded-md border border-gray-200 px-2 py-1 text-xs"
            type="button"
          >
            필터 초기화
          </button>
        }
        emptyDescription="기간/필터를 바꿔서 다시 확인해보세요."
        emptyHead="표시할 데이터가 없어요"
        height={320}
        state="empty"
      >
        <ChartCardHeader description="최근 30일" head="매출 추이" />
        <ChartCardContent>
          <FakeChart />
        </ChartCardContent>
      </ChartCard>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-180">
      <ChartCard
        errorAction={
          <button
            className="rounded-md border border-gray-200 px-2 py-1 text-xs"
            type="button"
          >
            재시도
          </button>
        }
        errorDescription="네트워크 상태를 확인한 뒤 다시 시도해보세요."
        errorHead="차트를 불러오지 못했어요"
        height={320}
        state="error"
      >
        <ChartCardHeader description="최근 30일" head="매출 추이" />
        <ChartCardContent>
          <FakeChart />
        </ChartCardContent>
      </ChartCard>
    </div>
  ),
};
