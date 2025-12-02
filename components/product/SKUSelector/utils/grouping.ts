import { ProductSKU } from '@/lib/types';
import { AttributeGroup } from '../types';
import { getSizeOrder } from './sizeOrdering';

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function groupSkusByAttributes(skus: ProductSKU[]): AttributeGroup[] {
  if (!skus || skus.length === 0) return [];

  const groups = new Map<string, AttributeGroup>();

  skus.forEach(sku => {
    sku.attributes.forEach(attr => {
      if (!groups.has(attr.key)) {
        groups.set(attr.key, {
          key: attr.key,
          title: capitalizeFirst(attr.key),
          values: [],
        });
      }

      const group = groups.get(attr.key)!;
      const existingValue = group.values.find(v => v.value === attr.value);

      const isAvailable =
        !sku.inventory.policy ||
        sku.inventory.quantity === -1 ||
        sku.inventory.quantity > 0;

      if (!existingValue) {
        group.values.push({
          value: attr.value,
          caption: attr.caption,
          available: isAvailable,
          skus: [sku],
        });
      } else {
        if (!existingValue.skus.includes(sku)) {
          existingValue.skus.push(sku);
        }
        existingValue.available = existingValue.available || isAvailable;
      }
    });
  });

  groups.forEach(group => {
    const isSize = group.key.toLowerCase().includes('size');
    
    if (isSize) {
      group.values.sort((a, b) => {
        const aOrder = getSizeOrder(a.value);
        const bOrder = getSizeOrder(b.value);
        
        if (aOrder !== -1 && bOrder !== -1) {
          return aOrder - bOrder;
        }
        
        const aNum = parseFloat(a.value);
        const bNum = parseFloat(b.value);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return aNum - bNum;
        }
        
        return a.caption.localeCompare(b.caption);
      });
    } else {
      group.values.sort((a, b) => a.caption.localeCompare(b.caption));
    }
  });

  return Array.from(groups.values());
}
