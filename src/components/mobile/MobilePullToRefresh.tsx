
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

interface MobilePullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
}

const MobilePullToRefresh = ({ onRefresh, children, disabled = false }: MobilePullToRefreshProps) => {
  const { isRefreshing, isPulling, pullDistance, shouldTrigger } = usePullToRefresh({
    onRefresh,
    disabled
  });

  const pullProgress = Math.min(pullDistance / 80, 1);
  const indicatorOpacity = Math.min(pullDistance / 40, 1);

  return (
    <div className="mobile-pull-refresh relative">
      {/* Pull indicator */}
      <div 
        className={`mobile-pull-indicator ${isPulling ? 'active' : ''}`}
        style={{
          opacity: indicatorOpacity,
          transform: `translateX(-50%) translateY(${Math.min(pullDistance / 2, 30)}px)`
        }}
      >
        <RefreshCw 
          size={20} 
          className={`text-yrealty-accent transition-transform duration-200 ${
            isRefreshing ? 'animate-spin' : ''
          } ${shouldTrigger ? 'rotate-180' : ''}`}
          style={{
            transform: `rotate(${pullProgress * 180}deg)`
          }}
        />
      </div>

      {/* Content */}
      <div 
        style={{
          transform: isPulling ? `translateY(${Math.min(pullDistance / 3, 20)}px)` : 'translateY(0)',
          transition: isPulling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {children}
      </div>

      {/* Loading overlay */}
      {isRefreshing && (
        <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 flex items-center justify-center">
          <RefreshCw size={20} className="animate-spin text-yrealty-accent mr-2" />
          <span className="text-sm text-gray-600">Refreshing...</span>
        </div>
      )}
    </div>
  );
};

export default MobilePullToRefresh;
