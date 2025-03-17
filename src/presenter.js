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