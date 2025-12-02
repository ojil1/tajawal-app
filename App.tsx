import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingScreen } from './views/mobile/LandingScreen';
import { MapScreen } from './views/mobile/MapScreen';
import { MerchantDashboard } from './views/merchant/MerchantDashboard';

const Main: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  // Simple Router based on state
  const renderView = () => {
    switch (activeView) {
      case 'landing':
        return (
            <div className="relative">
                <LandingScreen />
                {/* Debug / Demo Switcher */}
                <div className="absolute top-4 right-4 z-50">
                    <button 
                        onClick={() => setActiveView('merchant')} 
                        className="bg-white/20 hover:bg-white/40 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/30 transition font-sans"
                    >
                        Merchant Login
                    </button>
                </div>
            </div>
        );
      case 'app':
        return <MapScreen />;
      case 'merchant':
        return <MerchantDashboard />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <div className="w-full h-full font-tajawal">
      {renderView()}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}