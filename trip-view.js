import AbstractView from './abstract-view';

export default class TripView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  // Реализация геттера шаблона
  get template() {
    return `
      <div class="trip">
        <h2>${this._data.title}</h2>
        <p>${this._data.description}</p>
      </div>
    `;
  }

  // Переопределение метода bind для добавления обработчиков событий
  bind(element) {
    element.querySelector('.trip').addEventListener('click', this._handleClick);
  }

  _handleClick = () => {
    console.log('Trip clicked!');
  };
}