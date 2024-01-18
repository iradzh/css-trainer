import { LineRange } from '../types/lineRange';
import { ElementHover, EditorHover, Margin } from '../constants/constants';

import { GameLevel } from '../types/gameLevel';
import { keymap, drawSelection, dropCursor, lineNumbers, EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { defaultHighlightStyle, syntaxHighlighting, indentOnInput } from '@codemirror/language';
import { defaultKeymap } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { formatCode } from '../types/htmlFormatter';
import { getAllChildren, isClosingLineTag, findRange } from '../types/htmlHelper';

const setup: Extension = (() => [
    html(),
    lineNumbers(),
    drawSelection(),
    dropCursor(),
    EditorView.editable.of(false),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([...defaultKeymap]),
])();

export class HTMLEditorView {
    private editorLines: NodeListOf<Element>;
    private editorView;
    constructor() {
        this.editorView = new EditorView({
            doc: '',
            extensions: [setup],
            parent: document.querySelector('.html_content') as HTMLElement,
        });
        this.editorLines = document.querySelectorAll('.cm-line');
    }
    draw(level: GameLevel) {
        this.editorView.dispatch({
            changes: {
                from: 0,
                to: this.editorView.state.doc.length,
                insert: formatCode(level.html),
            },
        });
        this.editorLines = document.querySelectorAll('.cm-line');
        this.handleEditorHover();
    }

    private handleEditorHover() {
        this.editorLines.forEach((line, index) => {
            if (index > 0 && index < this.editorLines.length - 2) {
                line.addEventListener('mouseover', () => {
                    const range = findRange(
                        (line as HTMLElement).innerText,
                        index,
                        Array.from(this.editorLines) as HTMLElement[]
                    );
                    const highlightetLines = Array.from(this.editorLines).slice(
                        range.start,
                        range.end + 1
                    ) as HTMLElement[];
                    highlightetLines.forEach((h) => (h.style.backgroundColor = EditorHover.ON));
                    this.searchOnTable(range).forEach((c) => {
                        c.style.boxShadow = ElementHover.ON;
                        this.displayBox(c, line.textContent as string);
                    });
                });

                line.addEventListener('mouseleave', () => {
                    this.removeBox();
                    const range = findRange(
                        (line as HTMLElement).innerText,
                        index,
                        Array.from(this.editorLines) as HTMLElement[]
                    );
                    const highlightedtLines = Array.from(this.editorLines).slice(
                        range.start,
                        range.end + 1
                    ) as HTMLElement[];
                    highlightedtLines.forEach((h) => (h.style.backgroundColor = EditorHover.OFF));
                    this.searchOnTable(range).forEach((c) => (c.style.boxShadow = ElementHover.OFF));
                });
            }
        });
    }

    private searchOnTable(lineRange: LineRange) {
        const table = document.querySelector('.table') as HTMLElement;
        const skippedLines = this.countSkippedLines(lineRange);
        if (lineRange.end - lineRange.start >= 1) {
            return getAllChildren(table).slice(
                lineRange.start - 1 - skippedLines,
                lineRange.end - 1 - skippedLines
            ) as HTMLElement[];
        } else {
            return getAllChildren(table).slice(
                lineRange.start - 1 - skippedLines,
                lineRange.end - skippedLines
            ) as HTMLElement[];
        }
    }

    private countSkippedLines(lineRange: LineRange) {
        return (Array.from(this.editorLines) as HTMLElement[])
            .slice(0, lineRange.end)
            .filter((l) => isClosingLineTag(l.innerText)).length;
    }

    private displayBox(tableElement: HTMLElement, editorLine: string) {
        const rect = tableElement.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const box = document.querySelector('.box') as HTMLElement;
        box.style.left = centerX + Margin.X - box.offsetWidth + 'px';
        box.style.top = centerY - Margin.Y - box.offsetHeight + 'px';

        box.innerText = editorLine;
    }
    private removeBox() {
        const box = document.querySelector('.box') as HTMLElement;
        box.innerText = '';
    }
}
