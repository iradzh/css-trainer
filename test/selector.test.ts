import { selector } from '../src/types/htmlHelper';

describe('selector', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="container">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <a class="link" id="fancy">Link 1</a>
        <a class="link">Link 2</a>
        <p class="paragraph" id="fancy">Paragraph 1</p>
        <p class="paragraph">Paragraph 2</p>
      </div>
    `;
    });

    it('should return all matching elements with class', () => {
        const container = document.querySelector('#container') as HTMLElement;
        const result = selector(container, '.item');
        expect(result).toHaveLength(2);
    });

    it('should return all matching elements with id', () => {
        const container = document.querySelector('#container') as HTMLElement;
        const result = selector(container, '#fancy');
        expect(result).toHaveLength(2);
    });

    it('should return the last child elements when pseudo selector is "last-child"', () => {
        const container = document.querySelector('#container') as HTMLElement;
        const result = selector(container, 'a:last-child');
        expect(result).toHaveLength(1);
        expect(result[0].textContent).toBe('Link 2');
    });
});
