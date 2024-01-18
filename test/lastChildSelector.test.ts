import { lastChildSelector } from '../src/types/htmlHelper';

describe('lastChildSelector', () => {
    let table: HTMLElement;

    beforeEach(() => {
        table = document.createElement('table');
        const parent1 = document.createElement('tr');
        const parent2 = document.createElement('tr');
        const parent3 = document.createElement('tr');

        parent1.classList.add('selected');
        parent2.classList.add('selected');
        parent3.classList.add('selected');

        table.appendChild(parent1);
        table.appendChild(parent2);
        table.appendChild(parent3);
    });

    test('should return an array containing the last selected parent element', () => {
        const result = lastChildSelector(table, '.selected');
        expect(result).toHaveLength(1);
        expect(result[0]).toBe(table.lastElementChild);
    });

    test('should return an empty array if no matching elements are found', () => {
        const result = lastChildSelector(table, '.non-existent');
        expect(result).toHaveLength(0);
    });
});
