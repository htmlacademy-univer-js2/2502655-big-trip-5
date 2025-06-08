import AbstractView from '../framework/view/abstract-view';
import {SortType, extractSortValue} from '../utils/sort';

const enabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false,
};

const createSortItem = (sortItem) => `
  <div class="trip-sort__item trip-sort__item--${sortItem.type}">
    <input
      id="sort-${sortItem.type}"
      class="trip-sort__input visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sortItem.type}"
      ${(sortItem.isChecked) ? 'checked' : ''}
      ${(sortItem.isDisabled) ? 'disabled' : ''}
    >
    <label
      class="trip-sort__btn"
      for="sort-${sortItem.type}"
    >
      ${sortItem.type}
    </label>
  </div>
 `;

const createSortTemplate = ({sortMap}) => {
  const sortItemsTemplate = sortMap.reduce((template, sortItem) => template + createSortItem(sortItem), '');

  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>
  `;
};

export default class SortView extends AbstractView {
  #sortMap = null;
  #handleSortTypeChange = null;

  constructor({sortType, onSortTypeChange}) {
    super();

    this.#sortMap = Object.values(SortType)
      .map((type) => ({
        type,
        isChecked: (type === sortType),
        isDisabled: !enabledSortType[type]
      }));

    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate({sortMap: this.#sortMap});
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(extractSortValue(evt.target.value));
  };
}
