import { cn } from "../../../lib/cn";
import {
  MetricValue,
  type MetricValueProps,
} from "../MetricValue/metric-value";

type DeltaTone = "auto" | "positive" | "negative" | "neutral";

export interface DeltaBadgeProps {
  value: number | null | undefined;
  format?: MetricValueProps["format"];
  percent?: MetricValueProps["percent"];
  currency?: MetricValueProps["currency"];
  decimals?: MetricValueProps["decimals"];
  locale?: MetricValueProps["locale"];
  sign?: MetricValueProps["sign"];
  tone?: DeltaTone;
  prefix?: React.ReactNode;
  className?: string;
}

function resolveTone(
  tone: DeltaTone,
  value: number,
): "positive" | "negative" | "neutral" {
  if (tone !== "auto") return tone;
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

export function DeltaBadge({
  value,
  format = "percent",
  percent = "ratio",
  currency,
  decimals,
  locale = "ko-KR",
  sign = "always",
  tone = "auto",
  prefix,
  className,
}: DeltaBadgeProps): JSX.Element | null {
  if (typeof value !== "number") return null;

  const toneType = resolveTone(tone, value);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
        toneType === "positive" &&
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        toneType === "negative" && "border-rose-200 bg-rose-50 text-rose-700",
        toneType === "neutral" && "border-gray-200 bg-gray-50 text-gray-700",
        className,
      )}
    >
      {prefix ? <span className="text-[11px] opacity-80">{prefix}</span> : null}

      <MetricValue
        value={value}
        format={format}
        percent={percent}
        currency={currency}
        decimals={decimals}
        locale={locale}
        sign={sign}
        titleFormat="none"
        className="font-medium"
      />
    </div>
  );
}
