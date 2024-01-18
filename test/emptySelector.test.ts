import { emptySelector } from '../src/types/htmlHelper';
describe('emptySelector', () => {
    it('should return an array containing the empty parent elements', () => {
        const parent1 = document.createElement('div');
        const parent2 = document.createElement('div');
        const parent3 = document.createElement('div');

        const child1 = document.createElement('span');
        const child2 = document.createElement('span');

        parent1.appendChild(child1);
        parent2.appendChild(child2);

        const result = emptySelector([parent1, parent2, parent3]);

        expect(result).toHaveLength(1);
        expect(result[0]).toBe(parent3);
    });

    it('should return an empty array if no parents are provided', () => {
        const result = emptySelector([]);
        expect(result).toHaveLength(0);
    });

    it('should return an empty array if no empty parent elements are found', () => {
        const parent1 = document.createElement('div');
        const parent2 = document.createElement('div');

        const child1 = document.createElement('span');
        const child2 = document.createElement('span');

        parent1.appendChild(child1);
        parent2.appendChild(child2);

        const result = emptySelector([parent1, parent2]);
        expect(result).toHaveLength(0);
    });
});
