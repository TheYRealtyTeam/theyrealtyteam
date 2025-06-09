
import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const MobileOfflineIndicator = () => {
  const { isOffline } = usePWA();

  if (!isOffline) return null;

  return (
    <div className="fixed top-20 left-4 right-4 bg-orange-100 border border-orange-200 rounded-lg p-3 z-40 animate-slide-up">
      <div className="flex items-center gap-2">
        <WifiOff className="h-4 w-4 text-orange-600" />
        <span className="text-sm font-medium text-orange-800">
          You're offline
        </span>
        <span className="text-xs text-orange-600 ml-auto">
          Some features may be limited
        </span>
      </div>
    </div>
  );
};

export default MobileOfflineIndicator;
