/**
 * SKU Selector Component
 * 
 * @description
 * Intelligently groups product SKUs by their attributes and displays
 * them in a clean, user-friendly interface. Supports multi-attribute
 * selection (e.g., Color + Size) with smart availability checking.
 * 
 * @features
 * - Groups SKUs by attribute types (color, size, etc.)
 * - Shows color swatches for color attributes
 * - Sorts sizes from smallest to largest
 * - Shows availability for each option
 * - Disables out-of-stock combinations
 * - Visual feedback for selection
 * - Accessible with ARIA labels
 * 
 * @example
 * ```tsx
 * <SKUSelector
 *   skus={product.skus}
 *   selectedSku={selectedSku}
 *   onSkuChange={(sku) => setSelectedSku(sku)}
 * />
 * ```
 */

'use client';

import { ProductSKU } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';

/**
 * Size order for sorting (smallest to largest)
 */
const SIZE_ORDER: Record<string, number> = {
  'xxs': 1,
  'xs': 2,
  'xsmall': 2,
  'x-small': 2,
  's': 3,
  'small': 3,
  'm': 4,
  'medium': 4,
  'l': 5,
  'large': 5,
  'xl': 6,
  'xlarge': 6,
  'x-large': 6,
  'xxl': 7,
  '2xl': 7,
  'xxxl': 8,
  '3xl': 8,
  '4xl': 9,
  '5xl': 10,
};



interface SKUSelectorProps {
  skus: ProductSKU[];
  selectedSku: ProductSKU | null;
  onSkuChange: (sku: ProductSKU) => void;
}

interface AttributeGroup {
  key: string;
  title: string;
  values: {
    value: string;
    caption: string;
    available: boolean;
    skus: ProductSKU[];
  }[];
}

export default function SKUSelector({
  skus,
  selectedSku,
  onSkuChange,
}: SKUSelectorProps) {
  // Group SKUs by attributes
  const attributeGroups = useMemo(() => {
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
          // Update availability if any SKU with this attribute is available
          existingValue.available = existingValue.available || isAvailable;
        }
      });
    });

    // Sort values for each group
    groups.forEach(group => {
      const isSize = group.key.toLowerCase().includes('size');
      
      if (isSize) {
        // Sort sizes from smallest to largest
        group.values.sort((a, b) => {
          const aOrder = getSizeOrder(a.value);
          const bOrder = getSizeOrder(b.value);
          
          // If both have order values, sort by order
          if (aOrder !== -1 && bOrder !== -1) {
            return aOrder - bOrder;
          }
          
          // Try numeric comparison
          const aNum = parseFloat(a.value);
          const bNum = parseFloat(b.value);
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
          }
          
          // Fallback to alphabetical
          return a.caption.localeCompare(b.caption);
        });
      } else {
        // For non-sizes, keep original order or sort alphabetically
        group.values.sort((a, b) => a.caption.localeCompare(b.caption));
      }
    });

    return Array.from(groups.values());
  }, [skus]);

  // Track selected attributes
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  // Initialize selected attributes from selectedSku
  useEffect(() => {
    if (selectedSku) {
      const attrs: Record<string, string> = {};
      selectedSku.attributes.forEach(attr => {
        attrs[attr.key] = attr.value;
      });
      setSelectedAttributes(attrs);
    }
  }, [selectedSku]);

  // Handle attribute selection
  const handleAttributeChange = (key: string, value: string) => {
    const newAttributes = { ...selectedAttributes, [key]: value };
    setSelectedAttributes(newAttributes);

    // Find matching SKU
    const matchingSku = skus.find(sku => {
      return sku.attributes.every(
        attr => newAttributes[attr.key] === attr.value
      );
    });

    if (matchingSku) {
      onSkuChange(matchingSku);
    }
  };

  // Check if an attribute value is available given current selections
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
                const colorHex = isColor ? getColorHex(option.value) : null;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAttributeChange(group.key, option.value)}
                    disabled={!isAvailable}
                    aria-pressed={isSelected}
                    aria-label={`${group.title}: ${option.caption}${!isAvailable ? ' (Out of stock)' : ''}`}
                    className={`
                      relative rounded-lg sm:rounded-xl border-2 transition-all 
                      focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-orange-500
                      ${isColor ? 'px-2 sm:px-3 py-2 sm:py-3' : 'px-3 sm:px-5 py-2 sm:py-3'}
                      ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-md scale-105'
                          : isAvailable
                            ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:scale-105'
                            : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
                      }
                    `}
                  >
                    {isColor && colorHex ? (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span
                          className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-slate-200 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: colorHex }}
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm font-medium truncate">{option.caption}</span>
                      </div>
                    ) : (
                      <span className="text-xs sm:text-sm font-medium">{option.caption}</span>
                    )}
                    
                    {/* Selected checkmark */}
                    {isSelected && (
                      <span className="absolute -right-0.5 sm:-right-1 -top-0.5 sm:-top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white shadow-sm">
                        <svg
                          className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}

                    {/* Out of stock indicator */}
                    {!isAvailable && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-px w-full rotate-[-25deg] bg-slate-300"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

/**
 * Capitalize first letter of a string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get size order for sorting
 */
function getSizeOrder(size: string): number {
  const normalized = size.toLowerCase().trim();
  return SIZE_ORDER[normalized] ?? -1;
}

/**
 * Get hex color from color value
 * Returns the color if it's a valid hex color, otherwise null
 */
function getColorHex(colorValue: string): string | null {
  // Check if it's a valid hex color (3 or 6 digits)
  if (/^#[0-9A-F]{3}([0-9A-F]{3})?$/i.test(colorValue)) {
    return colorValue;
  }
  
  return null;
}
