
export default class Card {
	constructor(
		item,
		templateSelector,
		handleCardClick
		//popupPreviewImage,
	) {
		this._item = item;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;

		//this._popupPreviewImage = popupPreviewImage;
	};

	_deleteElement = () => {
		this._cardElement.remove() == null;
	}

	_likeElement = () => {
		this._elementLike.classList.toggle('element__like_active');//ok
	}


	_setListenersItems() {
		this._elementDelete.addEventListener('click', this._deleteElement);
		this._elementLike.addEventListener('click', this._likeElement);
		this._elementImg.addEventListener('click', () => {
			this._handleCardClick(this._item.name, this._item.link)
		})
	}
	_getTemplate() {

		// забираем разметку из HTML и клонируем элемент
		this._cardElement = document
			.querySelector(this._templateSelector)
			.content.querySelector('.element') //article, li
			.cloneNode(true);

		// вернём DOM-элемент карточки
		return this._cardElement;
	}

	createElements() {
		this._element = this._getTemplate();//ok
		this._elementImg = this._cardElement.querySelector('.element__image'); //найдем картинку и запишем в переменную чтобы не искать несколько раз
		this._elementTitle = this._cardElement.querySelector('.element__title'); //заголовок
		this._elementDelete = this._cardElement.querySelector('.element__delete');
		this._elementLike = this._cardElement.querySelector('.element__like'); //добавляем функциональность лайкам

		this._elementTitle.textContent = this._item.name;//ok
		this._elementImg.alt = this._item.name;//ok
		this._elementImg.src = this._item.link //ok

		this._setListenersItems();
		return this._element;
	}
}

