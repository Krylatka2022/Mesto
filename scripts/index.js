const profileButton = document.querySelector('.profile__edit-button'); //кнопка вызова редактирования профайла
const popupProfileEdit = document.querySelector('.popup_profile'); //попап для редактирования профайла
const popupCloseProfile = document.querySelector('.popup__close_type-profile'); //кнопка закрытия редактирования профайла
const profileTitle = document.querySelector('.profile__title'); //имя профайла
const profileSubtitle = document.querySelector('.profile__subtitle'); //род деятельности (о себе)
const profileFormElement = document.forms['profileFormElement']; //ok //форма попапа редактирования профиля
const popupFormElementAdd = document.forms['popupFormElementAdd'] //форма попапа добавления карточек
const inputName = document.querySelector('.popup__input_type_name'); //поле для ввода нового имени профайла
const inputAbout = document.querySelector('.popup__input_type_about'); //поле для ввода нового рода деятельности (о себе)
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

initialCards.forEach(renderElement);

//Добавили карточки из массива, к ним лайки и удаление карточек - 5 спринт
function createElements(item) {
	const elementItem = elementTemplate.cloneNode(true); //клонируем элементы template
	const elementTitle = elementItem.querySelector('.element__title'); //получаем элемент - название карточки
	const elementImg = elementItem.querySelector('.element__image'); // получаем элемент - картинку в карточке
	elementTitle.textContent = item.name; //устанавливаем значение для названия карточки
	elementImg.src = item.link; //устанавливаем ссылку на картинку
	elementImg.alt = item.name; //устанавливаем значение атрибута alt для картинки

	const elementLike = elementItem.querySelector('.element__like'); //добавляем функциональность лайкам
	elementLike.addEventListener('click', function () { //Слушатель на функцию добавления лайка
		elementLike.classList.toggle('element__like_active');
	});

	const elementDelete = elementItem.querySelector('.element__delete'); //добавляем функциональность корзинам
	elementDelete.addEventListener('click', function () { //Слушатель на функцию корзины
		elementDelete.closest('.element').remove();
	});

	const elementPreview = elementItem.querySelector('.element__preview'); //увеличиваем картинку
	elementPreview.addEventListener('click', function () { //Слушатель на функцию увеличения картинки
		popupPreviewTitle.textContent = item.name;
		popupPreviewImage.src = item.link;
		popupPreviewImage.alt = item.name;
		openPopup(popupPreview);
	});
	return elementItem; //возвращаем готовый элемент по шаблону template
}

//функция создает карточку через createElements и добавляет ее в DOM - 5 спринт
function renderElement(item) {
	const elementCard = createElements(item);
	elementsContainer.append(elementCard);
}

//Рефакторинг слушателя на открытие попапа добавления карточек - 5+6 спринт
profileCardsAddButton.addEventListener('click', function () {
	submitButton = popupFormElementAdd.querySelector(validationConfig.submitButtonSelector);
	submitButton.classList.add(validationConfig.inactiveButtonClass);
	submitButton.setAttribute('disabled', true);
	popupFormElementAdd.reset();
	openPopup(popupCards);
});

//Функция кнопки Создать (карточку), по данным пользователя, обновляя значения для последующего добавления - 5 спринт
function handleFormSubmitCards(evt) {
	evt.preventDefault();
	const newCard = {
		name: inputNameCard.value, // добавляем название
		link: inputUrlCard.value // добавляем ссылку
	};
elementsContainer.prepend(createElements(newCard)); //добавляем в начало Elements
	closePopup(popupCards); //закрываем попап
};

//Слушатель на форму добавления карточек после создания - 5 спринт
popupFormElementAdd.addEventListener('submit', handleFormSubmitCards);

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


