import { sort } from '../utils/sort';
import { UpdateType } from '../utils/const';
import Observable from '../framework/observable';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #events = [];
  #destinationsModel = null;
  #offersModel = null;

  constructor({ eventsApiService, destinationsModel, offersModel }) {
    super();
    this.#eventsApiService = eventsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  getEvents(sortType) {
    const sortedEvents = [...this.#events];
    if (sortType) {
      sort[sortType](sortedEvents);
      return sortedEvents;
    }
    return this.#events;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init(),
      ]);

      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch (err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const adaptedEvent = this.#adaptToServer(update);
      const response = await this.#eventsApiService.updateEvent(adaptedEvent);
      const updatedEvent = this.#adaptToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const adaptedEvent = this.#adaptToServer(update);
      const response = await this.#eventsApiService.addEvent(adaptedEvent);
      const newEvent = this.#adaptToClient(response);
  
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);

      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : null,
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : null,
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }

  #adaptToServer(event) {
    return {
      type: event.type,
      'base_price': Number(event.basePrice),
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : event.dateFrom,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : event.dateTo,
      'destination': event.destination,
      'offers': Array.isArray(event.offers)
        ? event.offers.map((offer) => typeof offer === 'object' ? offer.id : offer)
        : [],
      'is_favorite': Boolean(event.isFavorite),
    };
  }
}