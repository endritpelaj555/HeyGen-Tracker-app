'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Eye,
  Share2,
  Users,
  TrendingUp,
  MessageCircle,
  Zap,
  Activity,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MetricCard, MetricCardGrid } from '@/components/ui/MetricCard';
import { LineChartComponent, AreaChartComponent } from '@/components/ui/Chart';
import {
  mockTwitterMetrics,
  mockLinkedInMetrics,
  mockHeyGenMetrics,
  getLatestMetrics,
  getPreviousMetrics,
  calculateGrowthRate,
} from '@/lib/data';

export default function DashboardPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('month');

  // Get latest metrics
  const latestTwitter = getLatestMetrics(mockTwitterMetrics);
  const previousTwitter = getPreviousMetrics(mockTwitterMetrics);

  const latestLinkedIn = getLatestMetrics(mockLinkedInMetrics);
  const previousLinkedIn = getPreviousMetrics(mockLinkedInMetrics);

  const latestHeyGen = getLatestMetrics(mockHeyGenMetrics);
  const previousHeyGen = getPreviousMetrics(mockHeyGenMetrics);

  // Calculate trends
  const twitterFollowerGrowth = calculateGrowthRate(
    latestTwitter.followers,
    previousTwitter.followers
  );
  const linkedInFollowerGrowth = calculateGrowthRate(
    latestLinkedIn.followers,
    previousLinkedIn.followers
  );
  const heygenViewGrowth = calculateGrowthRate(
    latestHeyGen.videoViews,
    previousHeyGen.videoViews
  );

  // Prepare chart data
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

  const twitterChartData = getChartData(mockTwitterMetrics, period === 'week' ? 7 : 30);
  const linkedInChartData = getChartData(
    mockLinkedInMetrics,
    period === 'week' ? 7 : 30
  );
  const heygenChartData = getChartData(mockHeyGenMetrics, period === 'week' ? 7 : 30);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title="Dashboard"
        subtitle="Overview of all your social media metrics"
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
              Key Metrics
            </h2>
            <MetricCardGrid columns={4}>
              <MetricCard
                title="Total Followers"
                value={
                  latestTwitter.followers +
                  latestLinkedIn.followers
                }
                unit="followers"
                percentChange={
                  (twitterFollowerGrowth + linkedInFollowerGrowth) / 2
                }
                trend="up"
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Total Impressions"
                value={
                  latestTwitter.impressions +
                  latestLinkedIn.impressions
                }
                unit="impressions"
                percentChange={2.5}
                trend="up"
                icon={<Eye className="w-5 h-5" />}
              />
              <MetricCard
                title="Avg Engagement Rate"
                value={
                  (latestTwitter.engagementRate +
                    latestLinkedIn.engagementRate) /
                  2
                }
                unit="%"
                percentChange={1.2}
                trend="up"
                icon={<Heart className="w-5 h-5" />}
              />
              <MetricCard
                title="Video Views"
                value={latestHeyGen.videoViews}
                percentChange={heygenViewGrowth}
                trend={heygenViewGrowth > 0 ? 'up' : 'down'}
                icon={<Zap className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Twitter metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              X (Twitter) Analytics
            </h2>
            <MetricCardGrid columns={3}>
              <MetricCard
                title="Followers"
                value={latestTwitter.followers}
                previousValue={previousTwitter.followers}
                percentChange={twitterFollowerGrowth}
                trend={twitterFollowerGrowth > 0 ? 'up' : 'down'}
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Engagement Rate"
                value={latestTwitter.engagementRate}
                unit="%"
                previousValue={previousTwitter.engagementRate}
                trend="up"
                icon={<Heart className="w-5 h-5" />}
              />
              <MetricCard
                title="Impressions"
                value={latestTwitter.impressions}
                previousValue={previousTwitter.impressions}
                trend="up"
                icon={<Eye className="w-5 h-5" />}
              />
            </MetricCardGrid>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <LineChartComponent
                data={twitterChartData}
                dataKeys={[
                  {
                    key: 'followers',
                    name: 'Followers',
                    color: '#00C2B2',
                  },
                  {
                    key: 'impressions',
                    name: 'Impressions',
                    color: '#7C3AED',
                    yAxisId: 'right',
                  },
                ]}
                height={300}
              />
            </motion.div>
          </div>

          {/* LinkedIn metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              LinkedIn Analytics
            </h2>
            <MetricCardGrid columns={3}>
              <MetricCard
                title="Followers"
                value={latestLinkedIn.followers}
                previousValue={previousLinkedIn.followers}
                percentChange={linkedInFollowerGrowth}
                trend={linkedInFollowerGrowth > 0 ? 'up' : 'down'}
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Engagement Rate"
                value={latestLinkedIn.engagementRate}
                unit="%"
                previousValue={previousLinkedIn.engagementRate}
                trend="up"
                icon={<Heart className="w-5 h-5" />}
              />
              <MetricCard
                title="Page Views"
                value={latestLinkedIn.pageViews}
                previousValue={previousLinkedIn.pageViews}
                trend="up"
                icon={<Eye className="w-5 h-5" />}
              />
            </MetricCardGrid>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <AreaChartComponent
                data={linkedInChartData}
                dataKeys={[
                  {
                    key: 'followers',
                    name: 'Followers',
                    color: '#00C2B2',
                  },
                  {
                    key: 'pageViews',
                    name: 'Page Views',
                    color: '#10B981',
                  },
                ]}
                height={300}
              />
            </motion.div>
          </div>

          {/* HeyGen metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              HeyGen Analytics
            </h2>
            <MetricCardGrid columns={3}>
              <MetricCard
                title="Video Views"
                value={latestHeyGen.videoViews}
                previousValue={previousHeyGen.videoViews}
                percentChange={heygenViewGrowth}
                trend={heygenViewGrowth > 0 ? 'up' : 'down'}
                icon={<Zap className="w-5 h-5" />}
              />
              <MetricCard
                title="Avatar Views"
                value={latestHeyGen.avatarViews}
                previousValue={previousHeyGen.avatarViews}
                trend="up"
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Video Engagements"
                value={latestHeyGen.videoEngagements}
                previousValue={previousHeyGen.videoEngagements}
                trend="up"
                icon={<Activity className="w-5 h-5" />}
              />
            </MetricCardGrid>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <LineChartComponent
                data={heygenChartData}
                dataKeys={[
                  {
                    key: 'videoViews',
                    name: 'Video Views',
                    color: '#00C2B2',
                  },
                  {
                    key: 'videoEngagements',
                    name: 'Engagements',
                    color: '#F59E0B',
                  },
                ]}
                height={300}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
