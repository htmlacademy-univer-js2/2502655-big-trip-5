import PagePresenter from './presenter/page-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import EventsModel from './model/events-model.js';
import EventsApiService from './events-api-service.js';
import DestinationsApiService from './destinations-api-service.js';
import OffersApiService from './offers-api-service.js';

const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic eo0w590ik29889a';

const tripMainElement = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION),
});

const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION),
});

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION),
  destinationsModel: destinationsModel,
  offersModel: offersModel,
});

const filterModel = new FilterModel();
const newEventButton = document.querySelector('.trip-main__event-add-btn');
const pagePresenter = new PagePresenter({
  mainContainer: tripMainElement,
  eventsContainer,
  eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  newEventButton,
  onNewEventDestroy: () => pagePresenter.resetCreating(),
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripMainElement.querySelector('.trip-controls__filters'),
  filterModel,
  eventsModel,
});

async function initializeApp() {
  try {
    await Promise.all([
      destinationsModel.init(),
      offersModel.init(),
      eventsModel.init(),
    ]);
    //console.log('All models initialized successfully');
   // console.log('EventsModel:', eventsModel.getEvents());
   // console.log('DestinationsModel:', destinationsModel.destinations);
   // console.log('OffersModel:', offersModel.offers);
    pagePresenter.init();
    filterPresenter.init();
  } catch (err) {
    //console.error('Failed to initialize models:', err.message);
    pagePresenter.init();
    filterPresenter.init();
  }
}

initializeApp();
const start = async () => {
  await initializeApp();
  newEventButton.addEventListener('click', () => {
    pagePresenter.createEvent();
  });
};

start();
