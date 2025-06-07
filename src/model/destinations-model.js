export default class DestinationModel {
  #destinations = null;
  #service = null;

  constructor({ destinationsApiService }){
    this.#service = destinationsApiService;
  }

  async init() {
    this.#destinations = await this.#service.destinations; //getDestinations();
    return this.#destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.get().find((destination) => destination.id === id);
  }

  getByName(name) {
    return this.get().find((destination) => destination.name === name);
  }
}
