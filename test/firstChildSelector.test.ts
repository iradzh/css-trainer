import { firstChildSelector } from '../src/types/htmlHelper'; // Replace './your-module' with the actual module path

describe('firstChildSelector', () => {
    it('should return an array containing the first child element of each parent', () => {
        const parent1 = document.createElement('div');
        parent1.innerHTML = '<span>Child 1</span>';

        const parent2 = document.createElement('div');
        parent2.innerHTML = '<span>Child 2</span>';

        const parent3 = document.createElement('div');
        parent3.innerHTML = '<span>Child 3</span>';

        const parents = [parent1, parent2, parent3];

        const result = firstChildSelector(parents);

        expect(result).toHaveLength(3);
        expect(result[0]).toBe(parent1.firstElementChild);
        expect(result[1]).toBe(parent2.firstElementChild);
        expect(result[2]).toBe(parent3.firstElementChild);
    });

    it('should return an empty array if no parents are provided', () => {
        const parents: HTMLElement[] = [];
        const result = firstChildSelector(parents);
        expect(result).toHaveLength(0);
    });

    it('should return an empty array if no first child element is found for any parent', () => {
        const parent1 = document.createElement('div');
        const parent2 = document.createElement('div');
        const parents = [parent1, parent2];
        const result = firstChildSelector(parents);
        expect(result).toHaveLength(0);
    });
});
