import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin } from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-teal-900 text-white">
      {/* Background Image Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/800/1200?grayscale&blur=2" 
          alt="Baku Background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 text-center px-6 animate-fade-in-up">
        <div className="bg-white/10 p-4 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <MapPin className="w-12 h-12 text-teal-300" />
        </div>
        
        <h1 className="text-5xl font-black mb-2 tracking-tighter">تجوّل</h1>
        <p className="text-xl font-light text-teal-100 mb-8">مرحباً بكم في باكو</p>
        
        <p className="text-sm text-gray-300 mb-12 max-w-xs mx-auto leading-relaxed">
          دليلك العربي الشامل لأفضل العروض والمتاجر والمطاعم في قلب أذربيجان.
        </p>

        <button 
          onClick={() => setActiveView('app')}
          className="w-full max-w-xs bg-teal-400 hover:bg-teal-300 text-teal-950 text-lg font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all transform hover:scale-105 active:scale-95"
        >
          انتقل إلى العروض
        </button>

        <div className="mt-8 text-xs text-white/40">
           يتم تحديث العروض لحظياً
        </div>
      </div>
    </div>
  );
};