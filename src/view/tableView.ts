import { ElementHover, EditorHover, Margin } from '../constants/constants';
import { getAllChildren, findRange, selector } from '../types/htmlHelper';
import { GameLevel } from '../types/gameLevel';

export class TableView {
    private editorLines: HTMLElement[];

    constructor() {
        this.editorLines = Array.from(document.querySelectorAll('.cm-line')) as HTMLElement[];
    }
    draw(level: GameLevel) {
        this.editorLines = Array.from(document.querySelectorAll('.cm-line')) as HTMLElement[];
        this.handleTableHover();
        this.animate(level);
    }

    private animate(level: GameLevel) {
        const table = document.querySelector('.table') as HTMLElement;
        const elementsToAnimate = selector(table, level.correct);
        elementsToAnimate.forEach((e) => e.classList.add('tilt-animation'));
    }

    private findInEditor(index: number) {
        if (index >= 0 && index < this.editorLines.length - 1) {
            return this.editorLines[index + 1] as HTMLElement;
        }
    }

    private findTableItems() {
        const table = document.querySelector('.table') as HTMLElement;
        const children = getAllChildren(table);
        return children;
    }
    private handleTableHover() {
        const tableElements = this.findTableItems();

        for (let positionOnTable = 0; positionOnTable < tableElements.length; positionOnTable++) {
            const element = tableElements[positionOnTable];
            element.addEventListener('mouseover', (event) => {
                (element as HTMLElement).style.boxShadow = ElementHover.ON;

                const parent = element.parentElement as HTMLElement;
                if (tableElements.includes(parent)) {
                    this.removeParentHighlight(parent);
                }

                const skippedLines = this.countSkippedLines(tableElements, positionOnTable, parent);
                const editorLine = this.findInEditor(positionOnTable + skippedLines) as HTMLElement;
                const range = findRange(editorLine.innerText, positionOnTable + 1 + skippedLines, this.editorLines);

                for (let index = range.start; index <= range.end; index++) {
                    (this.editorLines[index] as HTMLElement).style.backgroundColor = EditorHover.ON;
                }
                this.displayBox(editorLine.textContent as string, event);

                event.stopPropagation();
            });

            element.addEventListener('mouseleave', () => {
                this.removeBox();
                (element as HTMLElement).style.boxShadow = ElementHover.OFF;
                const parent = element.parentElement as HTMLElement;
                const skippedLines = this.countSkippedLines(tableElements, positionOnTable, parent);
                const editorLine = this.findInEditor(positionOnTable + skippedLines) as HTMLElement;
                const range = findRange(editorLine.innerText, positionOnTable + 1 + skippedLines, this.editorLines);
                for (let index = range.start; index <= range.end; index++) {
                    (this.editorLines[index] as HTMLElement).style.backgroundColor = EditorHover.OFF;
                }
            });
        }
    }

    private countSkippedLines(tableElements: HTMLElement[], positionOnTable: number, parent: HTMLElement) {
        let previousParentsCount = 0;
        for (let index = 0; index < positionOnTable; index++) {
            if (tableElements[index].children.length > 0 && tableElements[index] != parent) {
                previousParentsCount++;
            }
        }
        return previousParentsCount;
    }

    private removeParentHighlight(parent: HTMLElement) {
        const mouseLeaveEvent = new MouseEvent('mouseleave', {
            bubbles: true,
            cancelable: true,
        });
        parent.dispatchEvent(mouseLeaveEvent);
    }
    private displayBox(line: string, event: MouseEvent) {
        const box = document.querySelector('.box') as HTMLElement;
        box.style.left = event.clientX + Margin.X - box.offsetWidth + 'px';
        box.style.top = event.clientY - Margin.Y - box.offsetHeight + 'px';
        box.style.display = 'block';
        box.innerText = line;
    }
    private removeBox() {
        const box = document.querySelector('.box') as HTMLElement;
        box.innerText = '';
    }
}
