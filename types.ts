export enum Category {
  STORES = 'STORES',
  TOURISM = 'TOURISM',
  RESTAURANTS = 'RESTAURANTS',
  BEAUTY = 'BEAUTY',
}

export interface Offer {
  id: string;
  storeName: string;
  address: string;
  category: Category;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  startDate: string; // ISO String
  endDate: string;   // ISO String
  isActive: boolean;
  distance?: string; // Calculated at runtime
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
}

export interface MapFilters {
  [Category.STORES]: boolean;
  [Category.TOURISM]: boolean;
  [Category.RESTAURANTS]: boolean;
  [Category.BEAUTY]: boolean;
}