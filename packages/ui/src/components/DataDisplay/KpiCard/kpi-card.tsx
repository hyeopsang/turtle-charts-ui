import { cn } from "../../../lib/cn";
import { DeltaBadge, type DeltaBadgeProps } from "../DeltaBadge/delta-badge";
import {
  MetricValue,
  type MetricValueProps,
} from "../MetricValue/metric-value";

type KpiState = "ready" | "loading" | "empty";

export interface KpiCardProps {
  label: React.ReactNode;
  subLabel?: React.ReactNode;
  value: MetricValueProps["value"];
  format?: MetricValueProps["format"];
  percent?: MetricValueProps["percent"];
  currency?: MetricValueProps["currency"];
  decimals?: MetricValueProps["decimals"];
  locale?: MetricValueProps["locale"];
  sign?: MetricValueProps["sign"];
  compact?: MetricValueProps["compact"];
  placeholder?: MetricValueProps["placeholder"];
  delta?: Omit<DeltaBadgeProps, "className">;
  state?: KpiState;
  actions?: React.ReactNode;
  className?: string;
}

function SkeletonLine({ w = "w-24" }: { w?: string }) {
  return <div className={cn("h-3 rounded bg-gray-100 animate-pulse", w)} />;
}

export function KpiCard({
  label,
  subLabel,
  value,
  format = "number",
  percent = "ratio",
  currency,
  decimals,
  locale = "ko-KR",
  sign = "auto",
  compact = false,
  placeholder = "—",
  delta,
  state = "ready",
  actions,
  className,
}: KpiCardProps): JSX.Element {
  const isEmpty = state === "empty";

  return (
    <section
      className={cn(
        "rounded-2xl border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-3 px-5 pt-4">
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-gray-600">
            {label}
          </div>
          {subLabel ? (
            <div className="mt-1 truncate text-[11px] text-gray-500">
              {subLabel}
            </div>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>
      <div className="px-5 pb-4 pt-3">
        {state === "loading" ? (
          <div className="space-y-2">
            <SkeletonLine w="w-28" />
            <SkeletonLine w="w-20" />
          </div>
        ) : (
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-2xl font-semibold leading-none text-gray-900">
                <MetricValue
                  value={isEmpty ? null : value}
                  format={format}
                  percent={percent}
                  currency={currency}
                  decimals={decimals}
                  locale={locale}
                  sign={sign}
                  compact={compact}
                  placeholder={placeholder}
                  titleFormat="auto"
                  className="tabular-nums"
                />
              </div>
            </div>
            {delta ? <DeltaBadge {...delta} /> : null}
          </div>
        )}
      </div>
    </section>
  );
}
