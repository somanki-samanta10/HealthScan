export interface Product {
  _id: string;
  product_name: string;
  product_name_en: string;
  brands: string;
  image_url: string;
  ingredients_text: string;
  ingredients_text_en: string;
  nutriments: {
    [key: string]: string | number;
  };
}

export interface ProductResponse {
  status: 1 | 0;
  product: Product | null;
  error?: string | null;
}

export interface MockScanHistoryItem {
  barcode: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  healthScore: number;
}
