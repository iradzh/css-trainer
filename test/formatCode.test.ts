import { formatCode } from '../src/types/htmlFormatter';

describe('formatCode', () => {
    test('should format HTML code with specified options', () => {
        const htmlCode = '<div><p>Hello, world!</p></div>';
        const expectedFormattedCode = ['<div>', '    <p>Hello, world!</p>', '</div>'];

        const formattedCode = formatCode(htmlCode);
        const formattedCodeWithoutSemicolon = formattedCode.replace(/;\s*$/, '');
        const formattedCodeLines = formattedCodeWithoutSemicolon.split('\n');

        expect(formattedCodeLines).toEqual(expectedFormattedCode);
    });
});
