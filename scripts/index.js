import FormValidator from './FormValidator.js';
import Card from './Card.js';
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
const validationConfig = {
	formSelector: '.popup__form', //ok
	inputSelector: '.popup__input', //ok
	submitButtonSelector: '.popup__submit-button', //добавлено новое
	inactiveButtonClass: 'popup__submit-button_disabled', ////добавлено новое, по умолчанию новое при открытии
	inputErrorClass: 'popup__input_type_invalid', //добавлено новое
	errorClass: 'popup__error_visible' //добавлено новое
};

const profileButton = document.querySelector('.profile__edit-button'); //кнопка вызова редактирования профайла
const popupProfileEdit = document.querySelector('.popup_profile'); //попап для редактирования профайла
const popupCloseProfile = document.querySelector('.popup__close_type-profile'); //кнопка закрытия редактирования профайла
const profileTitle = document.querySelector('.profile__title'); //имя профайла
const profileSubtitle = document.querySelector('.profile__subtitle'); //род деятельности (о себе)
const profileFormElement = document.forms['profileFormElement']; //ok //форма попапа редактирования профиля
const popupFormElementAdd = document.forms['popupFormElementAdd'] //форма попапа добавления карточек
const inputName = document.querySelector('.popup__input_type_name'); //поле для ввода нового имени профайла
const inputAbout = document.querySelector('.popup__input_type_about'); //поле для ввода нового рода деятельности (о себе)
const elementsContainer = document.querySelector('.elements'); //ok // контейнер, куда добавляются элементы из массива
const inputNameCard = document.querySelector('.popup__input_type_name-card'); //ok //поле для названия добавленной карточки
const inputUrlCard = document.querySelector('.popup__input_type_url-card'); //ok // поле для ссылки добавленной карточки
const popupPreview = document.querySelector('.popup_type_preview'); // попап для увеличения фото
const popupPreviewImage = document.querySelector('.popup__preview-image'); //для увеличения фото, большая картинка;
const popupPreviewTitle = document.querySelector('.popup__preview-title'); //для увеличения фото, надпись под большой картинкой
const popupClosePreview = document.querySelector('.popup__close_type-preview'); ////для увеличения фото, кнопка-контейнер
const profileCardsAddButton = document.querySelector('.profile__add-button'); // Кнопка на профиле добавления карточек-новых мест
const popupCards = document.querySelector('.popup_cards'); //ok//попап для добавления карточек

const validatePopupProfileEdit = new FormValidator(validationConfig, popupProfileEdit);
validatePopupProfileEdit.enableValidation();

const validatePopupFormElementAdd = new FormValidator(validationConfig, popupFormElementAdd);
validatePopupFormElementAdd.enableValidation();

//Функция попапа увеличения картинки - рефакторинг, 7 спринт
function handleCardClick(item) {
	popupPreviewImage.src = item.link;
	popupPreviewImage.alt = item.name;
	popupPreviewTitle.textContent = item.name;
	openPopup(popupPreview);
};

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

//функция создает карточку через createElements и добавляет ее в DOM - 5 спринт + 7 спринт
function renderElement(item) {
	const element = new Card(item, '#element-template', handleCardClick);
	const cardElement = element.createElements();
	return cardElement
};

function elementsPrepend(item) {
	elementsContainer.prepend(renderElement(item));
}

initialCards.forEach((item) => {
	elementsPrepend(item);
})
popupFormElementAdd.addEventListener('submit', handleFormSubmitCards);

profileCardsAddButton.addEventListener('click', function () {
	popupFormElementAdd.reset();
	openPopup(popupCards);
});

//Функция кнопки Создать (карточку), по данным пользователя, обновляя значения для последующего добавления - 5 спринт + 7 спринт
function handleFormSubmitCards(evt) {
	evt.preventDefault();
	elementsPrepend({
		name: inputNameCard.value, // добавляем название
		link: inputUrlCard.value // добавляем ссылку
	});
	//evt.target.reset();
	closePopup(popupCards); //закрываем попап
};
