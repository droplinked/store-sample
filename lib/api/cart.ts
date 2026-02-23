import { apiClient } from './client';
import { Cart } from '@/lib/types';
import { validateCartId, validateSkuId } from '@/lib/utils/validation';

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
  // Validate cartId parameter before use (MED-2)
  const validatedCartId = validateCartId(cartId);
  
  const response = await apiClient.get<{ data: Cart } | Cart>(`/v2/carts/${validatedCartId}`);
  
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
  // Validate parameters before use (MED-2)
  const validatedCartId = validateCartId(cartId);
  const validatedSkuId = validateSkuId(params.skuId);
  
  const response = await apiClient.post<{ data: Cart } | Cart>(
    `/v2/carts/${validatedCartId}/products`,
    { ...params, skuId: validatedSkuId }
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
  // Validate parameters before use (MED-2)
  const validatedCartId = validateCartId(cartId);
  const validatedSkuId = validateSkuId(skuId);
  
  const response = await apiClient.patch<{ data: Cart } | Cart>(
    `/v2/carts/${validatedCartId}/products/${validatedSkuId}`,
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
  // Validate parameters before use (MED-2)
  const validatedCartId = validateCartId(cartId);
  const validatedSkuId = validateSkuId(skuId);
  
  const response = await apiClient.delete<{ data: Cart } | Cart>(
    `/v2/carts/${validatedCartId}/products/${validatedSkuId}`
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
  // Validate cartId parameter before use (MED-2)
  const validatedCartId = validateCartId(cartId);
  
  await apiClient.delete(`/v2/carts/${validatedCartId}`);
}
