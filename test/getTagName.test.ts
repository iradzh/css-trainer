import { getTagName } from '../src/types/htmlHelper';

describe('getTagName', () => {
    test('should return the correct tag name for opening line tag', () => {
        expect(getTagName('<div>')).toBe('div');
        expect(getTagName('<span class="example">')).toBe('span');
    });

    test('should return the correct tag name for closing line tag', () => {
        expect(getTagName('</a>')).toBe('a');
        expect(getTagName('</span>')).toBe('span');
    });

    test('should return the correct tag name for other cases', () => {
        expect(getTagName('<>')).toBe('');
        expect(getTagName('<img src="image.jpg" alt="Example Image">')).toBe('img');
    });
});
