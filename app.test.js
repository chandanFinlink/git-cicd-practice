// Destructure reverseString from our exported object
const { reverseString } = require('./app');

test('properly reverses a standard string', () => {
    expect(reverseString('hello')).toBe('olleh');
});

test('handles an empty string gracefully', () => {
    expect(reverseString('')).toBe('');
});