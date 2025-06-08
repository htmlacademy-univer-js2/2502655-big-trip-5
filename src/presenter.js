import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import CreateFormView from './view/create-form.js';
import EditFormView from './view/edit-form.js';
import PointView from './view/point.js';
import Model from './model/model.js';
import { render, replace } from './render.js';

export default class Presenter {
constructor() {
this.model = new Model();

ini
Копировать
Редактировать
this.filterView = new FilterView();
this.sortView = new SortView();
this.createFormView = new CreateFormView();

this._escHandlers = new Map(); // Хранит обработчики для каждой пары представлений
}

init() {
const mainElement = document.querySelector('.trip-events');

javascript
Копировать
Редактировать
render(this.filterView, mainElement);
render(this.sortView, mainElement);
render(this.createFormView, mainElement);

const points = this.model.getPoints();

points.forEach((point) => {
  const pointView = new PointView(point);
  const editFormView = new EditFormView(point);

  const escHandler = (evt) => {
    if (evt.key === 'Escape') {
      replace(pointView, editFormView);
      document.removeEventListener('keydown', escHandler);
    }
  };

  pointView.setOpenHandler(() => {
    replace(editFormView, pointView);
    document.addEventListener('keydown', escHandler);
  });

  editFormView.setSubmitHandler(() => {
    replace(pointView, editFormView);
    document.removeEventListener('keydown', escHandler);
  });

  editFormView.setCloseHandler(() => {
    replace(pointView, editFormView);
    document.removeEventListener('keydown', escHandler);
  });

  render(pointView, mainElement);
});
}
}