import {createElement} from '../render.js';

export default class AbstractView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('Template is not implemented');
  }

  removeElement() {
    this.#element = null;
  }
}