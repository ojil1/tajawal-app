import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { BAKU_CENTER, CATEGORY_CONFIG } from '../../constants';
import { Category, Offer } from '../../types';
import { Share2, Car, Search, X, MapPin } from 'lucide-react';
import clsx from 'clsx';

export const MapScreen: React.FC = () => {
  const { offers, filters, toggleFilter, toggleAllFilters, setActiveView } = useApp();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  // Get visible offers based on filters
  const visibleOffers = offers.filter(o => filters[o.category]);

  const createIcon = (category: Category) => {
    const config = CATEGORY_CONFIG[category];
    return L.divIcon({
      className: 'bg-transparent',
      html: `<div class="w-8 h-8 rounded-full border-2 border-white shadow-lg ${config.markerClass} flex items-center justify-center text-white">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                 <circle cx="12" cy="12" r="3"></circle>
               </svg>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const handleShare = (offer: Offer) => {
    if (navigator.share) {
      navigator.share({
        title: offer.storeName,
        text: offer.description,
        url: window.location.href,
      });
    } else {
      alert("تم نسخ الرابط!");
    }
  };

  const handleBolt = (offer: Offer) => {
    // Deep link or web link
    window.open(`https://bolt.eu/`, '_blank');
  };

  useEffect(() => {
    // Mock Geolocation for distance calculation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  return (
    <div className="h-screen w-full flex flex-col relative bg-gray-50">
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 pointer-events-none">
        <div className="flex justify-between items-start">
           <div className="pointer-events-auto bg-white/90 backdrop-blur shadow-lg rounded-2xl p-2 flex gap-2">
             <button onClick={() => toggleAllFilters(true)} className="px-3 py-1.5 text-xs font-bold bg-teal-100 text-teal-800 rounded-lg">الكل</button>
             <button onClick={() => toggleAllFilters(false)} className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-600 rounded-lg">إخفاء</button>
           </div>
           
           <button onClick={() => setActiveView('landing')} className="pointer-events-auto bg-white/90 backdrop-blur shadow-lg w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
             <X className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Map Area - 2/3 of screen roughly, but here we make it flex-grow */}
      <div className="flex-grow relative z-0">
        <MapContainer 
          center={BAKU_CENTER} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          {visibleOffers.map(offer => (
            <Marker 
              key={offer.id} 
              position={[offer.lat, offer.lng]}
              icon={createIcon(offer.category)}
              eventHandlers={{
                click: () => {
                   setSelectedOffer(offer);
                },
              }}
            />
          ))}
          {/* Zoom Control Custom Position if needed, or just rely on pinch */}
        </MapContainer>
      </div>

      {/* Categories Filter Bar - Horizontal Scroll */}
      <div className="bg-white border-t border-gray-100 p-3 shadow-lg z-10">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-1">
          {Object.values(Category).map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            const isActive = filters[cat];
            const Icon = config.icon;
            
            return (
              <button
                key={cat}
                onClick={() => toggleFilter(cat)}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border",
                  isActive 
                    ? `bg-gray-900 text-white border-gray-900 shadow-md transform scale-105` 
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                )}
              >
                <Icon className={clsx("w-4 h-4", isActive ? "text-white" : config.markerClass.replace('bg-', 'text-'))} />
                <span className="text-sm font-bold">{config.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white pb-6 pt-2 px-4 shadow-lg z-10 flex gap-4">
        <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
            <Search className="w-5 h-5" />
            أحدث العروض
        </button>
        <button 
           onClick={() => window.open('https://bolt.eu', '_blank')}
           className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
        >
            <Car className="w-5 h-5" />
            اطلب Bolt
        </button>
      </div>

      {/* Offer Popup / Bottom Sheet */}
      {selectedOffer && (
        <div className="absolute inset-0 z-[2000] flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOffer(null)}>
           <div 
             className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up"
             onClick={e => e.stopPropagation()}
           >
              <div className="h-48 relative">
                 <img src={selectedOffer.imageUrl} alt={selectedOffer.storeName} className="w-full h-full object-cover" />
                 <button 
                   onClick={() => setSelectedOffer(null)}
                   className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur hover:bg-black/70"
                 >
                   <X className="w-5 h-5" />
                 </button>
                 <div className={clsx("absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm", CATEGORY_CONFIG[selectedOffer.category].markerClass)}>
                    {CATEGORY_CONFIG[selectedOffer.category].label}
                 </div>
              </div>

              <div className="p-6">
                 <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedOffer.storeName}</h2>
                 <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                   <MapPin className="w-3 h-3" />
                   {selectedOffer.address}
                   <span className="text-teal-600 text-xs bg-teal-50 px-1 rounded ml-2">Verified</span>
                 </p>

                 <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-6">
                    <p className="text-amber-900 text-lg leading-relaxed font-medium text-center">
                      "{selectedOffer.description}"
                    </p>
                 </div>

                 <div className="flex justify-between items-center text-xs text-gray-400 mb-6">
                    <span>صالح حتى: {new Date(selectedOffer.endDate).toLocaleDateString('ar-EG')}</span>
                    {userLocation && (
                       <span>المسافة: 2.3 كم</span> 
                    )}
                 </div>

                 <div className="flex gap-3">
                    <button 
                      onClick={() => handleBolt(selectedOffer)}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                    >
                      <Car className="w-5 h-5" />
                      تاكسي Bolt
                    </button>
                    <button 
                      onClick={() => handleShare(selectedOffer)}
                      className="w-14 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-200"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};