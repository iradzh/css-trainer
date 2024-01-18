import { GameLevel } from '../types/gameLevel';
import { createBurgerLevel } from '../types/burger';
import { CURRENT_LEVEL } from '../constants/constants';

export class BurgerView {
    private levelsList: HTMLElement;
    private burgerButton: HTMLElement;
    private aside: HTMLElement;
    constructor() {
        this.levelsList = document.createElement('ul');
        this.burgerButton = document.querySelector('.burger') as HTMLElement;
        this.aside = document.querySelector('.aside') as HTMLElement;
        this.levelsList.classList.add('levels__list');
        this.aside.appendChild(this.levelsList);
        this.burgerButton.addEventListener('click', () => {
            if (this.aside.classList.contains('aside_active')) {
                this.aside.classList.remove('aside_active');
            } else {
                this.aside.classList.add('aside_active');
            }
        });
    }
    draw(levels: GameLevel[], currentLevel: number, rowClick: (rowNumber: number) => void) {
        this.clean();
        for (let index = 0; index < levels.length; index++) {
            const levelRow = document.createElement('li');

            levelRow.innerText = createBurgerLevel(levels[index]);

            this.levelsList.appendChild(levelRow);
            if (currentLevel == index) {
                levelRow.style.backgroundColor = CURRENT_LEVEL;
            }
            levelRow.addEventListener('click', () => {
                rowClick(index);
            });
        }
    }
    private clean() {
        this.levelsList.innerHTML = '';
    }
}
