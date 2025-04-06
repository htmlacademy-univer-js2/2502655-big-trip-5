import Point from './point.js';
import Destination from './destination.js';
import Option from './option.js';

const generateRandomPhoto = () => `https://loremflickr.com/248/152?random=${Math.random()}`;

const generateOptions = () => [
  new Option('luggage', 'Add luggage', 30),
  new Option('comfort', 'Switch to comfort class', 100),
  new Option('meal', 'Add meal', 15),
  new Option('seats', 'Choose seats', 5),
];

const generateDestinations = () => [
  new Destination('Amsterdam', 'A beautiful city with canals.', [generateRandomPhoto(), generateRandomPhoto()]),
  new Destination('Berlin', 'The capital of Germany.', [generateRandomPhoto(), generateRandomPhoto()]),
  new Destination('Paris', 'The city of love.', [generateRandomPhoto(), generateRandomPhoto()]),
];

export const generatePoints = () => {
  const destinations = generateDestinations();
  const options = generateOptions();

  return [
    new Point('taxi', destinations[0], options, new Date(), new Date(), 100),
    new Point('bus', destinations[1], options, new Date(), new Date(), 200),
    new Point('train', destinations[2], options, new Date(), new Date(), 150),
  ];
};