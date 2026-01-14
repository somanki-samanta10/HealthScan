import type { ProductResponse } from '@/lib/types';

export async function getProductData(
  barcode: string
): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );
    if (!response.ok) {
      console.error('Failed to fetch product data:', response.statusText);
      return {
        status: 0,
        product: null,
        error: 'The product database is currently unavailable. Please try again later.',
      };
    }
    const data = await response.json();
    if (data.status === 0 || !data.product) {
      return {
        status: 0,
        product: null,
        error: `Product with barcode "${barcode}" was not found.`,
      };
    }
    return { status: 1, product: data.product, error: null };
  } catch (error) {
    console.error('An unexpected error occurred while fetching product data:', error);
    return {
      status: 0,
      product: null,
      error: 'An unexpected error occurred. Please check your connection and try again.',
    };
  }
}
