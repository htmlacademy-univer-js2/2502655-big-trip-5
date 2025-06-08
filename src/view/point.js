export default class PointView {
  constructor(point) {
    this.point = point;
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('point');

    const { type, destination, basePrice } = this.point;
    const description = destination?.description || '';
    const name = destination?.name || '';
    const photo = destination?.pictures?.[0]?.src || '';

    element.innerHTML = `
      <span>Point</span>
      <h3>${type}</h3>
      <p>${name}</p>
      <p>${description}</p>
      <p>Price: €${basePrice}</p>
      <img src="${photo}" alt="${name}">
    `;

    return element;
  }

  getElement() {
    return this.element;
  }
}
