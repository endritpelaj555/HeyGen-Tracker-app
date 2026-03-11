'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  previousValue?: number;
  percentChange?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact';
  showPercentage?: boolean;
}

export function MetricCard({
  title,
  value,
  unit = '',
  previousValue,
  percentChange,
  trend,
  icon,
  className,
  variant = 'default',
  showPercentage = true,
}: MetricCardProps) {
  const isPositive = trend === 'up' || (percentChange !== undefined && percentChange >= 0);
  const isTrendVisible = trend !== 'neutral' && trend !== undefined;

  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'rounded-lg border border-heygen-dark-5 bg-gradient-to-br from-heygen-dark-2 to-heygen-dark-3 transition-all hover:border-heygen-teal hover:shadow-heygen-sm',
        variant === 'default' ? 'p-6' : 'p-4',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={cn(
              'text-heygen-gray mb-2',
              variant === 'default' ? 'text-sm font-medium' : 'text-xs font-medium'
            )}
          >
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                'font-bold text-heygen-white',
                variant === 'default' ? 'text-3xl' : 'text-2xl'
              )}
            >
              {formattedValue}
            </span>
            {unit && (
              <span className="text-heygen-gray text-sm font-medium">{unit}</span>
            )}
          </div>

          {/* Trend information */}
          {(isTrendVisible || previousValue !== undefined) && (
            <div
              className={cn(
                'flex items-center gap-1 mt-3 text-sm',
                isPositive ? 'text-heygen-green' : 'text-heygen-red'
              )}
            >
              {isTrendVisible && (
                <>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {isPositive ? '+' : '-'}
                    {showPercentage && percentChange !== undefined
                      ? `${Math.abs(percentChange).toFixed(1)}%`
                      : previousValue !== undefined
                        ? formatNumber(Math.abs(typeof value === 'number' ? value - previousValue : 0))
                        : '0%'}
                  </span>
                </>
              )}
              {previousValue !== undefined && !isTrendVisible && (
                <span className="text-heygen-gray text-xs">
                  vs {formatNumber(previousValue)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0 ml-4 p-2 rounded-lg bg-heygen-dark-4 border border-heygen-dark-5 text-heygen-teal">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function MetricCardGrid({
  children,
  columns = 3,
}: {
  children: React.ReactNode;
  columns?: number;
}) {
  return (
    <div
      className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`}
    >
      {children}
    </div>
  );
}
