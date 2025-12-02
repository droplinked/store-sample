'use client';

import { useShopInit } from '@/lib/hooks/useShopInit';

/**
 * Client component to initialize shop data on app load
 * This runs on the client side and loads shop configuration into the store
 */
export function ShopInitializer() {
  useShopInit();
  return null;
}
