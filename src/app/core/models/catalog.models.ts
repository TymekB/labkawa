export type Material = 'krew' | 'mocz' | 'kał' | 'wymaz';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface LabTest {
  id: string;
  code: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  material: Material;
  turnaround: string;
  description: string;
  preparation: string;
  popular?: boolean;
}

export interface TestPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  categoryId: string;
  testCodes: string[];
  badge?: 'Bestseller' | 'Nowość' | 'Promocja';
  forWhom: string;
}

export interface CollectionPoint {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  openSaturday: boolean;
  homeService: boolean;
}
