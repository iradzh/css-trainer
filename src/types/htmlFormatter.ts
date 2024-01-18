import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

export function formatCode(htmlCode: string) {
    return prettier.format(htmlCode, {
        parser: 'babel',
        plugins: [parserBabel],
        htmlWhitespaceSensitivity: 'strict',
        printWidth: 40,
        tabWidth: 4,
        singleAttributePerLine: true,
        endOfLine: 'auto',
    });
}
