import { Level } from './level';
import { LevelView } from '../view/levelView';
import { GameLevel } from './gameLevel';
import { BurgerView } from '../view/burgerView';

export class Game {
    private levels: GameLevel[];
    private currentLevel: number;
    private levelView: LevelView;
    private burgerView: BurgerView;

    constructor(levels: Level[]) {
        this.levels = levels as GameLevel[];
        this.currentLevel = 0;
        this.levelView = new LevelView(
            () => this.nextLevel(),
            (rowNumber) => this.goToLevel(rowNumber)
        );
        this.burgerView = new BurgerView();
        const getLevelsItem = localStorage.getItem('levels');
        const getCurrentLevelItem = localStorage.getItem('currentLevel');
        if (getLevelsItem && getCurrentLevelItem) {
            const storedLevels = JSON.parse(getLevelsItem);
            this.levels = storedLevels;
            this.currentLevel = +getCurrentLevelItem;
        }
    }

    start() {
        this.burgerView.draw(this.levels, this.currentLevel, (rowNumber) => this.goToLevel(rowNumber));
        this.initializeListeners();
        this.levelView.draw(this.levels[this.currentLevel]);
    }

    nextLevel() {
        if (this.isWon()) {
            this.victory();
            return;
        }
        if (this.currentLevel !== this.levels.length) {
            this.currentLevel += 1;
            this.levelView.draw(this.levels[this.currentLevel]);
            this.burgerView.draw(this.levels, this.currentLevel, (rowNumber) => this.goToLevel(rowNumber));
            this.store();
        }
    }

    previousLevel() {
        if (this.currentLevel !== 0) {
            this.currentLevel -= 1;
            this.levelView.draw(this.levels[this.currentLevel]);
            this.burgerView.draw(this.levels, this.currentLevel, (rowNumber) => this.goToLevel(rowNumber));
            this.store();
        }
    }

    goToLevel(level: number) {
        this.currentLevel = level;
        this.burgerView.draw(this.levels, this.currentLevel, (rowNumber) => this.goToLevel(rowNumber));
        this.levelView.draw(this.levels[this.currentLevel]);
    }

    initializeListeners() {
        const previousBtn = document.querySelector('.level__prev') as HTMLElement;
        previousBtn.addEventListener('click', () => this.previousLevel());
        const nextBtn = document.querySelector('.level__next') as HTMLElement;
        nextBtn.addEventListener('click', () => this.nextLevel());

        const resetBtn = document.querySelector('.level__reset_button') as HTMLElement;
        resetBtn.addEventListener('click', () => this.reset());
    }

    reset() {
        this.currentLevel = 0;
        this.levels.forEach((l) => {
            l.isCompleted = false;
            l.wasHelped = false;
        });
        this.levelView.draw(this.levels[0]);
        this.burgerView.draw(this.levels, this.currentLevel, (rowNumber) => this.goToLevel(rowNumber));
        localStorage.clear();
    }

    store() {
        localStorage.setItem('levels', JSON.stringify(this.levels));
        localStorage.setItem('currentLevel', `${this.currentLevel}`);
    }

    private isWon() {
        for (const l of this.levels) {
            if (!l.isCompleted) {
                return false;
            }
        }
        return true;
    }
    private victory() {
        const overlay = document.querySelector('.overlay') as HTMLElement;
        overlay.style.display = 'flex';

        const closeModal = document.querySelector('.modal_close') as HTMLElement;
        closeModal.addEventListener('click', () => {
            overlay.style.display = 'none';
            this.reset();
        });
    }
}
