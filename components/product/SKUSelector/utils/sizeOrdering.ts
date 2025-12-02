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

export function getSizeOrder(size: string): number {
  const normalized = size.toLowerCase().trim();
  return SIZE_ORDER[normalized] ?? -1;
}
