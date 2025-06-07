/**
      * Класс для отправки запросов к серверу
      */
export default class ApiService {
  /**
   * @param {string} endPoint Адрес сервера
   * @param {string} authorization Авторизационный токен
   */
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Метод для отправки запроса к серверу
   * @param {Object} config Объект с настройками
   * @param {string} config.url Адрес относительно сервера
   * @param {string} [config.method] Метод запроса
   * @param {string} [config.body] Тело запроса
   * @param {Headers} [config.headers] Заголовки запроса
   * @returns {Promise<any>}
   */
  async _load({ url, method = 'GET', body = null, headers = new Headers() }) {
    headers.append('Authorization', this._authorization);

    const response = await fetch(
      `${this._endPoint}${url ? '/' + url : ''}`, // Корректное формирование URL
      { method, body, headers }
    );

    try {
      ApiService.checkStatus(response);
      return await ApiService.parseResponse(response);
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  /**
   * Метод для получения списка точек маршрута
   * @returns {Promise<any>}
   */
  async getPoints() {
    return this._load({ url: 'points' });
  }

  /**
   * Метод для обработки ответа
   * @param {Response} response Объект ответа
   * @returns {Promise}
   */
  static parseResponse(response) {
    return response.json();
  }

  /**
   * Метод для проверки ответа
   * @param {Response} response Объект ответа
   */
  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  /**
   * Метод для обработки ошибок
   * @param {Error} err Объект ошибки
   */
  static catchError(err) {
    throw err;
  }
}