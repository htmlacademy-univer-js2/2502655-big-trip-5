export default class CreateFormView {
    constructor() {
      this.element = this.createElement();
    }
  
    createElement() {
      const element = document.createElement('form');
      element.classList.add('create-form');
      element.innerHTML = `
        <input type="text" placeholder="New event">
        <button type="submit">Create</button>
      `;
      return element;
    }
  
    getElement() {
      return this.element;
    }
  }