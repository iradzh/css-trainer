import { LineRange } from '../types/lineRange';

export function getAllChildren(element: HTMLElement): HTMLElement[] {
    const children: HTMLElement[] = [];

    function traverse(element: HTMLElement) {
        const childNodes = element.children;

        for (let i = 0; i < childNodes.length; i++) {
            const child = childNodes[i] as HTMLElement;
            children.push(child);
            traverse(child);
        }
    }

    traverse(element);
    return children;
}

export function findRange(htmlLine: string, hoveredLineIndex: number, editorLines: HTMLElement[]): LineRange {
    if (hasOpeningAndClosingTagsOnSameLine(htmlLine)) {
        return { start: hoveredLineIndex, end: hoveredLineIndex };
    }

    if (isClosingLineTag(htmlLine)) {
        const text = htmlLine;
        if (text) {
            const start = findPreviousOpenTag(hoveredLineIndex, getTagName(text), editorLines);
            return { start, end: hoveredLineIndex };
        }
    }
    if (isOpeningLineTag(htmlLine)) {
        const text = htmlLine;
        if (text) {
            const end = findNextClosingTag(hoveredLineIndex, getTagName(text), editorLines);
            return { start: hoveredLineIndex, end };
        }
    }

    return { start: hoveredLineIndex, end: hoveredLineIndex };
}

export function isOpeningLineTag(lineContent: string) {
    const trimmedContent = lineContent.trim();
    if (trimmedContent === '') {
        return false;
    }

    const openingTagRegex = /^<[^/]+>/;
    return openingTagRegex.test(trimmedContent);
}

export function isClosingLineTag(lineContent: string) {
    return lineContent.trim().startsWith('</');
}

export function hasOpeningAndClosingTagsOnSameLine(htmlString: string) {
    const tagRegex = /<(\/?[^>]+)>/g;
    const matches = htmlString.match(tagRegex);

    if (!matches) {
        return false;
    }

    const openingTagCount = matches.filter((tag) => !tag.startsWith('</')).length;
    const closingTagCount = matches.filter((tag) => tag.startsWith('</')).length;

    return openingTagCount > 0 && closingTagCount > 0 && openingTagCount === closingTagCount;
}

export function findPreviousOpenTag(closingTagLine: number, tag: string, editorLines: HTMLElement[]): number {
    for (let index = closingTagLine; index >= 0; index -= 1) {
        const line = editorLines[index] as HTMLElement;
        if (isOpeningLineTag(line.innerText) && getTagName(line.innerText) === tag) {
            return index;
        }
    }
    return closingTagLine;
}

function findNextClosingTag(openingTagLine: number, tag: string, editorLines: HTMLElement[]): number {
    for (let index = openingTagLine; index < editorLines.length; index += 1) {
        const line = editorLines[index] as HTMLElement;
        if (isClosingLineTag(line.innerText) && getTagName(line.innerText) === tag) {
            return index;
        }
    }
    return openingTagLine;
}

export function getTagName(htmlElement: string) {
    htmlElement = htmlElement.trim();

    const isOpeningLineTag = htmlElement.startsWith('<') && !htmlElement.startsWith('</');
    const isClosingLineTag = htmlElement.startsWith('</');

    if (isOpeningLineTag) {
        const endIndex = htmlElement.indexOf(' ');
        const closingIndex = htmlElement.indexOf('>');
        const sliceEndIndex = endIndex !== -1 ? endIndex : closingIndex;
        const tagName = htmlElement.slice(1, sliceEndIndex);
        return tagName;
    }

    if (isClosingLineTag) {
        const endIndex = htmlElement.indexOf('>');
        const tagName = htmlElement.slice(2, endIndex);
        return tagName;
    }

    const regex = /<([^>]+)>/;
    const matches = regex.exec(htmlElement);
    if (matches && matches.length > 1) {
        const tagWithBrackets = matches[1];
        const tagName = tagWithBrackets.split(' ')[0];
        return tagName;
    }

    return '';
}

export function selector(table: HTMLElement, cssSelector: string) {
    const arr = cssSelector.split(':');

    if (arr.length > 1 && arr[1].length > 0) {
        const parentSelector = arr[0];
        const pseudoSelector = arr[1];
        const parentElements = Array.from(table.querySelectorAll(arr[0])) as HTMLElement[];

        if (pseudoSelector == 'last-child') {
            return lastChildSelector(table, parentSelector);
        } else if (pseudoSelector == 'first-child') {
            return firstChildSelector(parentElements);
        } else if (pseudoSelector == 'empty') {
            return emptySelector(parentElements);
        }
    }

    return table.querySelectorAll(cssSelector);
}

export function lastChildSelector(table: HTMLElement, cssSelector: string) {
    const parents = table.querySelectorAll(cssSelector);

    if (parents.length > 0) {
        return Array(parents[parents.length - 1]);
    }
    return new Array(0);
}

export function firstChildSelector(parents: HTMLElement[]) {
    const el: Element[] = [];

    parents.forEach((p) => {
        const child = p.querySelector(`:first-child`);
        child && el.push(child);
    });

    return el;
}

export function emptySelector(parents: HTMLElement[]) {
    const el: Element[] = [];

    parents.forEach((p) => {
        if (p.children.length === 0) {
            el.push(p);
        }
    });

    return el;
}
