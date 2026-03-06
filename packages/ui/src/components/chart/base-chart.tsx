import {
  Chart,
  type ChartType,
  type ChartData,
  type ChartOptions,
  type Plugin,
  type UpdateMode,
} from "chart.js";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { ensureChartJsRegistered } from "../../lib/chart";

export interface BaseChartProps<TType extends ChartType = ChartType> {
  type: TType;
  data: ChartData<TType>;
  options?: ChartOptions<TType>;
  plugins?: Plugin<TType>[];
  updateMode?: UpdateMode | "default";
  recreateOnTypeChange?: boolean;
  width?: number;
  height?: number;
  className?: string;
  canvasClassName?: string;
  ariaLabel?: string;
  onChart?: (chart: Chart<TType>) => void;
}

function BaseChartInner<TType extends ChartType>(
  {
    type,
    data,
    options,
    plugins,
    updateMode = "default",
    recreateOnTypeChange = true,
    width,
    height,
    className,
    canvasClassName,
    ariaLabel = "chart",
    onChart,
  }: BaseChartProps<TType>,
  ref: React.ForwardedRef<Chart<TType>>,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<TType> | null>(null);
  const prevTypeRef = useRef<TType | null>(null);

  const typeRef = useRef(type);
  const dataRef = useRef(data);
  const optionsRef = useRef(options);
  const pluginsRef = useRef(plugins);
  const onChartRef = useRef(onChart);
  const forwardedRefRef = useRef(ref);

  const isMountedRef = useRef(false);
  const justRecreatedRef = useRef(false);

  useLayoutEffect(() => {
    typeRef.current = type;
    dataRef.current = data;
    optionsRef.current = options;
    pluginsRef.current = plugins;
    onChartRef.current = onChart;
    forwardedRefRef.current = ref;
  });

  useEffect(() => {
    ensureChartJsRegistered();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const chart = new Chart<TType>(context, {
      type: typeRef.current,
      data: dataRef.current,
      options: (optionsRef.current ?? {}) as ChartOptions<TType>,
      plugins: pluginsRef.current ?? [],
    });

    chartRef.current = chart;
    prevTypeRef.current = typeRef.current;
    isMountedRef.current = true;

    const forwardedRef = forwardedRefRef.current;
    if (typeof forwardedRef === "function") forwardedRef(chart);
    else if (forwardedRef) forwardedRef.current = chart;

    onChartRef.current?.(chart);

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;

      const forward = forwardedRefRef.current;
      if (typeof forward === "function") forward(null);
      else if (forward) forward.current = null;
    };
  }, []);

  useEffect(() => {
    if (!recreateOnTypeChange) return;
    if (!isMountedRef.current) return;
    if (prevTypeRef.current === type) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    chartRef.current?.destroy();

    const nextChart = new Chart<TType>(context, {
      type,
      data: dataRef.current,
      options: (optionsRef.current ?? {}) as ChartOptions<TType>,
      plugins: pluginsRef.current ?? [],
    });

    chartRef.current = nextChart;
    prevTypeRef.current = type;
    justRecreatedRef.current = true;

    const forwardedRef = forwardedRefRef.current;
    if (typeof forwardedRef === "function") forwardedRef(nextChart);
    else if (forwardedRef) forwardedRef.current = nextChart;

    onChartRef.current?.(nextChart);
  }, [type, recreateOnTypeChange]);

  useEffect(() => {
    if (!isMountedRef.current) return;

    if (justRecreatedRef.current) {
      justRecreatedRef.current = false;
      return;
    }

    const chart = chartRef.current;
    if (!chart) return;

    chart.data = data;
    chart.options = (options ?? {}) as ChartOptions<TType>;
    chart.config.plugins = plugins ?? [];

    const mode = updateMode === "default" ? undefined : updateMode;
    chart.update(mode);
  }, [type, data, options, plugins, updateMode, recreateOnTypeChange]);

  return (
    <div className={cn("relative w-full", className)}>
      <canvas
        ref={canvasRef}
        className={cn("block w-full", canvasClassName)}
        width={width}
        height={height}
        aria-label={ariaLabel}
        role="img"
      />
    </div>
  );
}

export const BaseChart = forwardRef(BaseChartInner) as <
  TType extends ChartType,
>(
  props: BaseChartProps<TType> & {
    ref?: React.ForwardedRef<Chart<TType> | null>;
  },
) => ReturnType<typeof BaseChartInner>;
