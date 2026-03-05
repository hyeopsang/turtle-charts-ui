import { createContext, useContext, useMemo } from "react";
import * as React from "react";
import { cn } from "../../lib/cn";

export type ChartCardState = "ready" | "loading" | "empty" | "error";

interface ChartCardContextValue {
  state: ChartCardState;
  height: number;
  padded: boolean;
  loadingLabel: string;

  emptyHead: React.ReactNode;
  emptyDescription?: React.ReactNode;
  emptyAction?: React.ReactNode;

  errorHead: React.ReactNode;
  errorDescription?: React.ReactNode;
  errorAction?: React.ReactNode;
}

const ChartCardContext = createContext<ChartCardContextValue | null>(null);

function useChartCardContext(): ChartCardContextValue {
  const chartCardContext = useContext(ChartCardContext);
  if (!chartCardContext) {
    throw new Error(
      "ChartCardHeader/ChartCardContent/ChartCardFooter must be used within <ChartCard />",
    );
  }
  return chartCardContext;
}

function DefaultSkeleton({ height }: { height: number }): JSX.Element {
  return (
    <div
      className="w-full animate-pulse rounded-lg bg-gray-100"
      style={{ height }}
      aria-hidden="true"
    />
  );
}

function StatePanel({
  head,
  description,
  action,
}: {
  head: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
      <div className="text-sm font-semibold text-gray-900">{head}</div>
      {description ? (
        <div className="max-w-[360px] text-xs text-gray-600">{description}</div>
      ) : null}
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}

export interface ChartCardProps extends React.HTMLAttributes<HTMLElement> {
  state?: ChartCardState;
  height?: number;
  padded?: boolean;

  loadingLabel?: string;

  emptyHead?: React.ReactNode;
  emptyDescription?: React.ReactNode;
  emptyAction?: React.ReactNode;

  errorHead?: React.ReactNode;
  errorDescription?: React.ReactNode;
  errorAction?: React.ReactNode;
}

export function ChartCard({
  state = "ready",
  height = 280,
  padded = true,
  loadingLabel = "차트 로딩 중…",

  emptyHead = "데이터가 없어요",
  emptyDescription = "조건을 바꾸거나 기간을 늘려서 다시 확인해보세요.",
  emptyAction,

  errorHead = "차트를 불러오지 못했어요",
  errorDescription = "잠시 후 다시 시도해보세요.",
  errorAction,

  className,
  children,
  ...props
}: ChartCardProps): JSX.Element {
  const value = useMemo<ChartCardContextValue>(
    () => ({
      state,
      height,
      padded,
      loadingLabel,
      emptyHead,
      emptyDescription,
      emptyAction,
      errorHead,
      errorDescription,
      errorAction,
    }),
    [
      state,
      height,
      padded,
      loadingLabel,
      emptyHead,
      emptyDescription,
      emptyAction,
      errorHead,
      errorDescription,
      errorAction,
    ],
  );

  return (
    <ChartCardContext.Provider value={value}>
      <section
        className={cn(
          "rounded-2xl border border-gray-200 bg-white shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    </ChartCardContext.Provider>
  );
}

export interface ChartCardHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  head?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function ChartCardHeader({
  head,
  description,
  actions,
  className,
  ...props
}: ChartCardHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        {head ? (
          <div className="truncate text-sm font-semibold text-gray-900">
            {head}
          </div>
        ) : null}
        {description ? (
          <div className="mt-1 line-clamp-2 text-xs text-gray-600">
            {description}
          </div>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

export type ChartCardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function ChartCardContent({
  className,
  children,
  ...props
}: ChartCardContentProps): JSX.Element {
  const chartCardContext = useChartCardContext();

  const innerHeight =
    chartCardContext.height - (chartCardContext.padded ? 32 : 0);

  return (
    <div
      className={cn(className)}
      style={{ height: chartCardContext.height }}
      aria-busy={chartCardContext.state === "loading" ? true : undefined}
      aria-live="polite"
      {...props}
    >
      {chartCardContext.state === "ready" ? (
        <div className="h-full w-full">{children}</div>
      ) : null}

      {chartCardContext.state === "loading" ? (
        <div className="h-full w-full">
          <div className="sr-only">{chartCardContext.loadingLabel}</div>
          <DefaultSkeleton height={innerHeight} />
        </div>
      ) : null}

      {chartCardContext.state === "empty" ? (
        <StatePanel
          head={chartCardContext.emptyHead}
          description={chartCardContext.emptyDescription}
          action={chartCardContext.emptyAction}
        />
      ) : null}

      {chartCardContext.state === "error" ? (
        <StatePanel
          head={chartCardContext.errorHead}
          description={chartCardContext.errorDescription}
          action={chartCardContext.errorAction}
        />
      ) : null}
    </div>
  );
}

export type ChartCardFooterProps = React.HTMLAttributes<HTMLElement>;

export function ChartCardFooter({
  className,
  ...props
}: ChartCardFooterProps): JSX.Element {
  return (
    <footer
      className={cn(
        "border-t border-gray-100 px-5 py-3 text-xs text-gray-600",
        className,
      )}
      {...props}
    />
  );
}
