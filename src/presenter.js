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
import Model from './model/model.js';
import PointView from './view/point.js';
import EditFormView from './view/edit-form.js';
import { render, replace } from './render.js';

export default class Presenter {
  constructor() {
    this.model = new Model();
  }

  init() {
    const mainElement = document.querySelector('.trip-events');
    mainElement.prepend(this.editFormView.getElement());
    mainElement.append(this.createFormView.getElement());
    mainElement.append(this.filterView.getElement());
    mainElement.append(this.sortView.getElement());
    this.pointViews.forEach((pointView) => mainElement.append(pointView.getElement()));
    const points = this.model.getPoints();

    points.forEach((point) => {
      const pointView = new PointView(point);
      const editFormView = new EditFormView(point);

      pointView.setOpenHandler(() => {
        replace(editFormView, pointView);
        document.addEventListener('keydown', this._handleEscKey.bind(this, editFormView, pointView));
      });

      editFormView.setSubmitHandler(() => {
        replace(pointView, editFormView);
        document.removeEventListener('keydown', this._handleEscKey);
      });

      editFormView.setCloseHandler(() => {
        replace(pointView, editFormView);
        document.removeEventListener('keydown', this._handleEscKey);
      });

      render(pointView, mainElement);
    });
  }

  _handleEscKey(editFormView, pointView, event) {
    if (event.key === 'Escape') {
      replace(pointView, editFormView);
      document.removeEventListener('keydown', this._handleEscKey);
    }
  }
}