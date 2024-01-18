import { isClosingLineTag } from '../src/types/htmlHelper';

describe('isClosingLineTag', () => {
    test('should return true for closing line tag', () => {
        const lineContent = '</div>';
        const result = isClosingLineTag(lineContent);
        expect(result).toBe(true);
    });

    test('should return true for closing line tag with whitespace', () => {
        const lineContent = '    </p>';
        const result = isClosingLineTag(lineContent);
        expect(result).toBe(true);
    });

    test('should return false for opening line tag', () => {
        const lineContent = '<div>';
        const result = isClosingLineTag(lineContent);
        expect(result).toBe(false);
    });

    test('should return false for empty line', () => {
        const lineContent = '';
        const result = isClosingLineTag(lineContent);
        expect(result).toBe(false);
    });
});
