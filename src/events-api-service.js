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
}
