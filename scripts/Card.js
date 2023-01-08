const initialCards = [{
	name: 'Архыз',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
	name: 'Челябинская область',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
	name: 'Иваново',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
	name: 'Камчатка',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
	name: 'Холмогорский район',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
	name: 'Байкал',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];
const popupCards = document.querySelector('.popup_cards'); //ok//попап для добавления карточек
const inputNameCard = document.querySelector('.popup__input_type_name-card'); //ok //поле для названия добавленной карточки
const inputUrlCard = document.querySelector('.popup__input_type_url-card'); //ok // поле для ссылки добавленной карточки
const popupCloseCards = document.querySelector('.popup__close_type-cards'); //ok //кнопка закрытия попапа для добавления карточек
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element'); //element из template для добавления в elements
const elementsContainer = document.querySelector('.elements'); //ok // контейнер, куда добавляются элементы из массива
const elementImg = document.querySelector('.element__image'); //ok
const elementTitle = document.querySelector('.element__title'); //ok
const elementLike = document.querySelector('.element__like');
const elementDelete = document.querySelector('.element__delete') //ok
const profileCardsAddButton = document.querySelector('.profile__add-button'); // Кнопка на профиле добавления карточек-новых мест
const popupPreview = document.querySelector('.popup_type_preview'); // попап для увеличения фото
const popupPreviewImage = popupPreview.querySelector('.popup__preview-image'); //для увеличения фото, большая картинка;
const popupPreviewTitle = popupPreview.querySelector('.popup__preview-title'); //для увеличения фото, надпись под большой картинкой
const popupClosePreview = document.querySelector('.popup__close_type-preview'); ////для увеличения фото, кнопка-контейнер
const templateSelector = document.querySelector('#element-template');

export { initialCards as cards}
 //createElements, renderElement, handleFormSubmitCards };

import { config } from "./FormValidator.js";


export default class Card {
    constructor(item, templateSelector) {
	this._elementItem = this._templateSelector.cloneNode(true); //клонируем элементы template
	console.log(elementImg)
	//this._elementTitle = this._elementItem.querySelector('.element__title'); //получаем элемент - название карточки
	//this._elementImg = this._elementItem.querySelector('.element__image'); // получаем элемент - картинку в карточке
	

	// this._elementTitle.textContent = this._name; //устанавливаем значение для названия карточки
	// this._elementImg.src = this._link; //устанавливаем ссылку на картинку
	// this._elementImg.alt = this._name; //устанавливаем значение атрибута alt для кар
    //   this._name = data.name;
    //   this._link = data.link;
    //   this._templateSelector = templateSelector;
      //this._popupPreview = popupPreview; 
	this._elementLike = this._elementItem.querySelector('.element__like'); //добавляем функциональность лайкам
	this._elementLike.addEventListener('click', function () { //Слушатель на функцию добавления лайка
		elementLike.classList.toggle('element__like_active');
	});
	this._elementDelete = this._elementItem.querySelector('.element__delete'); //добавляем функциональность корзинам
	this._elementDelete.addEventListener('click', function () { //Слушатель на функцию корзины
		elementDelete.closest('.element').remove();
	});
	this._elementPreview = this._elementItem.querySelector('.element__preview'); //увеличиваем картинку
	this._elementPreview.addEventListener('click', function () { //Слушатель на функцию увеличения картинки
			this._popupPreviewTitle.textContent = item.name;
			this._popupPreviewImage.src = item.link;
			this._popupPreviewImage.alt = item.name;
			openPopup(popupPreview);
		});
          }
		  _openPopup() {
			popupImage.src = this._image;
			popupElement.classList.add('popup_opened');
		  } 
			_closePopup() {
			popupImage.remove = this._image;
			popupElement.classList.remove('popup_opened');
		  } 
			_setEventListeners() {
			this._element.addEventListener('click', () => {
		  this._openPopup(); 
			});
		  
			closePopup.addEventListener('click', () => {
			  this._closePopup();// закройте попап
			});
		  }
			
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
      const cardElement = document
      .querySelector(this._elementItem)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
    // вернём DOM-элемент карточки
      return cardElement;
}
generateCard(){
	this._element = this._getTemplate();//ok
	this._setEventListeners();
	this._elementImg = this._elementImg.querySelector('.element__image'); //найдем картинку и запишем в переменную чтобы не искать несколько раз
	this._elementTitle = this._elementTitle.querySelector('.element__title'); //заголовок

	this._elementTitle.textContent = this._name;//ok
	this._elementImg.alt = this._name;//ok
	this._elementImg.src = this._link;//ok
	
	return this._element;
}

}
initialCards.forEach((element) => {
	const card = new Card(element, '#element-template');
	const cardElement = card.generateCard();
  
	// Добавляем в DOM
	document.querySelector('.elements').append(cardElement);
  }); 
