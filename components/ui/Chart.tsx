'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatNumber } from '@/lib/utils';

interface ChartDataPoint {
  date: string;
  [key: string]: number | string;
}

interface LineChartComponentProps {
  data: ChartDataPoint[];
  dataKeys: { key: string; name: string; color: string; yAxisId?: string }[];
  title?: string;
  height?: number;
}

const COLORS = ['#00C2B2', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg p-3 shadow-lg">
        <p className="text-heygen-white text-sm font-medium">{payload[0].payload.date}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {entry.name}: {formatNumber(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function LineChartComponent({
  data,
  dataKeys,
  title,
  height = 300,
}: LineChartComponentProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-heygen-white mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2D2D3D"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
          />
          {dataKeys.map((dataKey, index) => (
            <Line
              key={dataKey.key}
              type="monotone"
              dataKey={dataKey.key}
              name={dataKey.name}
              stroke={dataKey.color}
              dot={false}
              strokeWidth={2}
              isAnimationActive
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AreaChartComponent({
  data,
  dataKeys,
  title,
  height = 300,
}: LineChartComponentProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-heygen-white mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            {dataKeys.map((dataKey, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${dataKey.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={dataKey.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={dataKey.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2D2D3D"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
          />
          {dataKeys.map((dataKey) => (
            <Area
              key={dataKey.key}
              type="monotone"
              dataKey={dataKey.key}
              name={dataKey.name}
              fill={`url(#gradient-${dataKey.key})`}
              stroke={dataKey.color}
              strokeWidth={2}
              isAnimationActive
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartComponentProps {
  data: ChartDataPoint[];
  dataKey: string;
  title?: string;
  height?: number;
  barColor?: string;
}

export function BarChartComponent({
  data,
  dataKey,
  title,
  height = 300,
  barColor = '#00C2B2',
}: BarChartComponentProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-heygen-white mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2D2D3D"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={dataKey}
            fill={barColor}
            radius={[8, 8, 0, 0]}
            isAnimationActive
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PieChartComponentProps {
  data: { name: string; value: number }[];
  title?: string;
  height?: number;
}

export function PieChartComponent({
  data,
  title,
  height = 300,
}: PieChartComponentProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-heygen-white mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: any) =>
              `${name} ${((percent || 0) * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatNumber(value as number)}
            contentStyle={{
              backgroundColor: '#111118',
              border: '1px solid #2D2D3D',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
