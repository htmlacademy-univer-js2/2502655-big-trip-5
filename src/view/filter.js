export default class FilterView {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('filter');
    element.innerHTML = `
        <input type="radio" name="filter" id="filter-everything" checked>
        <label for="filter-everything">Everything</label>
      `;
    return element;
  }

  getElement() {
    return this.element;
  }
}
