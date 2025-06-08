export default class EditFormView {
  constructor(point) {
    this.point = point;
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('form');
    element.classList.add('edit-form');
    element.innerHTML = `
      <input type="text" placeholder="Edit event" value="${this.point.type}">
      <input type="text" placeholder="Destination" value="${this.point.destination.name}">
      <button type="submit">Save</button>
    `;
    return element;
  }

  getElement() {
    return this.element;
  }
}
