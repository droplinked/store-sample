/**
 * Product API Service
 * 
 * @module lib/api/products
 * @description
 * Provides functions to interact with Droplinked Product API endpoints.
 * Handles product browsing, searching, filtering, and detail retrieval.
 * 
 * @see {@link https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/api-reference/product API Documentation}
 * 
 */

import {
  type Product,
  type ProductListItem,
  type ApiResponse,
  type PaginatedResponse,
  ProductListItemSchema,
  ProductSchema,
} from '@/lib/types';
import { PaginatedResponseSchema } from '@/lib/types/common';
import { apiClient } from './client';

/**
 * Product list filter options
 * 
 * @interface ProductFilters
 * @property {number} [page=1] - Page number for pagination
 * @property {number} [limit=20] - Items per page
 * @property {string} [collectionId] - Filter by collection ID
 * @property {Array} [types] - Product types: 'digital', 'normal', or 'pod'
 * @property {number} [minPrice] - Minimum price filter
 * @property {number} [maxPrice] - Maximum price filter
 * @property {string[]} [tags] - Filter by product tags
 * @property {string} [search] - Search term for product name/description
 */
export interface ProductFilters {
  page?: number;
  limit?: number;
  collectionId?: string;
  types?: ('digital' | 'normal' | 'pod')[];
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
}

/**
 * Get Products with Filters
 * 
 * @async
 * @function getProducts
 * @description
 * Retrieves a paginated list of products for a shop with optional filtering.
 * Supports search, price range, collection, and type filters.
 * 
 * @param {string} shopName - The shop identifier (slug)
 * @param {ProductFilters} [filters={}] - Optional filter parameters
 * @returns {Promise<PaginatedResponse<ProductListItem>>} Paginated product list
 * 
 * @throws {Error} If shop not found or API request fails
 * 
 * @api GET /product/public/shop/{shopName}
 */
export async function getProducts(
  shopName: string,
  filters: ProductFilters = {}
): Promise<PaginatedResponse<ProductListItem>> {
  // Build query parameters
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.collectionId) params.append('collectionId', filters.collectionId);
  if (filters.types) params.append('types', JSON.stringify(filters.types));
  if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.tags) params.append('tags', JSON.stringify(filters.tags));
  if (filters.search) params.append('search', filters.search);

  // Add shopName to query params as requested
  params.append('shopName', shopName);

  const queryString = params.toString();
  const endpoint = `/product-v2/public/shop/${shopName}${queryString ? `?${queryString}` : ''}`;

  const response = await apiClient.get<any>(endpoint);


  // Handle different response structures
  let productsData: ProductListItem[] = [];
  let totalDocs = 0;
  let currentPage = 1;
  let itemLimit = filters.limit || 20;
  let hasNext = false;

  // Check if response has the expected structure
  if (response?.data?.data) {
    // Nested data structure
    productsData = response.data.data;
    totalDocs = response.data.totalDocuments || 0;
    currentPage = response.data.currentPage || 1;
    itemLimit = response.data.limit || itemLimit;
    hasNext = response.data.hasNextPage || false;
  } else if (response?.data && Array.isArray(response.data)) {
    // Direct array in data
    productsData = response.data;
    totalDocs = response.data.length;
  } else if (Array.isArray(response)) {
    // Direct array response
    productsData = response;
    totalDocs = response.length;
  } else {
    productsData = [];
  }

  // Transform to PaginatedResponse format
  const paginatedResponse: PaginatedResponse<ProductListItem> = {
    data: productsData,
    total: totalDocs,
    page: currentPage,
    limit: itemLimit,
    hasMore: hasNext,
  };


  return paginatedResponse;
}

/**
 * Get Product by Slug
 * 
 * @async
 * @function getProductBySlug
 * @description
 * Retrieves detailed product information using the product's unique slug.
 * Returns full product data including variants, images, and pricing.
 * 
 * @param {string} slug - The product slug (URL-friendly identifier)
 * @returns {Promise<Product>} Complete product details
 * 
 * @throws {Error} If product not found or API request fails
 * 
 * @api GET /product-v2/public/by-slug/{slug}
 */
export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await apiClient.get<any>(
    `/product-v2/public/by-slug/${slug}`
  );


  // Handle different response structures
  let productData: any;

  if (response?.data) {
    productData = response.data;
  } else {
    productData = response;
  }


  // Validate response with Zod schema (use safeParse to handle validation errors gracefully)
  const result = ProductSchema.safeParse(productData);
  
  if (!result.success) {
    // Return data anyway for now to see what's happening
    return productData as Product;
  }
  
  return result.data;
}

/**
 * Get Featured Products
 * 
 * @async
 * @function getFeaturedProducts
 * @description
 * Retrieves a limited number of featured products for display on the homepage.
 * Products are typically curated/highlighted by the shop owner.
 * This is a convenience function that fetches products with a limit.
 * 
 * @param {number} count - Number of featured products to return (default: 4)
 * @param {string} [shopName] - The shop identifier (optional, uses env var if not provided)
 * @returns {Promise<ProductListItem[]>} Array of featured products
 * 
 * @api GET /product/public/shop/{shopName}?limit={count}
 */
export async function getFeaturedProducts(
  count: number = 4,
  shopName?: string
): Promise<ProductListItem[]> {
  const shop = shopName || process.env.NEXT_PUBLIC_SHOP_NAME;
  
  if (!shop) {
    throw new Error(
      'Shop name is required. Please provide shopName parameter or set NEXT_PUBLIC_SHOP_NAME environment variable.'
    );
  }
  
  const response = await getProducts(shop, {
    page: 1,
    limit: count,
  });

  return response.data;
}

