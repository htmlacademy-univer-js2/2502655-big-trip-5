import { generatePoints } from './mock.js';

export default class Model {
  constructor() {
    this.points = generatePoints();
  }

  getPoints() {
    return this.points;
  }
}