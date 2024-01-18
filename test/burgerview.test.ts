import { createBurgerLevel } from '../src/types/burger';

describe('createBurgerLevel', () => {
    it('should return the correct string representation for a completed level without help', () => {
        const level = {
            levelNb: 1,
            selectorType: 'div',
            isCompleted: true,
            wasHelped: false,
            title: 'test',
            levelName: 'test',
            description: 'test',
            html: 'test',
            example: 'test',
            correct: 'test',
        };

        const result = createBurgerLevel(level);

        expect(result).toBe('1. div 🆗');
    });

    it('should return the correct string representation for a completed level with help', () => {
        const level = {
            levelNb: 2,
            selectorType: 'p',
            isCompleted: true,
            wasHelped: true,
            title: 'test',
            levelName: 'test',
            description: 'test',
            html: 'test',
            example: 'test',
            correct: 'test',
        };

        const result = createBurgerLevel(level);

        expect(result).toBe('2. p 🆗 💡');
    });

    it('should return the correct string representation for an incomplete level', () => {
        const level = {
            levelNb: 3,
            selectorType: 'span',
            isCompleted: false,
            wasHelped: false,
            title: 'test',
            levelName: 'test',
            description: 'test',
            html: 'test',
            example: 'test',
            correct: 'test',
        };

        const result = createBurgerLevel(level);

        expect(result).toBe('3. span');
    });
});
