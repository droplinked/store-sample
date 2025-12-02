/**
 * Get hex color from color value
 * Returns the color if it's a valid hex color, otherwise null
 */
export function getColorHex(colorValue: string): string | null {
  if (/^#[0-9A-F]{3}([0-9A-F]{3})?$/i.test(colorValue)) {
    return colorValue;
  }
  return null;
}
