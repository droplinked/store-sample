import { apiClient } from './client';
import { Cart } from '@/lib/types';

export interface AddToCartParams {
  skuId: string;
  quantity: number;
}

export interface CreateCartParams {
  shopId: string;
  returnUrl: string;
}

/**
 * Fetch cart by ID
 */
export async function getCart(cartId: string): Promise<Cart> {
  const response = await apiClient.get<{ data: Cart } | Cart>(`/v2/carts/${cartId}`);
  
  // Handle different response structures
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response as Cart;
}

/**
 * Create a new cart
 */
export async function createCart(params: CreateCartParams): Promise<Cart> {
  const response = await apiClient.post<{ data: Cart } | Cart>('/v2/carts', params);
  
  // Handle different response structures
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response as Cart;
}

/**
 * Add product to cart
 */
export async function addProductToCart(
  cartId: string,
  params: AddToCartParams
): Promise<Cart> {
  const response = await apiClient.post<{ data: Cart } | Cart>(
    `/v2/carts/${cartId}/products`,
    params
  );
  
  // Handle different response structures
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response as Cart;
}

/**
 * Update product quantity in cart
 */
export async function updateCartProductQuantity(
  cartId: string,
  skuId: string,
  quantity: number
): Promise<Cart> {
  const response = await apiClient.patch<{ data: Cart } | Cart>(
    `/v2/carts/${cartId}/products/${skuId}`,
    { quantity }
  );
  
  // Handle different response structures
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response as Cart;
}

/**
 * Remove product from cart
 */
export async function removeCartProduct(
  cartId: string,
  skuId: string
): Promise<Cart> {
  const response = await apiClient.delete<{ data: Cart } | Cart>(
    `/v2/carts/${cartId}/products/${skuId}`
  );
  
  // Handle different response structures
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response as Cart;
}

/**
 * Delete entire cart
 */
export async function deleteCart(cartId: string): Promise<void> {
  await apiClient.delete(`/v2/carts/${cartId}`);
}
