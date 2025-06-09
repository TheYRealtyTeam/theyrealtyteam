
import React, { useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const MobilePWAPrompt = () => {
  const { isInstallable, promptInstall } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  const handleInstall = async () => {
    const success = await promptInstall();
    if (success) {
      setIsDismissed(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-30 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="bg-yrealty-accent/10 p-2 rounded-lg flex-shrink-0">
          <Smartphone className="h-5 w-5 text-yrealty-accent" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">
            Install Y Realty App
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            Get faster access and offline features
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="bg-yrealty-accent text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1 mobile-haptic-btn"
            >
              <Download size={14} />
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-gray-500 px-3 py-2 rounded-lg text-xs font-medium mobile-haptic-btn"
            >
              Not now
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="text-gray-400 p-1 hover:text-gray-600 mobile-haptic-btn"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default MobilePWAPrompt;
