import ensure, { throwExpression } from '../../Domain/Ensure';

describe('Ensure', () => {
  describe('ensure', () => {
    it('returns the value when it is defined', () => {
      const value = 'test';
      expect(ensure(value)).toBe(value);
    });

    it('returns the value when it is zero', () => {
      const value = 0;
      expect(ensure(value)).toBe(value);
    });

    it('returns the value when it is an empty string', () => {
      const value = '';
      expect(ensure(value)).toBe(value);
      const whitespaceValue = '   ';
      expect(ensure(whitespaceValue)).toBe(whitespaceValue);
    });

    it('returns the value when it is false', () => {
      const value = false;
      expect(ensure(value)).toBe(value);
    });

    it('throws error when value is undefined', () => {
      expect(() => ensure(undefined)).toThrow('This value was promised to be there.');
    });

    it('throws error when value is null', () => {
      expect(() => ensure(null)).toThrow('This value was promised to be there.');
    });

    it('throws error with custom message', () => {
      const customMessage = 'Custom error message';
      expect(() => ensure(undefined, customMessage)).toThrow(customMessage);
    });

    it('throws error with provided message', () => {
      const errorMessage = 'Test error message';
      expect(() => throwExpression(errorMessage)).toThrow(errorMessage);
    });
  });
});
