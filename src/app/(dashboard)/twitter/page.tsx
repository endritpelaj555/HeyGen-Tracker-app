'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Eye,
  Share2,
  MessageCircle,
  Repeat2,
  Link2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MetricCard, MetricCardGrid } from '@/components/ui/MetricCard';
import { LineChartComponent, BarChartComponent } from '@/components/ui/Chart';
import {
  mockTwitterMetrics,
  getLatestMetrics,
  getPreviousMetrics,
  calculateGrowthRate,
} from '@/lib/data';
import { formatNumber } from '@/lib/utils';

export default function TwitterPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('month');

  const latest = getLatestMetrics(mockTwitterMetrics);
  const previous = getPreviousMetrics(mockTwitterMetrics);

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

  const chartData = getChartData(mockTwitterMetrics, period === 'week' ? 7 : 30);

  const followerGrowth = calculateGrowthRate(latest.followers, previous.followers);
  const impressionGrowth = calculateGrowthRate(latest.impressions, previous.impressions);
  const engagementGrowth = calculateGrowthRate(
    latest.engagementRate,
    previous.engagementRate
  );
  const videoViewGrowth = calculateGrowthRate(latest.videoViews, previous.videoViews);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title="X (Twitter) Analytics"
        subtitle="Detailed insights into your Twitter performance"
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
              Account Metrics
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
                title="Tweet Count"
                value={latest.tweetCount}
                previousValue={previous.tweetCount}
                trend="up"
                icon={<MessageCircle className="w-5 h-5" />}
              />
              <MetricCard
                title="Profile Visits"
                value={latest.profileVisits}
                previousValue={previous.profileVisits}
                trend="up"
                icon={<Eye className="w-5 h-5" />}
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
                title="Engagement Rate"
                value={latest.engagementRate}
                unit="%"
                percentChange={engagementGrowth}
                trend={engagementGrowth > 0 ? 'up' : 'down'}
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <MetricCard
                title="Likes"
                value={latest.likes}
                previousValue={previous.likes}
                trend="up"
                icon={<Heart className="w-5 h-5" />}
              />
              <MetricCard
                title="Retweets"
                value={latest.retweets}
                previousValue={previous.retweets}
                trend="up"
                icon={<Repeat2 className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>

          {/* Interaction metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Interaction Metrics
            </h2>
            <MetricCardGrid columns={4}>
              <MetricCard
                title="Replies"
                value={latest.replies}
                previousValue={previous.replies}
                trend="up"
                icon={<MessageCircle className="w-5 h-5" />}
              />
              <MetricCard
                title="Quote Tweets"
                value={latest.quoteTweets}
                previousValue={previous.quoteTweets}
                trend="up"
                icon={<Share2 className="w-5 h-5" />}
              />
              <MetricCard
                title="Link Clicks"
                value={latest.linkClicks}
                previousValue={previous.linkClicks}
                trend="up"
                icon={<Link2 className="w-5 h-5" />}
              />
              <MetricCard
                title="Video Views"
                value={latest.videoViews}
                percentChange={videoViewGrowth}
                trend={videoViewGrowth > 0 ? 'up' : 'down'}
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
              <LineChartComponent
                data={chartData}
                dataKeys={[
                  { key: 'impressions', name: 'Impressions', color: '#7C3AED' },
                ]}
                height={300}
              />
            </motion.div>

            {/* Engagement breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
            >
              <BarChartComponent
                data={chartData}
                dataKey="likes"
                title="Likes Trend"
                barColor="#F59E0B"
                height={300}
              />
            </motion.div>

            {/* Engagement rate */}
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
                    key: 'engagementRate',
                    name: 'Engagement Rate (%)',
                    color: '#10B981',
                  },
                ]}
                height={300}
              />
            </motion.div>
          </div>

          {/* Growth metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-heygen-white mb-4">
              Growth Metrics
            </h2>
            <MetricCardGrid columns={2}>
              <MetricCard
                title="Follower Growth Rate"
                value={latest.followerGrowthRate}
                unit="% per day"
                previousValue={previous.followerGrowthRate}
                trend="up"
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <MetricCard
                title="Total Engagement"
                value={
                  latest.likes +
                  latest.retweets +
                  latest.replies +
                  latest.quoteTweets
                }
                previousValue={
                  previous.likes +
                  previous.retweets +
                  previous.replies +
                  previous.quoteTweets
                }
                trend="up"
                icon={<Heart className="w-5 h-5" />}
              />
            </MetricCardGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
