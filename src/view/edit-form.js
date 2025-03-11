export default class EditFormView {
    constructor() {
      this.element = this.createElement();
    }
  
    createElement() {
      const element = document.createElement('form');
      element.classList.add('edit-form');
      element.innerHTML = `
        <input type="text" placeholder="Edit event">
        <button type="submit">Save</button>
      `;
      return element;
    }
  
    getElement() {
      return this.element;
    }
  }