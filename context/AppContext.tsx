import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Offer, Category, MapFilters } from '../types';
import { INITIAL_OFFERS } from '../constants';

interface AppContextType {
  offers: Offer[];
  addOffer: (offer: Offer) => void;
  filters: MapFilters;
  toggleFilter: (category: Category) => void;
  toggleAllFilters: (show: boolean) => void;
  activeView: 'landing' | 'app' | 'merchant';
  setActiveView: (view: 'landing' | 'app' | 'merchant') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [activeView, setActiveView] = useState<'landing' | 'app' | 'merchant'>('landing');

  // Load from local storage on mount (simulating persistence)
  useEffect(() => {
    const savedOffers = localStorage.getItem('tajawal_offers');
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers));
    }
  }, []);

  // Save to local storage whenever offers change
  useEffect(() => {
    localStorage.setItem('tajawal_offers', JSON.stringify(offers));
  }, [offers]);

  const addOffer = (offer: Offer) => {
    setOffers((prev) => [offer, ...prev]);
  };

  const [filters, setFilters] = useState<MapFilters>({
    [Category.STORES]: true,
    [Category.TOURISM]: true,
    [Category.RESTAURANTS]: true,
    [Category.BEAUTY]: true,
  });

  const toggleFilter = (category: Category) => {
    setFilters((prev) => {
        // Requirements: "If user selects a category, hide all others."
        // Implementation: If clicking a category that is the ONLY one active, toggle it off (hide all).
        // If clicking a category while others are active or none, show ONLY that category.
        
        // However, standard filter behavior is usually toggle on/off.
        // Let's strictly follow requirement: "If user selects a category, hide all others."
        // This implies a radio-button like behavior, or "Focus Mode".
        // But we also need "Show All".
        
        // Let's implement a mix: clicking a filter button isolates it.
        const newState = {
            [Category.STORES]: false,
            [Category.TOURISM]: false,
            [Category.RESTAURANTS]: false,
            [Category.BEAUTY]: false,
        };
        newState[category] = true;
        return newState;
    });
  };

  const toggleAllFilters = (show: boolean) => {
    setFilters({
      [Category.STORES]: show,
      [Category.TOURISM]: show,
      [Category.RESTAURANTS]: show,
      [Category.BEAUTY]: show,
    });
  };

  return (
    <AppContext.Provider value={{ offers, addOffer, filters, toggleFilter, toggleAllFilters, activeView, setActiveView }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};