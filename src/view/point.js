export default class PointView {
  constructor(point) {
    this.point = point;
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('point');
    element.innerHTML = `
      <span>Point</span>
      <h3>${this.point.type}</h3>
      <p>${this.point.destination.name}</p>
      <p>${this.point.destination.description}</p>
      <p>Price: ${this.point.price}</p>
      <img src="${this.point.destination.photos[0]}" alt="${this.point.destination.name}">
    `;
    return element;
  }

  getElement() {
    return this.element;
  }
}
