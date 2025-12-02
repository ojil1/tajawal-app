import { Category, Offer } from './types';
import { ShoppingBag, Plane, Utensils, Sparkles } from 'lucide-react';

export const BAKU_CENTER = [40.4093, 49.8671]; // Latitude, Longitude

export const CATEGORY_CONFIG = {
  [Category.STORES]: {
    label: 'متاجر',
    color: '#EAB308', // Yellow-500
    icon: ShoppingBag,
    markerClass: 'bg-yellow-500',
  },
  [Category.TOURISM]: {
    label: 'سياحة',
    color: '#3B82F6', // Blue-500
    icon: Plane,
    markerClass: 'bg-blue-500',
  },
  [Category.RESTAURANTS]: {
    label: 'مطاعم',
    color: '#22C55E', // Green-500
    icon: Utensils,
    markerClass: 'bg-green-500',
  },
  [Category.BEAUTY]: {
    label: 'تجميل',
    color: '#854d0e', // Amber-900 (Brown-ish)
    icon: Sparkles,
    markerClass: 'bg-[#854d0e]',
  },
};

export const INITIAL_OFFERS: Offer[] = [
  {
    id: '1',
    storeName: 'مطعم الشاذلي',
    address: 'Nizami St, Baku',
    category: Category.RESTAURANTS,
    description: 'خصم 20% على جميع المشويات العربية الأصيلة. استمتع بأجواء باكو الساحرة.',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    lat: 40.3700,
    lng: 49.8400,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    isActive: true,
  },
  {
    id: '2',
    storeName: 'باكو مول',
    address: 'Neftchilar Ave, Baku',
    category: Category.STORES,
    description: 'تخفيضات موسمية كبرى! اشتري قطعة واحصل على الثانية مجاناً.',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    lat: 40.3750,
    lng: 49.8500,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    isActive: true,
  },
  {
    id: '3',
    storeName: 'رحلات القوقاز',
    address: 'Heydar Aliyev Ave, Baku',
    category: Category.TOURISM,
    description: 'جولة سياحية شاملة في المدينة القديمة مع مرشد عربي.',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    lat: 40.4000,
    lng: 49.8700,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    isActive: true,
  },
];
