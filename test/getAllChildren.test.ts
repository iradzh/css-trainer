import { getAllChildren } from '../src/types/htmlHelper';

describe('getAllChildren', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="container">
        <div class="item">
          <span>Child 1</span>
          <span>Child 2</span>
        </div>
        <p class="paragraph">Paragraph</p>
        <ul class="list">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    `;
    });

    it('should return an array containing all the children of the given element', () => {
        const container = document.querySelector('#container') as HTMLElement;
        const children = getAllChildren(container);

        expect(children).toHaveLength(7);

        expect(children[0].tagName).toBe('DIV');
        expect(children[1].tagName).toBe('SPAN');
        expect(children[2].tagName).toBe('SPAN');
        expect(children[3].tagName).toBe('P');
        expect(children[4].tagName).toBe('UL');
        expect(children[5].tagName).toBe('LI');
        expect(children[6].tagName).toBe('LI');
    });

    it('should return an empty array if the given element has no children', () => {
        const paragraph = document.querySelector('.paragraph') as HTMLElement;
        const children = getAllChildren(paragraph);
        expect(children).toHaveLength(0);
    });

    it('should correctly handle elements with nested children', () => {
        const item = document.querySelector('.item') as HTMLElement;
        const children = getAllChildren(item);
        expect(children).toHaveLength(2);

        expect(children[0].tagName).toBe('SPAN');
        expect(children[1].tagName).toBe('SPAN');
    });
});
