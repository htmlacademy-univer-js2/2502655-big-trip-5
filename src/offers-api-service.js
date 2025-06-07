import ApiService from './framework/api-service.js';

const offersUrl = 'offers';

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({ url: offersUrl })
      .then(ApiService.parseResponse);
  }
}
