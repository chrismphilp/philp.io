import dynamic from 'next/dynamic';
import React from 'react';
import { useTheme } from 'next-themes';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any;

export type BrainrotSeries = {
  name: string;
  data: number[];
};

export type BrainrotLineChartProps = {
  title?: string;
  categories: string[];
  series: BrainrotSeries[];
  height?: number;
};

const BrainrotLineChart: React.FC<BrainrotLineChartProps> = ({
  title = 'Brain-rot Metrics',
  categories,
  series,
  height = 350,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const foreColor = isDark ? '#e5e7eb' : '#374151'; // gray-200 vs gray-700
  const gridColor = isDark ? '#374151' : '#e5e7eb'; // subtle grid contrast
  const options: any = {
    chart: {
      id: 'brainrot-line',
      background: 'transparent',
      foreColor,
      toolbar: { show: false },
      zoom: { enabled: false },
      selection: { enabled: false },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    grid: { borderColor: gridColor },
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { rotate: -45 },
    },
    yaxis: {
      min: 0,
      max: 10,
      tickAmount: 5,
    },
    legend: { position: 'top' },
    tooltip: { shared: true, intersect: false, theme: isDark ? 'dark' : 'light' },
    markers: { size: 3 },
  };

  return (
    <div className="w-full">
      {/* Fallback while loading on client */}
      <React.Suspense fallback={<div>Loading chart…</div>}>
        {mounted && (
          <ReactApexChart
            key={isDark ? 'dark' : 'light'}
            options={options}
            series={series}
            type="line"
            height={height}
          />
        )}
      </React.Suspense>
    </div>
  );
};

export default BrainrotLineChart;
