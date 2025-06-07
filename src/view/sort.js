export default class SortView {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('sort');
    element.innerHTML = `
        <span>Sort by:</span>
        <button>Day</button>
        <button>Event</button>
        <button>Time</button>
        <button>Price</button>
      `;
    return element;
  }

  getElement() {
    return this.element;
  }
}
