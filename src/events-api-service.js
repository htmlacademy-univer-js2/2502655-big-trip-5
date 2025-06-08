import ApiService from './framework/api-service.js';

const eventsUrl = 'points';

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({ url: eventsUrl })
      .then(ApiService.parseResponse);
  }

  addEvent(event) {
    return this._load({
      url: eventsUrl,
      method: 'POST',
      body: JSON.stringify(event),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(ApiService.parseResponse);
  }

  updateEvent(event) {
    return this._load({
      url: `${eventsUrl}/${event.id}`,
      method: 'PUT',
      body: JSON.stringify(event),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(ApiService.parseResponse);
  }

  deleteEvent(event) {
    return this._load({
      url: `${eventsUrl}/${event.id}`,
      method: 'DELETE',
    });
  }

  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      'base_price': event.basePrice,
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      'is_favorite': event.isFavorite,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }