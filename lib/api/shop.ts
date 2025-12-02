/**
 * Shop API Service
 * 
 * @module lib/api/shop
 * @description
 * Provides functions to interact with Droplinked Shop API endpoints.
 * Handles shop configuration, settings, and metadata retrieval.
 * 
 * @see {@link https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-api/api-reference/shop API Documentation}
 * 
 */

import { apiClient } from './client';
import type { Shop, ApiResponse } from '@/lib/types';
import { ShopSchema } from '@/lib/types/shop';


/**
 * Get Shop by Name
 * 
 * @async
 * @function getShopByName
 * @description
 * Retrieves shop configuration using the shop name/slug.
 * This is the most common method for accessing shop data.
 * 
 * @param {string} shopName - The shop identifier (slug)
 * @returns {Promise<Shop>} Shop configuration and settings
 * 
 * @throws {Error} If shop not found
 * 
 * @api GET /shops/v2/public/name/{name}
 */
export async function getShopByName(shopName: string): Promise<Shop> {
  const response = await apiClient.get<any>(
    `/shops/v2/public/name/${shopName}`
  );


  // Handle different response structures
  let shopData: any;
  if (response?.data) {
    shopData = response.data;
  } else {
    shopData = response;
  }


  // Validate response with Zod schema
  const result = ShopSchema.safeParse(shopData);
  
  if (!result.success) {
    // Return data anyway for now
    return shopData as Shop;
  }

  return result.data;
}