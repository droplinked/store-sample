/**
 * SKU Selector Component
 * 
 * @description
 * Intelligently groups product SKUs by their attributes and displays
 * them in a clean, user-friendly interface. Supports multi-attribute
 * selection (e.g., Color + Size) with smart availability checking.
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import AttributeButton from './AttributeButton';
import { SKUSelectorProps } from './types';
import { groupSkusByAttributes } from './utils/grouping';

export default function SKUSelector({
  skus,
  selectedSku,
  onSkuChange,
}: SKUSelectorProps) {
  const attributeGroups = useMemo(() => groupSkusByAttributes(skus), [skus]);
  
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    let cancelled = false;

    if (selectedSku) {
      const attrs: Record<string, string> = {};
      selectedSku.attributes.forEach(attr => {
        attrs[attr.key] = attr.value;
      });

      // Defer the state update to avoid calling setState synchronously inside the effect,
      // which can cause cascading renders; using a microtask keeps the update but defers it.
      Promise.resolve().then(() => {
        if (!cancelled) {
          setSelectedAttributes(attrs);
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [selectedSku]);

  const handleAttributeChange = (key: string, value: string) => {
    const newAttributes = { ...selectedAttributes, [key]: value };
    setSelectedAttributes(newAttributes);

    const matchingSku = skus.find(sku => {
      return sku.attributes.every(
        attr => newAttributes[attr.key] === attr.value
      );
    });

    if (matchingSku) {
      onSkuChange(matchingSku);
    }
  };

  const isAttributeValueAvailable = (
    attributeKey: string,
    value: string
  ): boolean => {
    const tempAttributes = { ...selectedAttributes, [attributeKey]: value };

    return skus.some(sku => {
      const matchesSelection = sku.attributes.every(
        attr =>
          !tempAttributes[attr.key] || tempAttributes[attr.key] === attr.value
      );

      const isInStock =
        !sku.inventory.policy ||
        sku.inventory.quantity === -1 ||
        sku.inventory.quantity > 0;

      return matchesSelection && isInStock;
    });
  };

  if (!attributeGroups || attributeGroups.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {attributeGroups.map(group => {
        const isColor = group.key.toLowerCase().includes('color') || 
                       group.key.toLowerCase().includes('colour');
        
        return (
          <fieldset key={group.key} className="space-y-2 sm:space-y-3">
            <legend className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              {group.title}
              {selectedAttributes[group.key] && (
                <span className="font-normal text-slate-600 normal-case text-xs sm:text-sm">
                  -{' '}
                  {group.values.find(v => v.value === selectedAttributes[group.key])
                    ?.caption}
                </span>
              )}
            </legend>

            <div
              className="flex flex-wrap gap-2 sm:gap-3"
              role="group"
              aria-label={`Select ${group.title}`}
            >
              {group.values.map(option => {
                const isSelected = selectedAttributes[group.key] === option.value;
                const isAvailable = isAttributeValueAvailable(
                  group.key,
                  option.value
                );

                return (
                  <AttributeButton
                    key={option.value}
                    attributeTitle={group.title}
                    option={option}
                    isSelected={isSelected}
                    isAvailable={isAvailable}
                    isColor={isColor}
                    onClick={() => handleAttributeChange(group.key, option.value)}
                  />
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
