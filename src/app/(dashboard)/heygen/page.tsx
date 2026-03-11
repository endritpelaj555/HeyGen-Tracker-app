'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Eye,
  Heart,
  Activity,
  TrendingUp,
  Users,
  PlayCircle,
  Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MetricCard, MetricCardGrid } from '@/components/ui/MetricCard';
import { LineChartComponent, AreaChartComponent } from '@/components/ui/Chart';
import {
  mockHeyGenMetrics,
  getLatestMetrics,
  getPreviousMetrics,
  calculateGrowthRate,
} from '@/lib/data';

export default function HeyGenPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('month');

  const latest = getLatestMetrics(mockHeyGenMetrics);
  const previous = getPreviousMetrics(mockHeyGenMetrics);

  const getChartData = (metrics: any[], days: number) => {
    const data = metrics.slice(-days);
    return data.map((m: any) => ({
      date: new Date(m.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      ...m,
    }));
  };

  const chartData = getChartData(mockHeyGenMetrics, period === 'week' ? 7 : 30);

  const videoViewGrowth = calculateGrowthRate(latest.videoViews, previous.videoViews);
  const avatarViewGrowth = calculateGrowthRate(
    latest.avatarViews,
    previous.avatarViews
  );
  const engagementGrowth = calculateGrowthRate(
    latest.videoEngagements,
    previous.videoEngagements
  );
  const creationGrowth = calculateGrowthRate(
    latest.aiVideoCreations,
    previous.aiVideoCreations
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title="HeyGen API Analytics"
        subtitle="Video generation and engagement metrics"
        showDatePicker
      />

      <div className="flex-1 overflow-auto bg-gradient-to-b from-heygen-dark to-heygen-dark-2">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Period selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mb-8"
          >
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                period === 'week'
                  ? 'bg-heygen-teal text-heygen-dark'
                  : 'bg-heygen-dark-3 text-heygen-gray hover:text-heygen-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                period === 'month'
                  ? 'bg-heygen-teal text-heygen-dark'
                  : 'bg-heygen-dark-3 text-heygen-gray hover:text-heygen-white'
              }`}
            >
              Month
            </button>
          </motion.div>

          {/* Key metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Key Performance Indicators
            </h2>
            <MetricCardGrid columns={4}>
              <MetricCard
                title="Video Views"
                value={latest.videoViews}
                percentChange={videoViewGrowth}
                trend={videoViewGrowth > 0 ? 'up' : 'down'}
                icon={<PlayCircle className="w-5 h-5" />}
              />
              <MetricCard
                title="Avatar Views"
                value={latest.avatarViews}
                percentChange={avatarViewGrowth}
                trend={avatarViewGrowth > 0 ? 'up' : 'down'}
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Video Engagements"
                value={latest.videoEngagements}
                percentChange={engagementGrowth}
                trend={engagementGrowth > 0 ? 'up' : 'down'}
                icon={<Heart className="w-5 h-5" />}
              />
              <MetricCard
                title="AI Videos Created"
                value={latest.aiVideoCreations}
                percentChange={creationGrowth}
                trend={creationGrowth > 0 ? 'up' : 'down'}
                icon={<Zap className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Detailed metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Detailed Analytics
            </h2>
            <MetricCardGrid columns={3}>
              <MetricCard
                title="Average View Duration"
                value={latest.averageViewDuration}
                unit="min"
                previousValue={previous.averageViewDuration}
                trend="up"
                icon={<Activity className="w-5 h-5" />}
              />
              <MetricCard
                title="New Avatars Created"
                value={latest.newAvatars}
                previousValue={previous.newAvatars}
                trend="up"
                icon={<Star className="w-5 h-5" />}
              />
              <MetricCard
                title="Engagement Rate"
                value={
                  latest.videoEngagements > 0
                    ? (
                        (latest.videoEngagements / latest.videoViews) *
                        100
                      ).toFixed(2)
                    : 0
                }
                unit="%"
                trend="up"
                icon={<TrendingUp className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Video views and engagements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <AreaChartComponent
                data={chartData}
                dataKeys={[
                  { key: 'videoViews', name: 'Video Views', color: '#00C2B2' },
                  {
                    key: 'videoEngagements',
                    name: 'Engagements',
                    color: '#F59E0B',
                  },
                ]}
                height={300}
              />
            </motion.div>

            {/* Avatar and AI video trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <LineChartComponent
                data={chartData}
                dataKeys={[
                  {
                    key: 'avatarViews',
                    name: 'Avatar Views',
                    color: '#7C3AED',
                  },
                  {
                    key: 'aiVideoCreations',
                    name: 'AI Videos Created',
                    color: '#10B981',
                  },
                ]}
                height={300}
              />
            </motion.div>

            {/* Video views trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <LineChartComponent
                data={chartData}
                dataKeys={[
                  { key: 'videoViews', name: 'Video Views', color: '#00C2B2' },
                ]}
                height={300}
              />
            </motion.div>

            {/* Average view duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <LineChartComponent
                data={chartData}
                dataKeys={[
                  {
                    key: 'averageViewDuration',
                    name: 'Avg View Duration (min)',
                    color: '#EF4444',
                  },
                ]}
                height={300}
              />
            </motion.div>
          </div>

          {/* Performance summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
          >
            <h3 className="text-lg font-semibold text-heygen-white mb-4">
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <p className="text-sm text-heygen-gray mb-2">Total Videos</p>
                <p className="text-2xl font-bold text-heygen-white">
                  {chartData.reduce((sum, item) => sum + item.aiVideoCreations, 0)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <p className="text-sm text-heygen-gray mb-2">Total Views</p>
                <p className="text-2xl font-bold text-heygen-teal">
                  {chartData
                    .reduce((sum, item) => sum + item.videoViews, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <p className="text-sm text-heygen-gray mb-2">Total Engagements</p>
                <p className="text-2xl font-bold text-heygen-purple">
                  {chartData
                    .reduce((sum, item) => sum + item.videoEngagements, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <p className="text-sm text-heygen-gray mb-2">Avg Duration</p>
                <p className="text-2xl font-bold text-heygen-orange">
                  {(
                    chartData.reduce(
                      (sum, item) => sum + item.averageViewDuration,
                      0
                    ) / chartData.length
                  ).toFixed(1)}
                  m
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
