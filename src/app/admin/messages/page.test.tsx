import { formatPhoneNumber } from './page';

describe('formatPhoneNumber', () => {
  it('should format a valid North American phone number', () => {
    expect(formatPhoneNumber('1234567890')).toBe('+1 (123) 456-7890');
  });

  it('should format a phone number with extra characters', () => {
    expect(formatPhoneNumber('(123) 456-7890')).toBe('+1 (123) 456-7890');
  });

  it('should return non-North American phone numbers as is', () => {
    expect(formatPhoneNumber('987654321')).toBe('987654321');
  });

  it('should return an empty string for null input', () => {
    expect(formatPhoneNumber(null as any)).toBe('');
  });

  it('should return an empty string for undefined input', () => {
    expect(formatPhoneNumber(undefined as any)).toBe('');
  });

  it('should return an empty string for an empty string input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });
});
