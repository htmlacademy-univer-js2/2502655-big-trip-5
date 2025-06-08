export default class ApiService {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  async _load({ url, method = 'GET', body = null, headers = new Headers() }) {
    const requestHeaders = new Headers(headers);
    requestHeaders.set('Authorization', this._authorization);

    const response = await fetch(
      `${this._endPoint}/${url}`,
      {
        method,
        body,
        headers: requestHeaders
      }
    );

    ApiService.checkStatus(response);
    return response;
  }

  async getPoints() {
    return this._load({ url: 'points' });
  }

  static parseResponse(response) {
    if (!response || typeof response.json !== 'function') {
      throw new Error('Invalid response: No JSON data available');
    }
    return response.json();
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError(err) {
    // intentionally left blank
  }
}
