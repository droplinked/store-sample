/**
 * Hook to initialize shop data on app load
 * Only fetches from API if not already in localStorage
 */

import { useEffect } from 'react';
import { useShopStore } from '@/lib/store/shopStore';
import { getShopByName } from '@/lib/api/shop';
import { handleError } from '@/lib/utils/errorHandler';

export function useShopInit() {
  const shop = useShopStore((state) => state.shop);
  const isLoading = useShopStore((state) => state.isLoading);
  const { setShop, setLoading, setError } = useShopStore(
    (state) => state.actions
  );

  useEffect(() => {
    // Skip if shop is already loaded (from localStorage or previous fetch)
    if (shop) {
      return;
    }

    async function loadShop() {
      const shopName = process.env.NEXT_PUBLIC_SHOP_NAME;

      if (!shopName) {
        setError('Shop name not configured');
        return;
      }

      setLoading(true);

      try {
        const shopData = await getShopByName(shopName);
        setShop(shopData);
      } catch (error) {
        handleError(error, 'Failed to load shop configuration');
        setError('Failed to load shop configuration');
      } finally {
        setLoading(false);
      }
    }

    loadShop();
  }, [shop, setShop, setLoading, setError]);

  return { shop, isLoading };
}
