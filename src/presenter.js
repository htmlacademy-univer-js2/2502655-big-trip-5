import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import CreateFormView from './view/create-form.js';
import EditFormView from './view/edit-form.js';
import PointView from './view/point.js';

export default class Presenter {
  constructor() {
    this.filterView = new FilterView();
    this.sortView = new SortView();
    this.createFormView = new CreateFormView();
    this.editFormView = new EditFormView();
    this.pointViews = [new PointView(), new PointView(), new PointView()];
  }

  init() {
    const mainElement = document.querySelector('.trip-events');
    mainElement.prepend(this.editFormView.getElement());
    mainElement.append(this.createFormView.getElement());
    mainElement.append(this.filterView.getElement());
    mainElement.append(this.sortView.getElement());
    this.pointViews.forEach((pointView) => mainElement.append(pointView.getElement()));
  }
}