
import Observable from '../framework/observable.js';
// import {FilterType} from '../mock/const.js';
import { FilterType } from '../utils/filter.js';

// export const FilterType = {
//   EVERYTHING: 'EVERYTHING',
//   FUTURE: 'FUTURE',
//   PRESENT: 'PRESENT',
//   PAST: 'PAST'
// };

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  // get() {
  //   return this.#filter;
  // }

  // set(updateType, update) {
  //   this.#filter = update;
  //   this._notify(updateType, update);
  // }
  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
