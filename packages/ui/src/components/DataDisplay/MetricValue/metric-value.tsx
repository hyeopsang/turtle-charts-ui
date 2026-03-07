import { useMemo } from "react";
import { cn } from "../../../lib/cn";

type Format = "number" | "currency" | "percent";
type Sign = NonNullable<Intl.NumberFormatOptions["signDisplay"]>;
type Percent = "ratio" | "point";

export interface MetricValueProps {
  value: number | null | undefined;
  compact?: boolean;
  currency?: string;
  decimals?: number;
  format?: Format;
  locale?: string;
  percent?: Percent;
  placeholder?: string;
  sign: Sign;
  titleFormat?: "auto" | "full" | "none";
  className?: string;
}

function isValidNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function normalizeValue(
  raw: number | null | undefined,
  format: Format,
  percent: Percent,
): number | null {
  if (!isValidNumber(raw)) return null;
  if (format !== "percent") return raw;
  return percent === "point" ? raw / 100 : raw;
}

function makeFormatter(options: {
  compact: boolean;
  currency?: string;
  decimals?: number;
  format: Format;
  locale: string;
  sign: Sign;
}): Intl.NumberFormat {
  const { compact, currency, decimals, format, locale, sign } = options;

  const safeFormat = format === "currency" && !currency ? "number" : format;

  const base: Intl.NumberFormatOptions = {
    signDisplay: sign,
    ...(compact ? { notation: "compact", compactDisplay: "short" } : {}),
  };

  if (typeof decimals === "number") {
    base.maximumFractionDigits = decimals;
    base.minimumFractionDigits = decimals;
  } else {
    if (safeFormat === "number") base.maximumFractionDigits = 0;
    if (safeFormat === "currency") base.maximumFractionDigits = 0;
    if (safeFormat === "percent") base.maximumFractionDigits = 1;
  }

  if (safeFormat === "currency" && currency) {
    return new Intl.NumberFormat(locale, {
      ...base,
      style: "currency",
      currency,
    });
  }
  if (safeFormat === "percent") {
    return new Intl.NumberFormat(locale, { ...base, style: "percent" });
  }
  return new Intl.NumberFormat(locale, { ...base, style: "decimal" });
}

export function MetricValue({
  value,
  className,
  compact = false,
  currency,
  decimals,
  format = "number",
  locale = "ko-KR",
  percent = "ratio",
  placeholder = "—",
  sign = "auto",
  titleFormat = "auto",
}: MetricValueProps): JSX.Element {
  const displayBaseValue = normalizeValue(value, format, percent);

  const formatter = useMemo(() => {
    return makeFormatter({ compact, currency, decimals, format, locale, sign });
  }, [compact, currency, decimals, format, locale, sign]);

  const displayText = isValidNumber(displayBaseValue)
    ? formatter.format(displayBaseValue)
    : placeholder;

  const shouldTitle =
    titleFormat === "full" || (titleFormat === "auto" && compact);

  const title =
    shouldTitle && isValidNumber(displayBaseValue)
      ? makeFormatter({
          compact: false,
          currency,
          decimals,
          format,
          locale,
          sign,
        }).format(displayBaseValue)
      : undefined;

  const dataValue = isValidNumber(displayBaseValue)
    ? String(displayBaseValue)
    : undefined;

  return (
    <data className={cn(className)} title={title} value={dataValue}>
      {displayText}
    </data>
  );
}
