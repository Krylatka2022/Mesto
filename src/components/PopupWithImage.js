import Popup from './Popup.js'

export default class PopupWithImage extends Popup { //ok
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._popupElement.querySelector('.popup__preview-image')
		this._popupImageTitle = this._popupElement.querySelector('.popup__preview-title')
	}

	open(name, link) {
		super.open();

		this._popupImageTitle.textContent = name;
		this._popupImage.src = link;
		this._popupImage.alt = name;
	}
}
