import {cards} from './Card.js'
	//createElements, renderElement, handleFormSubmitCards} 
//export {popupFormElementAdd}
//import * as all from './FormValidator.js'
import Card from './Card.js';
import  
{config, 
showError, 
hideError, 
checkValidateInput, 
hasInvalidInput, 
toggleButtonState, 
setEventListeners, 
enableValidation } from './FormValidator.js'
const profileButton = document.querySelector('.profile__edit-button'); //кнопка вызова редактирования профайла
const popupProfileEdit = document.querySelector('.popup_profile'); //попап для редактирования профайла
const popupCloseProfile = document.querySelector('.popup__close_type-profile'); //кнопка закрытия редактирования профайла
const profileTitle = document.querySelector('.profile__title'); //имя профайла
const profileSubtitle = document.querySelector('.profile__subtitle'); //род деятельности (о себе)
const profileFormElement = document.forms['profileFormElement']; //ok //форма попапа редактирования профиля
const popupFormElementAdd = document.forms['popupFormElementAdd'] //форма попапа добавления карточек
const inputName = document.querySelector('.popup__input_type_name'); //поле для ввода нового имени профайла
const inputAbout = document.querySelector('.popup__input_type_about'); //поле для ввода нового рода деятельности (о себе)


//открыть любой попап - рефакторинг 4+6 спринт
function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleEscapeDown);
};
//закрыть любой попап - рефакторинг 4+6 спринт
function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleEscapeDown);
	};

//Универсальный слушатель на закрытие всех попапов по "крестику"
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
	// находим 1 раз ближайший к "крестику" popup
	const popup = button.closest('.popup');
	// устанавливаем обработчик закрытия на крестик и overlay
	closePopupOverlay(popup);
	button.addEventListener('click', () => { closePopup(popup); });
});

//Рефакторинг функции открыть попап "редактировать профиль" - 4+5 спринт
/*Вызываем, добавляем класс при нажатии, отражаем в инпут-полях имя, заданное изначально по умолчанию*/
profileButton.addEventListener('click', function () { //Отслеживаем событие 'open'
	openPopup(popupProfileEdit);
	inputName.value = profileTitle.textContent;
	inputAbout.value = profileSubtitle.textContent;
});


/*Корректируем текст попапа "редактировать профиль", сохраняем, добавляеи в 'profile' - 4 спринт*/
function handleFormSubmitProfile(evt) {
	evt.preventDefault();
	profileTitle.textContent = inputName.value;
	profileSubtitle.textContent = inputAbout.value;
	closePopup(popupProfileEdit);
}

//Слушатель на событие корректирования попапа "редактировать профиль"
profileFormElement.addEventListener('submit', handleFormSubmitProfile);


//закрываем попап по нажатию кнопки Escape - 6 спринт
function handleEscapeDown(evt) {
	if (evt.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		closePopup(popupOpened);
	}
}

//закрываем попап по клику на оверлей - 6 спринт
function closePopupOverlay(popup) {
	popup.addEventListener('mousedown', function (evt) {
		if (evt.target == popup) {
			closePopup(popup);
		} 
	})
}


