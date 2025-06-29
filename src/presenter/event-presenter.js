import { render, replace, remove } from '../framework/render';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';
import { UserAction, UpdateType } from '../utils/const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  constructor({ eventsListContainer, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.eventsListContainer = eventsListContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.handleDataChange = onDataChange;
    this.handleModeChange = onModeChange;

    this.eventComponent = null;
    this.eventEditComponent = null;

    this.event = null;
    this.mode = Mode.DEFAULT;
    this.destinations = [];
    this.offers = [];
  }

  init(event) {
    this.event = event;
    this.destinations = this.destinationsModel.destinations;
    this.offers = this.offersModel.offers;

    const prevEventComponent = this.eventComponent;
    const prevEventEditComponent = this.eventEditComponent;

    this.eventComponent = new EventView({
      event: this.event,
      destinations: this.destinations,
      offers: this.offers,
      onEditClick: this.handleEditClick,
      onFavoriteClick: this.handleFavoriteClick,
    });

    this.eventEditComponent = new EventEditView({
      event: this.event,
      destinations: this.destinations,
      offers: this.offers,
      onFormSubmit: this.handleFormSubmit,
      onResetClick: this.handleResetClick,
      onDeleteClick: this.handleDeleteClick,
    });

    if (!prevEventComponent || !prevEventEditComponent) {
      render(this.eventComponent, this.eventsListContainer);
      return;
    }

    if (this.mode === Mode.DEFAULT) {
      replace(this.eventComponent, prevEventComponent);
    } else if (this.mode === Mode.EDITING) {
      replace(this.eventComponent, prevEventEditComponent);
      this.mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.eventComponent);
    remove(this.eventEditComponent);
  }

  resetView() {
    if (this.mode !== Mode.DEFAULT) {
      this.eventEditComponent.reset(this.event);
      this.replaceFormToCard();
    }
  }

  setSaving() {
    if (this.mode === Mode.EDITING) {
      this.eventEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.mode === Mode.EDITING) {
      this.eventEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.mode === Mode.DEFAULT) {
      this.eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.eventEditComponent.shake(resetFormState);
  }

  replaceCardToForm() {
    replace(this.eventEditComponent, this.eventComponent);
    document.addEventListener('keydown', this.escKeyDownHandler);
    this.handleModeChange();
    this.mode = Mode.EDITING;
  }

  replaceFormToCard() {
    replace(this.eventComponent, this.eventEditComponent);
    document.removeEventListener('keydown', this.escKeyDownHandler);
    this.mode = Mode.DEFAULT;
  }

  escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.eventEditComponent.reset(this.event);
      this.replaceFormToCard();
    }
  };

  handleEditClick = () => {
    this.replaceCardToForm();
  };

  handleResetClick = () => {
    this.eventEditComponent.reset(this.event);
    this.replaceFormToCard();
  };

  handleFormSubmit = (event) => {
    if (!event.id) {
      return;
    }

    this.handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  handleDeleteClick = (event) => {
    this.handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  handleFavoriteClick = () => {
    if (!this.event.id) {
      return;
    }

    const updatedEvent = { ...this.event, isFavorite: !this.event.isFavorite };

    this.handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      updatedEvent
    );
  };
}
