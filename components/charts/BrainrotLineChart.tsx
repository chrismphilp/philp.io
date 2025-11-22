import React from 'react';
import { useTheme } from 'next-themes';

export type BrainrotSeries = {
  name: string;
  data: number[];
};

export type BrainrotLineChartProps = {
  title?: string;
  categories: string[];
  series: BrainrotSeries[];
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

const BrainrotLineChart: React.FC<BrainrotLineChartProps> = ({
  title = 'Brain-rot Metrics',
  categories,
  series,
  height = 320,
  xAxisLabel = '',
  yAxisLabel = '',
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const allValues = series.flatMap((s) => s.data);
  const maxValue = Math.max(10, ...allValues);

  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 50;
  const width = 600;
  const chartHeight = height;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const xStep = categories.length > 1 ? innerWidth / (categories.length - 1) : 0;

  const valueToY = (v: number) => paddingTop + innerHeight - (v / maxValue) * innerHeight;

  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? '#374151' : '#e5e7eb';

  const yTickCount = 5;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => {
    const value = (maxValue / yTickCount) * i;
    const y = valueToY(value);
    return { value, y };
  });

  return (
    <figure className="w-full overflow-x-auto text-sm">
      <figcaption className="mb-2 text-center text-secondary">{title}</figcaption>
      <svg width="100%" viewBox={`0 0 ${width} ${chartHeight}`} role="img" aria-label={title}>
        {/* Grid lines */}
        {yTicks.map(({ y, value }) =>
          value === 0 ? null : (
            <line
              key={`grid-${value}`}
              x1={paddingLeft}
              y1={y}
              x2={width - paddingRight}
              y2={y}
              stroke={gridColor}
              strokeWidth="0.5"
            />
          ),
        )}

        {/* Axes */}
        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={paddingTop + innerHeight}
          stroke={textColor}
          strokeWidth="1"
        />
        <line
          x1={paddingLeft}
          y1={paddingTop + innerHeight}
          x2={width - paddingRight}
          y2={paddingTop + innerHeight}
          stroke={textColor}
          strokeWidth="1"
        />

        {/* Y-axis labels & ticks */}
        {yTicks.map(({ value, y }) => (
          <g key={`ytick-${value}`}>
            {/* tick mark */}
            <line
              x1={paddingLeft - 4}
              y1={y}
              x2={paddingLeft}
              y2={y}
              stroke={textColor}
              strokeWidth="1"
            />
            {/* label */}
            <text
              x={paddingLeft - 6}
              y={y + 3}
              fill={textColor}
              fontSize="10"
              textAnchor="end"
            >
              {Math.round(value)}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {categories.map((label, i) => {
          const x = paddingLeft + i * xStep;
          return (
            <text
              key={label + i}
              x={x}
              y={paddingTop + innerHeight + 16}
              fill={textColor}
              fontSize="10"
              textAnchor="middle"
            >
              {label}
            </text>
          );
        })}

        {/* X-axis title */}
        {xAxisLabel && (
          <text
            x={(paddingLeft + width - paddingRight) / 2}
            y={paddingTop + innerHeight + 32}
            fill={textColor}
            fontSize="11"
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
        )}

        {/* Y-axis title */}
        {yAxisLabel && (
          <text
            x={12}
            y={paddingTop + innerHeight / 2}
            fill={textColor}
            fontSize="11"
            textAnchor="middle"
            transform={`rotate(-90 12 ${paddingTop + innerHeight / 2})`}
          >
            {yAxisLabel}
          </text>
        )}

        {/* Series lines & points */}
        {series.map((s, idx) => {
          const colorPalette = ['#3b82f6', '#10b981', '#f97316', '#e11d48'];
          const stroke = colorPalette[idx % colorPalette.length];

          const points = s.data.map((v, i) => {
            const x = paddingLeft + i * xStep;
            const y = valueToY(v);
            return { x, y };
          });

          const pathD =
            points.length === 0
              ? ''
              : points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

          return (
            <g key={s.name}>
              <path d={pathD} fill="none" stroke={stroke} strokeWidth={2} />
              {points.map((p, i) => (
                <circle key={s.name + i} cx={p.x} cy={p.y} r={3} fill={stroke} />
              ))}
            </g>
          );
        })}

        {/* Legend */}
        {series.map((s, idx) => {
          const colorPalette = ['#3b82f6', '#10b981', '#f97316', '#e11d48'];
          const stroke = colorPalette[idx % colorPalette.length];
          const legendX = paddingLeft + idx * 120;
          const legendY = paddingTop - 8;

          return (
            <g key={`legend-${s.name}`}>
              <rect x={legendX} y={legendY - 8} width="10" height="2" fill={stroke} />
              <text x={legendX + 16} y={legendY} fill={textColor} fontSize="10">
                {s.name}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
};

export default BrainrotLineChart;
