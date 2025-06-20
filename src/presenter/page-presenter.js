import NoEventsView from '../view/no-events-view';
import LoadingView from '../view/loading-view';
import EventsListView from '../view/events-list-view';
import TripInfoPresenter from '../presenter/trip-info-presenter';
import SortPresenter from './sort-presenter';
import EventPresenter from './event-presenter';
import NewEventPresenter from './new-event-presenter';
import { remove, render } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import { SortType } from '../utils/sort';
import { UpdateType, UserAction } from '../utils/const';
import { filter, FilterType } from '../utils/filter';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class PagePresenter {
  #newEventButton = null;
  #eventsListComponent = new EventsListView();
  #loadingComponent = new LoadingView();
  #noEventsComponent = null;

  #mainContainer = null;
  #eventsContainer = null;
  #eventsModel = null;
  #tripInfoPresenter = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #sortPresenter = null;

  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #isCreating = false;
  #isLoading = true;

  #currentSortType = SortType.DAY;

  #destinationsModel = null;
  #offersModel = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ mainContainer, eventsContainer, eventsModel, destinationsModel, newEventButton, offersModel, filterModel, onNewEventDestroy }) {
    this.#mainContainer = mainContainer;
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newEventButton = newEventButton;

    this.#tripInfoPresenter = new TripInfoPresenter({
      tripInfoContainer: this.#mainContainer,
      eventsModel: this.#eventsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    this.#sortPresenter = new SortPresenter({
      container: this.#eventsContainer,
      eventsModel: this.#eventsModel,
      onSortFormChange: this.#handleSortFormChange,
    });

    this.#newEventPresenter = new NewEventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      onDataChange: this.handleViewAction.bind(this),
      onDestroy: onNewEventDestroy,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      resetCreating: this.resetCreating,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  getEvents(sortType) {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.getEvents(sortType);
    return filter[this.#filterType](events);
  }

  init() {
    this.#renderBoard();
  }

  createEvent() {
    this.#isCreating = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  async handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        if (!update.id) {
          return;
        }

        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch {
          this.#newEventPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_EVENT: {
        const presenter = this.#eventPresenters.get(update.id);
        if (!presenter) {
          return;
        }

        presenter.setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
          presenter.destroy();
          this.#eventPresenters.delete(update.id);
        } catch {
          presenter.setAborting();
        }
        break;
      }
    }

    this.#uiBlocker.unblock();
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortFormChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo() {
    this.#tripInfoPresenter.init();
  }

  #renderSort() {
    this.#sortPresenter.destroy(this.#currentSortType);
    this.#sortPresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #renderNoEventsIfNeeded() {
    if (!this.getEvents().length && !this.#isCreating) {
      this.#noEventsComponent = new NoEventsView({
        filterType: this.#offersModel.offers?.length ? this.#filterType : FilterType.EMPTY,
      });

      render(this.#noEventsComponent, this.#eventsContainer);
      this.#sortPresenter.destroy();
    }
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.handleViewAction.bind(this),
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderBoard() {
    this.#renderTripInfo();
    this.#renderSort();
    render(this.#eventsListComponent, this.#eventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderNoEventsIfNeeded();

    for (const event of this.getEvents(this.#currentSortType)) {
      this.#renderEvent(event);
    }
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    this.#renderSort();
  }

  resetCreating = () => {
    this.#isCreating = false;
    this.#newEventButton.disabled = false;
    this.#renderNoEventsIfNeeded();
  };
}
