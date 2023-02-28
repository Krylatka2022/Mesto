
import Popup from './Popup.js'
export default class PopupWithConfirmation extends Popup {
    constructor(selector, handleDeleteClick) {
        super(selector);
        this._submitButton = this._popupElement.querySelector('.popup__submit-button');
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._handleDeleteClick = handleDeleteClick;
    }

    renderLoading(isLoading) {
        if (isLoading === true) {
            this._submitButton.textContent = 'Удаление...';
        } else {
            this._submitButton.textContent = 'Да';
        }
    }

    open(id, cardItem) {
        super.open()
        this._id = id;
        this._card = cardItem
    }

    setEventListeners() {

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleDeleteClick(this._id, this._card)
        });
        super.setEventListeners();
    }

    //удалить карточку со страницы
    deleteCard() {
        this._card.remove();
    }
}