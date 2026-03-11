// Types
export interface TwitterMetrics {
  followers: number;
  following: number;
  tweetCount: number;
  impressions: number;
  engagementRate: number;
  profileVisits: number;
  linkClicks: number;
  likes: number;
  retweets: number;
  replies: number;
  quoteTweets: number;
  videoViews: number;
  followerGrowthRate: number;
  date: string;
}

export interface LinkedInMetrics {
  followers: number;
  following: number;
  pageViews: number;
  uniqueVisitors: number;
  impressions: number;
  uniqueImpressions: number;
  engagements: number;
  engagementRate: number;
  clicks: number;
  ctr: number;
  reactions: {
    like: number;
    celebrate: number;
    support: number;
    love: number;
    insightful: number;
    curious: number;
  };
  comments: number;
  shares: number;
  videoViews: number;
  date: string;
}

export interface HeyGenMetrics {
  videoViews: number;
  avatarViews: number;
  videoEngagements: number;
  aiVideoCreations: number;
  averageViewDuration: number;
  newAvatars: number;
  date: string;
}

export interface Post {
  id: string;
  platform: 'twitter' | 'linkedin' | 'heygen';
  title: string;
  content: string;
  mediaUrl?: string;
  likes: number;
  shares: number;
  comments: number;
  views: number;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  lastLogin?: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'weekly' | 'monthly';
  period: string;
  createdAt: string;
  data: {
    twitter: TwitterMetrics[];
    linkedin: LinkedInMetrics[];
    heygen: HeyGenMetrics[];
  };
}

// Generate realistic mock data for the last 12 months
function generateMockTwitterMetrics(): TwitterMetrics[] {
  const data: TwitterMetrics[] = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Create realistic trending data
    const baseFollowers = 45000 + (i * 50) + Math.sin(i / 50) * 5000;
    const baseTweets = 2100 + (i * 2);

    data.push({
      followers: Math.floor(baseFollowers),
      following: 1200,
      tweetCount: Math.floor(baseTweets),
      impressions: Math.floor(50000 + Math.sin(i / 30) * 20000 + Math.random() * 10000),
      engagementRate: Number((2.5 + Math.sin(i / 60) * 1.2 + Math.random() * 0.5).toFixed(2)),
      profileVisits: Math.floor(3000 + Math.sin(i / 40) * 1500 + Math.random() * 500),
      linkClicks: Math.floor(800 + Math.sin(i / 35) * 400 + Math.random() * 200),
      likes: Math.floor(2500 + Math.sin(i / 50) * 1200 + Math.random() * 600),
      retweets: Math.floor(600 + Math.sin(i / 45) * 300 + Math.random() * 150),
      replies: Math.floor(400 + Math.sin(i / 50) * 200 + Math.random() * 100),
      quoteTweets: Math.floor(200 + Math.sin(i / 55) * 100 + Math.random() * 50),
      videoViews: Math.floor(8000 + Math.sin(i / 30) * 4000 + Math.random() * 2000),
      followerGrowthRate: Number((0.8 + Math.sin(i / 70) * 0.4 + Math.random() * 0.2).toFixed(2)),
      date: date.toISOString().split('T')[0],
    });
  }

  return data;
}

function generateMockLinkedInMetrics(): LinkedInMetrics[] {
  const data: LinkedInMetrics[] = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const baseFollowers = 28000 + (i * 35) + Math.sin(i / 50) * 3000;

    data.push({
      followers: Math.floor(baseFollowers),
      following: 850,
      pageViews: Math.floor(12000 + Math.sin(i / 30) * 5000 + Math.random() * 2000),
      uniqueVisitors: Math.floor(5000 + Math.sin(i / 40) * 2000 + Math.random() * 1000),
      impressions: Math.floor(35000 + Math.sin(i / 35) * 15000 + Math.random() * 5000),
      uniqueImpressions: Math.floor(20000 + Math.sin(i / 40) * 8000 + Math.random() * 3000),
      engagements: Math.floor(1800 + Math.sin(i / 40) * 800 + Math.random() * 300),
      engagementRate: Number((4.2 + Math.sin(i / 55) * 1.5 + Math.random() * 0.6).toFixed(2)),
      clicks: Math.floor(450 + Math.sin(i / 45) * 200 + Math.random() * 100),
      ctr: Number((1.2 + Math.sin(i / 50) * 0.4 + Math.random() * 0.2).toFixed(2)),
      reactions: {
        like: Math.floor(800 + Math.sin(i / 50) * 300),
        celebrate: Math.floor(200 + Math.sin(i / 60) * 80),
        support: Math.floor(400 + Math.sin(i / 55) * 150),
        love: Math.floor(300 + Math.sin(i / 65) * 120),
        insightful: Math.floor(500 + Math.sin(i / 48) * 200),
        curious: Math.floor(250 + Math.sin(i / 52) * 100),
      },
      comments: Math.floor(350 + Math.sin(i / 45) * 150 + Math.random() * 75),
      shares: Math.floor(280 + Math.sin(i / 50) * 120 + Math.random() * 60),
      videoViews: Math.floor(12000 + Math.sin(i / 32) * 5000 + Math.random() * 2000),
      date: date.toISOString().split('T')[0],
    });
  }

  return data;
}

function generateMockHeyGenMetrics(): HeyGenMetrics[] {
  const data: HeyGenMetrics[] = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      videoViews: Math.floor(25000 + Math.sin(i / 30) * 12000 + Math.random() * 5000),
      avatarViews: Math.floor(18000 + Math.sin(i / 40) * 8000 + Math.random() * 3000),
      videoEngagements: Math.floor(3200 + Math.sin(i / 35) * 1500 + Math.random() * 700),
      aiVideoCreations: Math.floor(45 + Math.sin(i / 50) * 20 + Math.random() * 10),
      averageViewDuration: Number((4.2 + Math.sin(i / 45) * 1.5 + Math.random() * 0.8).toFixed(1)),
      newAvatars: Math.floor(8 + Math.sin(i / 60) * 3 + Math.random() * 2),
      date: date.toISOString().split('T')[0],
    });
  }

  return data;
}

function generateMockPosts(): Post[] {
  const posts: Post[] = [];
  const platforms: Array<'twitter' | 'linkedin' | 'heygen'> = ['twitter', 'linkedin', 'heygen'];
  const titles = {
    twitter: [
      'Excited to announce new AI features!',
      'Join us for a live demo today',
      'Check out our latest case study',
      'HeyGen is transforming video creation',
      'New avatar templates available now',
      'AI video generation just got faster',
      'Meet our newest avatars',
      'Enterprise features launched',
    ],
    linkedin: [
      'The future of AI video is here',
      'How HeyGen is revolutionizing content creation',
      'Leadership insights: Building with AI',
      'Celebrating 1M+ creators on HeyGen',
      'Thoughts on AI in marketing',
      'Behind the scenes at HeyGen',
      'Customer success story: 10x faster content',
      'The economics of AI-generated video',
    ],
    heygen: [
      'New avatar with realistic expressions',
      'Video library growth milestone',
      'Avatar customization options expanded',
      'Performance improvements released',
      'Beta: Custom voice training',
      'New integration partners announced',
      'API enhancements for developers',
      'Avatar rendering speed doubled',
    ],
  };

  const today = new Date();
  let postIndex = 0;

  for (let i = 0; i < 30; i++) {
    const platform = platforms[postIndex % 3];
    const date = new Date(today);
    date.setDate(date.getDate() - i * 3);

    const titleList = titles[platform];
    const title = titleList[i % titleList.length];

    posts.push({
      id: `post-${i}`,
      platform,
      title,
      content: `This is a sample post about ${platform} analytics and engagement metrics. ${title}. We're seeing strong engagement from our audience on this topic.`,
      likes: Math.floor(500 + Math.random() * 3000),
      shares: Math.floor(100 + Math.random() * 1000),
      comments: Math.floor(50 + Math.random() * 500),
      views: Math.floor(5000 + Math.random() * 50000),
      date: date.toISOString().split('T')[0],
    });

    postIndex++;
  }

  return posts;
}

export const mockTwitterMetrics = generateMockTwitterMetrics();
export const mockLinkedInMetrics = generateMockLinkedInMetrics();
export const mockHeyGenMetrics = generateMockHeyGenMetrics();
export const mockPosts = generateMockPosts();

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@heygen.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'editor@heygen.com',
    name: 'Marketing Editor',
    role: 'editor',
    createdAt: '2024-02-01T14:20:00Z',
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    email: 'viewer@heygen.com',
    name: 'Analytics Viewer',
    role: 'viewer',
    createdAt: '2024-02-15T09:15:00Z',
    lastLogin: new Date(Date.now() - 172800000).toISOString(),
  },
];

// Utility functions for data
export function getLatestMetrics(metrics: any[]) {
  return metrics[metrics.length - 1];
}

export function getPreviousMetrics(metrics: any[]) {
  return metrics[Math.max(0, metrics.length - 8)]; // Week ago
}

export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
}

export function getMetricChange(current: number, previous: number): string {
  const change = current - previous;
  if (change > 0) return `+${change.toLocaleString()}`;
  if (change < 0) return `-${Math.abs(change).toLocaleString()}`;
  return '0';
}

export function getMetricChangePercent(current: number, previous: number): string {
  if (previous === 0) return '0%';
  const change = ((current - previous) / previous) * 100;
  if (change > 0) return `+${change.toFixed(1)}%`;
  if (change < 0) return `${change.toFixed(1)}%`;
  return '0%';
}

export function isPositiveChange(current: number, previous: number): boolean {
  return current >= previous;
}
