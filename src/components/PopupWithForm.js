import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._popupForm = this._popupSelector.querySelector('.popup__form');
		this._inputs = this._popupSelector.querySelectorAll('.popup__input');

		this._submitButtonElement = this._popupSelector.querySelector('.popup__submit-button');


	}

	/** _getInputValues - приватный метод: собрать данные всех полей формы. */
	_getInputValues() {
		this._formValues = {};
		this._inputs.forEach((input) => {
			this._formValues[input.name] = input.value
		});
		return this._formValues;
	};

	/** перезаписать родительский метод setEventListeners */
	setEventListeners() {

		this._popupSelector.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
			this.close()
		})
		super.setEventListeners();
	}

	/** перезаписать родительский метод close */
	close() {

		this._popupForm.reset();
		super.close();
	}
}
