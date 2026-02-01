import React from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';

interface RatingBadgeProps {
  rating: number;
  className?: string;
  showCount?: boolean;
  count?: number;
}

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, className, showCount, count }) => {
  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div className="flex items-center gap-1 bg-yellow-400 text-white px-2 py-0.5 rounded-md shadow-sm">
        <span className="font-bold text-sm">{rating.toFixed(1)}</span>
        <Star className="w-3 h-3 fill-current" />
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-zinc-500">({count})</span>
      )}
    </div>
  );
};

export default RatingBadge;
