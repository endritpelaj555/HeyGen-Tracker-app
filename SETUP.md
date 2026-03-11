# HeyGen Social Media Tracker - Setup Guide

## Overview
A comprehensive Next.js 14 application for HeyGen's marketing team to track and analyze social media metrics across Twitter (X), LinkedIn, and HeyGen's own platforms.

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Protected dashboard layout with sidebar
│   │   ├── admin/            # Admin panel - user management
│   │   ├── dashboard/        # Main overview dashboard
│   │   ├── heygen/           # HeyGen API analytics
│   │   ├── linkedin/         # LinkedIn analytics
│   │   ├── manual-entry/     # Manual data entry form
│   │   ├── reports/          # Report generation & export
│   │   ├── settings/         # Settings & API key management
│   │   ├── twitter/          # X (Twitter) analytics
│   │   └── layout.tsx        # Dashboard layout wrapper
│   ├── api/
│   │   └── auth/[...nextauth]/ # NextAuth.js authentication
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Login page
│   └── globals.css           # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Top navigation header
│   │   └── Sidebar.tsx       # Navigation sidebar
│   └── ui/
│       ├── Chart.tsx         # Recharts components
│       └── MetricCard.tsx    # Metric display cards
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   ├── data.ts              # Mock data & types
│   └── utils.ts             # Utility functions
├── .env.local               # Environment variables
└── package.json
```

## Quick Start

### Prerequisites
- Node.js 18+ (project uses Next.js 16.1.6)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Login Credentials

Demo accounts (password: `heygen2024`):
- **Admin**: admin@heygen.com
- **Editor**: editor@heygen.com
- **Viewer**: viewer@heygen.com

## Features

### Authentication
- NextAuth.js with credentials provider
- Role-based access control (Admin, Editor, Viewer)
- Session management with JWT

### Dashboard
- Real-time metric cards with trend indicators
- Multi-platform data visualization
- Period comparison (weekly vs monthly)
- Responsive design with Tailwind CSS

### Platform Analytics
1. **X (Twitter)**
   - Followers, following, tweet count
   - Impressions, engagement rate, profile visits
   - Likes, retweets, replies, quote tweets
   - Video views and link clicks
   - Follower growth tracking

2. **LinkedIn**
   - Page metrics (followers, visits, impressions)
   - Engagement metrics (comments, shares, reactions)
   - Reaction breakdown (like, celebrate, support, love, insightful, curious)
   - Click-through rate and video performance
   - Organic vs paid reach analytics

3. **HeyGen API**
   - Video views and avatar views
   - Video engagement metrics
   - AI video creation statistics
   - Average view duration
   - New avatar creation tracking

### Manual Data Entry
- Form-based metric submission
- File upload (images/videos)
- CSV export functionality
- Historical data tracking

### Reports
- Weekly and monthly report generation
- PDF and CSV export options
- Period-based filtering
- Platform performance breakdown
- Metric comparisons

### Admin Panel
- User management interface
- Role assignment and modification
- System information dashboard
- Activity monitoring

### Settings
- HeyGen API key management
- Notification preferences (weekly, daily, alerts)
- Privacy and data sharing controls
- Account security settings

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **Recharts** (data visualization)

### Forms & Validation
- **React Hook Form**
- **Zod** (schema validation)
- **React Dropzone** (file uploads)

### Authentication
- **NextAuth.js 4.24**
- **JWT sessions**

### UI Components
- **Lucide React** (icons)
- **Radix UI** (headless components)

### Export Functionality
- **jsPDF** (PDF generation)
- **html2canvas** (HTML to image)
- **XLSX** (Excel/CSV generation)

### Notifications
- **React Hot Toast**

## Styling & Design

### HeyGen Brand Colors
- Primary Teal: `#00C2B2`
- Purple Accent: `#7C3AED`
- Dark Background: `#0A0A0F`
- Light Text: `#F9FAFB`
- Muted Text: `#6B7280`
- Success (Green): `#10B981`
- Alert (Red): `#EF4444`

### Design System
- Dark theme optimized for 12+ hours of daily use
- Consistent spacing and typography
- Smooth hover states and transitions
- Gradient accents with HeyGen colors
- Card-based layout with subtle borders

## Data Structure

All mock data includes:
- **12 months of historical data** with realistic trends
- **Seasonal variations** in metrics
- **Growth patterns** and engagement curves
- **Believable numbers** based on actual platform scales

### Example Metric Types
- Absolute counts (followers, views, likes)
- Percentages (engagement rate, CTR)
- Aggregations (total engagements, combined reach)
- Growth metrics (daily/weekly/monthly changes)

## Environment Variables

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=heygen-secret-key-2024-super-secure
NEXT_PUBLIC_HEYGEN_API_URL=https://api.heygen.com/v1
HEYGEN_API_KEY=demo_key_123456789
NEXT_PUBLIC_APP_NAME=HeyGen Social Tracker
NEXT_PUBLIC_APP_ENVIRONMENT=development
NEXT_PUBLIC_ENABLE_MANUAL_ENTRY=true
NEXT_PUBLIC_ENABLE_REPORTS=true
NEXT_PUBLIC_ENABLE_ADMIN_PANEL=true
```

## Key Components Explained

### MetricCard
Reusable component for displaying metrics with:
- Title and value
- Trend indicators (↑/↓)
- Percentage changes
- Icon support
- Compact and default variants

### Charts
Recharts-based visualization components:
- `LineChartComponent` - Trend lines
- `AreaChartComponent` - Filled area charts
- `BarChartComponent` - Bar comparisons
- `PieChartComponent` - Breakdown visualization

### Sidebar
Responsive navigation with:
- HeyGen logo and branding
- Dynamic menu items based on user role
- Mobile menu toggle
- Active page highlighting

### Header
Top navigation featuring:
- Page title and subtitle
- User profile dropdown
- Notification bell
- Optional date picker
- Logout button

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (sidebar collapses)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (full layout)

## Performance Optimizations

- Server components where possible
- Client components only where needed
- Image optimization with Next.js
- CSS-in-JS with Tailwind (automatic purging)
- Code splitting at route level
- Lazy loading of charts and visualizations

## Deployment

### Vercel
The project includes `vercel.json` configuration for seamless Vercel deployment:

```bash
vercel deploy
```

### Other Platforms
Works with any Node.js hosting:
- Docker compatible
- Requires `npm run build` and `npm start`

## Development Notes

### Adding New Pages
1. Create directory in `src/app/(dashboard)/[name]/`
2. Add `page.tsx` component
3. Import and use `Header` component
4. Add navigation item to `Sidebar.tsx`

### Adding New Metrics
1. Extend types in `src/lib/data.ts`
2. Add mock data generation
3. Create new page with `MetricCard` components
4. Add chart visualizations

### Customizing Colors
Edit `tailwind.config.ts` in the `heygen` color palette section.

## Troubleshooting

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### Auth Issues
- Check `NEXTAUTH_SECRET` is set in `.env.local`
- Ensure `NEXTAUTH_URL` matches your domain

### Database (If Using)
This demo uses mock data. For real data, connect a database like:
- PostgreSQL + Prisma
- MongoDB + Mongoose
- Firebase

## License
Internal HeyGen tool

## Support
For issues or questions, contact the HeyGen marketing team.
