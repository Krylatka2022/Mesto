const profileButton = document.querySelector('.profile__edit-button');//кнопка вызова редактирования профайла
const popup = document.querySelector('.popup');
const popupProfileEdit = document.querySelector('.popup_profile');//попап для редактирования профайла
const popupCloseProfile = document.querySelector('.popup__close_type-profile');//кнопка закрытия редактирования профайла
const profileTitle = document.querySelector('.profile__title');//имя профайла
const profileSubtitle = document.querySelector('.profile__subtitle');//род деятельности (о себе)
const formElement = document.querySelector('.popup__form');//ok //форма попапов
const popupFormElementAdd = document.querySelector('.popup__form_type_add')//форма попапа добавления карточек
const inputName = document.querySelector('.popup__input_type_name');//поле для ввода нового имени профайла
const inputAbout = document.querySelector('.popup__input_type_about');//поле для ввода нового рода деятельности (о себе)
const popupCards = document.querySelector('.popup_cards');//ok//попап для добавления карточек
const inputNameCard = document.querySelector('.popup__input_type_name-card');//ok //поле для названия добавленной карточки
const inputUrlCard = document.querySelector('.popup__input_type_url-card');//ok // поле для ссылки добавленной карточки
const popupCloseCards = document.querySelector('.popup__close_type-cards');//ok //кнопка закрытия попапа для добавления карточек
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');//element из template для добавления в elements
const elements = document.querySelector('.elements');//ok // контейнер, куда добавляются элементы из массива
const elementImg = document.querySelector('.element__image');//ok
const elementTitle = document.querySelector('.element__title');//ok
const elementLike = document.querySelector('.element__like');
const elementDelete = document.querySelector('.element__delete')//ok
const  profileCardsAddButton = document.querySelector('.profile__add-button'); // Кнопка на профиле добавления карточек-новых мест
const popupPreview = document.querySelector('.popup_type_preview');// попап для увеличения фото
const popupPreviewImage = popupPreview.querySelector('.popup__preview-image');//для увеличения фото, большая картинка;
const popupPreviewTitle = popupPreview.querySelector('.popup__preview-title');//для увеличения фото, надпись под большой картинкой
const popupClosePreview = document.querySelector('.popup__close_type-preview');////для увеличения фото, кнопка-контейнер


const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
  ];

	//открыть любой попап
  function openPopup (popup) {
	popup.classList.add('popup_opened');
  };

  //закрыть любой попап
  function closePopup (popup) {
	popup.classList.remove('popup_opened');
  };

  initialCards.forEach(renderElement);

   //Добавили карточки из массива, к ним лайки и удаление карточек
  function createElements(item) {
	const elementItem = elementTemplate.cloneNode(true);//клонируем элементы template
	const elementTitle = elementItem.querySelector('.element__title'); //получаем элемент - название карточки
	const elementImg = elementItem.querySelector('.element__image');// получаем элемент - картинку в карточке
	elementTitle.textContent  = item.name; //устанавливаем значение для названия карточки
	elementImg.src = item.link; //устанавливаем ссылку на картинку
	elementImg.alt  = item.name;//устанавливаем значение атрибута alt для картинки

  const elementLike = elementItem.querySelector('.element__like'); //добавляем функциональность лайкам
	elementLike.addEventListener('click', function() { //Слушатель на функцию добавления лайка
	elementLike.classList.toggle('element__like_active');
});

	const elementDelete = elementItem.querySelector('.element__delete'); //добавляем функциональность корзинам
	elementDelete.addEventListener('click', function() {//Слушатель на функцию корзины
	elementDelete.closest('.element').remove();
});

	const elementPreview = elementItem.querySelector('.element__preview'); //увеличиваем картинку
	elementPreview.addEventListener('click', function() {//Слушатель на функцию увеличения картинки
		popupPreviewTitle.textContent = item.name;
		popupPreviewImage.src = item.link;
	popupPreviewImage.alt = item.name;
	openPopup(popupPreview);
	});

	return elementItem; //возвращаем готовый элемент по шаблону template
}

//функция создает карточку через createElements и добавляет ее в DOM
function renderElement(item) {
	const elementCard = createElements(item);
	elements.append(elementCard);
  }

	//Слушатель на открытие попапа добавления карточек.
  profileCardsAddButton.addEventListener('click', function() {openPopup(popupCards)}); //ok

	//Слушатель на закрытие попап добавления карточек
  popupCloseCards.addEventListener('click', function() {closePopup (popupCards)});

	//Функция кнопки Создать (карточку), по данным пользователя, обновляя значения для последующего добавления
  function handleFormSubmitCards(evt) {
	evt.preventDefault();
	const newCard = {
	  name: inputNameCard.value, // добавляем название
	  link: inputUrlCard.value // добавляем ссылку
	};

	elements.prepend(createElements(newCard));//добавляем в начало eElements
	resetCardsPopup();//перезаписываем значения
	closePopup(popupCards);//закрываем попап
  };

	const resetCardsPopup = function() {//функция перезаписи значений
	inputNameCard.value = '';
	inputUrlCard.value = '';
  };

//Слушатель на форму добавления карточек после создания
  popupFormElementAdd.addEventListener ('submit', handleFormSubmitCards);


//Слушатель на закрытие popup__preview
popupClosePreview.addEventListener('click', function() {
	closePopup(popupPreview)});

  //Функция открыть попап "редактировать профиль" - 4 спринт, модернизация//
/*Вызываем, добавляем класс при нажатии, отражаем в инпут-полях имя, заданное изначально по умолчанию*/
profileButton.addEventListener('click', function() { //Отслеживаем событие 'open'
 openPopup(popupProfileEdit);
	inputName.value = profileTitle.textContent;
	inputAbout.value = profileSubtitle.textContent;
	//closePopup(popupProfileEdit);
});

/*Корректируем текст попапа "редактировать профиль", сохраняем, добавляеи в 'profile' - 4 спринт*/
function handleFormSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = inputName.value;
	profileSubtitle.textContent = inputAbout.value;
	closePopup(popupProfileEdit);
}
//Слушатель на событие корректирования попапа "редактировать профиль"
formElement.addEventListener('submit', handleFormSubmit);

//Слушатель на событие закрытия попап редактировать профиль
popupCloseProfile.addEventListener('click', function() {
	closePopup(popupProfileEdit);
  });

