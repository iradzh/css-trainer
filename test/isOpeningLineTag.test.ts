import { isOpeningLineTag } from '../src/types/htmlHelper';

describe('isOpeningLineTag', () => {
    test('should return true for opening line tag', () => {
        const lineContent = '<div>';
        const result = isOpeningLineTag(lineContent);
        expect(result).toBe(true);
    });

    test('should return false for closing line tag', () => {
        const lineContent = '</div>';
        const result = isOpeningLineTag(lineContent);
        expect(result).toBe(false);
    });

    test('should return false for self-closing line tag', () => {
        const lineContent = "<img src='image.jpg' />";
        const result = isOpeningLineTag(lineContent);
        expect(result).toBe(false);
    });

    test('should return true for opening line tag with whitespace', () => {
        const lineContent = '    <p>';
        const result = isOpeningLineTag(lineContent);
        expect(result).toBe(true);
    });

    test('should return false for empty line', () => {
        const lineContent = '';
        const result = isOpeningLineTag(lineContent);
        expect(result).toBe(false);
    });
});
