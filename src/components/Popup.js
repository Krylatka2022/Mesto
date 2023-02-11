export default class Popup { //ок
	constructor(popupSelector) {
		this._popupSelector = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
		// this._popupCloseButton = this._popupSelector.querySelector(".popup__close");
	}

	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	open() {
		this._popupSelector.classList.add("popup_opened");
		document.addEventListener("keydown", this._handleEscClose);
	}

	close() {
		this._popupSelector.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._handleEscClose);
	}

	setEventListeners() {
		this._popupSelector.addEventListener("mousedown", (evt) => {
			if (
				evt.target.classList.contains("popup") ||
				evt.target.classList.contains("popup__close")
			) {
				this.close();
			}
		});
	}
}
