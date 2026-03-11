'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Eye,
  Share2,
  MessageCircle,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MetricCard, MetricCardGrid } from '@/components/ui/MetricCard';
import {
  LineChartComponent,
  AreaChartComponent,
  PieChartComponent,
} from '@/components/ui/Chart';
import {
  mockLinkedInMetrics,
  getLatestMetrics,
  getPreviousMetrics,
  calculateGrowthRate,
} from '@/lib/data';
import { formatNumber } from '@/lib/utils';

export default function LinkedInPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('month');

  const latest = getLatestMetrics(mockLinkedInMetrics);
  const previous = getPreviousMetrics(mockLinkedInMetrics);

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

  const chartData = getChartData(mockLinkedInMetrics, period === 'week' ? 7 : 30);

  const followerGrowth = calculateGrowthRate(latest.followers, previous.followers);
  const pageViewGrowth = calculateGrowthRate(latest.pageViews, previous.pageViews);
  const impressionGrowth = calculateGrowthRate(
    latest.impressions,
    previous.impressions
  );
  const engagementGrowth = calculateGrowthRate(
    latest.engagements,
    previous.engagements
  );

  // Reaction data for pie chart
  const reactionData = [
    { name: 'Insightful', value: latest.reactions.insightful },
    { name: 'Like', value: latest.reactions.like },
    { name: 'Support', value: latest.reactions.support },
    { name: 'Love', value: latest.reactions.love },
    { name: 'Celebrate', value: latest.reactions.celebrate },
    { name: 'Curious', value: latest.reactions.curious },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title="LinkedIn Analytics"
        subtitle="Detailed insights into your LinkedIn performance"
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

          {/* Main metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Page Metrics
            </h2>
            <MetricCardGrid columns={4}>
              <MetricCard
                title="Followers"
                value={latest.followers}
                percentChange={followerGrowth}
                trend={followerGrowth > 0 ? 'up' : 'down'}
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Following"
                value={latest.following}
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Page Views"
                value={latest.pageViews}
                percentChange={pageViewGrowth}
                trend={pageViewGrowth > 0 ? 'up' : 'down'}
                icon={<Eye className="w-5 h-5" />}
              />
              <MetricCard
                title="Unique Visitors"
                value={latest.uniqueVisitors}
                previousValue={previous.uniqueVisitors}
                trend="up"
                icon={<Users className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Engagement metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Engagement Metrics
            </h2>
            <MetricCardGrid columns={4}>
              <MetricCard
                title="Impressions"
                value={latest.impressions}
                percentChange={impressionGrowth}
                trend={impressionGrowth > 0 ? 'up' : 'down'}
                icon={<Eye className="w-5 h-5" />}
              />
              <MetricCard
                title="Unique Impressions"
                value={latest.uniqueImpressions}
                previousValue={previous.uniqueImpressions}
                trend="up"
                icon={<Zap className="w-5 h-5" />}
              />
              <MetricCard
                title="Engagements"
                value={latest.engagements}
                percentChange={engagementGrowth}
                trend={engagementGrowth > 0 ? 'up' : 'down'}
                icon={<Heart className="w-5 h-5" />}
              />
              <MetricCard
                title="Engagement Rate"
                value={latest.engagementRate}
                unit="%"
                previousValue={previous.engagementRate}
                trend="up"
                icon={<TrendingUp className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Content metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Content Metrics
            </h2>
            <MetricCardGrid columns={4}>
              <MetricCard
                title="Clicks"
                value={latest.clicks}
                previousValue={previous.clicks}
                trend="up"
                icon={<Share2 className="w-5 h-5" />}
              />
              <MetricCard
                title="Click-Through Rate"
                value={latest.ctr}
                unit="%"
                previousValue={previous.ctr}
                trend="up"
                icon={<BarChart3 className="w-5 h-5" />}
              />
              <MetricCard
                title="Comments"
                value={latest.comments}
                previousValue={previous.comments}
                trend="up"
                icon={<MessageCircle className="w-5 h-5" />}
              />
              <MetricCard
                title="Shares"
                value={latest.shares}
                previousValue={previous.shares}
                trend="up"
                icon={<Share2 className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Video metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Video Performance
            </h2>
            <MetricCardGrid columns={1}>
              <MetricCard
                title="Video Views"
                value={latest.videoViews}
                previousValue={previous.videoViews}
                trend="up"
                icon={<Eye className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Followers trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <LineChartComponent
                data={chartData}
                dataKeys={[
                  { key: 'followers', name: 'Followers', color: '#00C2B2' },
                ]}
                height={300}
              />
            </motion.div>

            {/* Impressions trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <AreaChartComponent
                data={chartData}
                dataKeys={[
                  { key: 'impressions', name: 'Impressions', color: '#7C3AED' },
                  {
                    key: 'uniqueImpressions',
                    name: 'Unique Impressions',
                    color: '#10B981',
                  },
                ]}
                height={300}
              />
            </motion.div>

            {/* Engagement trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <LineChartComponent
                data={chartData}
                dataKeys={[
                  { key: 'engagements', name: 'Engagements', color: '#F59E0B' },
                ]}
                height={300}
              />
            </motion.div>

            {/* Reaction breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <PieChartComponent
                data={reactionData}
                title="Reaction Breakdown"
                height={300}
              />
            </motion.div>
          </div>

          {/* Reaction summary */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Reaction Types
            </h2>
            <MetricCardGrid columns={3}>
              <MetricCard
                title="Insightful"
                value={latest.reactions.insightful}
                previousValue={previous.reactions.insightful}
                trend="up"
                variant="compact"
              />
              <MetricCard
                title="Like"
                value={latest.reactions.like}
                previousValue={previous.reactions.like}
                trend="up"
                variant="compact"
              />
              <MetricCard
                title="Support"
                value={latest.reactions.support}
                previousValue={previous.reactions.support}
                trend="up"
                variant="compact"
              />
              <MetricCard
                title="Love"
                value={latest.reactions.love}
                previousValue={previous.reactions.love}
                trend="up"
                variant="compact"
              />
              <MetricCard
                title="Celebrate"
                value={latest.reactions.celebrate}
                previousValue={previous.reactions.celebrate}
                trend="up"
                variant="compact"
              />
              <MetricCard
                title="Curious"
                value={latest.reactions.curious}
                previousValue={previous.reactions.curious}
                trend="up"
                variant="compact"
              />
            </MetricCardGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
