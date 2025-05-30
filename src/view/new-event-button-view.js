import AbstractView from '../framework/view/abstract-view';

const createNewEventButtonTemplate = () => {
  const newEventButtonLabel = 'New event';

  return (
    `
    <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">
      ${newEventButtonLabel}
    </button>
    `
  );
};

export default class NewEventButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}