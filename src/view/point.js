export default class PointView {
    constructor() {
      this.element = this.createElement();
    }
  
    createElement() {
      const element = document.createElement('div');
      element.classList.add('point');
      element.innerHTML = `
        <span>Point</span>
      `;
      return element;
    }
  
    getElement() {
      return this.element;
    }
  }