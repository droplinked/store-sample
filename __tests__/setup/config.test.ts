/**
 * Basic test to verify test setup is working
 */

import { describe, it, expect } from 'vitest';

describe('Test Setup', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });

  it('should have access to TypeScript types', () => {
    const value: string = 'test';
    expect(typeof value).toBe('string');
  });
});
