import { GameLevel } from '../types/gameLevel';
import { HTMLEditorView } from './htmlEditorView';
import { TableView } from './tableView';
import { isEqual, toArray } from 'lodash';
import { selector } from '../types/htmlHelper';

export class LevelView {
    private htmlEditorView: HTMLEditorView;
    private tableView: TableView;
    private nextLevel: () => void;
    private goToLevel: (level: number) => void;

    constructor(nextLevel: () => void, goToLevel: (level: number) => void) {
        this.htmlEditorView = new HTMLEditorView();
        this.tableView = new TableView();
        this.nextLevel = nextLevel;
        this.goToLevel = goToLevel;
    }

    draw(level: GameLevel) {
        const completed = document.querySelector('.level__progres');
        if (level.isCompleted) {
            completed && completed.classList.add('level__progres__completed');
        } else {
            completed && completed.classList.remove('level__progres__completed');
        }

        const title = document.querySelector('.title') as HTMLElement;
        title.innerText = level.title;

        const levelNumber = document.querySelector('.level_num') as HTMLElement;
        levelNumber.innerText = `Level ${level.levelNb} of 10`;

        const levelSelector = document.querySelector('.level_selector') as HTMLElement;
        levelSelector.innerText = level.selectorType;

        const levelDescription = document.querySelector('.level_description') as HTMLElement;
        levelDescription.innerText = level.description;

        const levelExample = document.querySelector('.level_example') as HTMLElement;
        levelExample.innerText = level.example;

        const table = document.querySelector('.table_container') as HTMLElement;
        table.innerHTML = level.html;

        this.createCssInput(level);
        this.htmlEditorView.draw(level);
        this.tableView.draw(level);
    }

    complete(level: GameLevel, input: HTMLInputElement) {
        if (!isNaN(Number(input.value))) {
            if (+input.value <= 10 && +input.value > 0) {
                this.goToLevel(+input.value - 1);
                return;
            } else {
                input.classList.add('shake-element');
                setTimeout(() => {
                    input.classList.add('stop-shake');
                }, 500);
                return;
            }
        }
        const table = document.querySelector('.table') as HTMLElement;
        const correctElements = selector(table, level.correct);
        const userInput = selector(table, input.value);

        if (isEqual(toArray(userInput), toArray(correctElements))) {
            level.isCompleted = true;
            input.value = '';

            correctElements.forEach((e) => {
                (e as HTMLElement).classList.remove('tilt-animation');
                (e as HTMLElement).classList.add('leave-up');
            });
            setTimeout(() => {
                correctElements.forEach((e) => {
                    (e as HTMLElement).classList.remove('leave-up');
                });
                this.nextLevel();
            }, 500);
        } else {
            input.classList.add('shake-element');
            setTimeout(() => {
                input.classList.add('stop-shake');
            }, 500);
        }
    }

    private createCssInput(level: GameLevel) {
        const inputParent = document.querySelector('.editor__input') as HTMLElement;
        inputParent.innerHTML = '';

        const input = document.createElement('input') as HTMLInputElement;
        input.id = 'selector-input';
        input.placeholder = 'write your selector here';
        inputParent.appendChild(input);
        input.value = '';

        const submitBtn = document.createElement('button') as HTMLElement;
        submitBtn.innerText = 'Enter';
        submitBtn.classList.add('btn_submit');
        inputParent.appendChild(submitBtn);
        submitBtn.addEventListener('click', () => {
            this.complete(level, input);
        });

        input.addEventListener('keyup', (event) => {
            const keyBoardEvent = event as KeyboardEvent;
            event.preventDefault();
            if (keyBoardEvent.key === 'Enter') {
                this.complete(level, input);
            }
        });

        const hintBtn = document.querySelector('.helper__btn__open') as HTMLElement;
        let currentIndex = 0;
        hintBtn.addEventListener('click', () => {
            level.wasHelped = true;
            const intervalId = setInterval(() => {
                input.value = level.correct.slice(0, currentIndex + 1);
                currentIndex++;

                if (currentIndex >= level.correct.length) {
                    clearInterval(intervalId);
                }
            }, 100);
        });
    }
}
