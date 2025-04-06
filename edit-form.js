export default class EditFormView {
    constructor(point) {
      this.point = point;
      this.element = this.createElement();
      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleClose = this._handleClose.bind(this);
    }
  
    createElement() {
      const element = document.createElement('form');
      element.classList.add('edit-form');
      element.innerHTML = `
        <input type="text" placeholder="Edit event" value="${this.point.type}">
        <input type="text" placeholder="Destination" value="${this.point.destination.name}">
        <button type="submit">Save</button>
        <button type="button" class="close-button">↑</button>
      `;
      return element;
    }
  
    setSubmitHandler(callback) {
      this._callback.submit = callback;
      this.element.addEventListener('submit', this._handleSubmit);
    }
  
    setCloseHandler(callback) {
      this._callback.close = callback;
      this.element.querySelector('.close-button').addEventListener('click', this._handleClose);
    }
  
    _handleSubmit(event) {
      event.preventDefault();
      this._callback.submit();
    }
  
    _handleClose() {
      this._callback.close();
    }
  
    getElement() {
      return this.element;
    }
  }