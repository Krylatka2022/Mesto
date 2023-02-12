import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/../components/PopupWithImage.js";
import { initialCards } from "../utils/initialCards.js";
import "./index.css";

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

const validatePopupProfileEdit = new FormValidator(validationConfig, profileFormElement);
validatePopupProfileEdit.enableValidation();

const validatePopupFormElementAdd = new FormValidator(validationConfig, popupFormElementAdd);
validatePopupFormElementAdd.enableValidation();

// Функция попапа увеличения картинки - ok
const popupBigImage = new PopupWithImage('.popup_type_preview')
popupBigImage.setEventListeners()

function handleCardClick(name, link) {
	popupBigImage.open(name, link);
}

//-------------------Карточки---------------------------

const popupAddCardForm = new PopupWithForm('.popup_cards', (item) => {

	cardElementList.addItem(createdCard({ name: item.inputNameCard, link: item.inputUrlCard }));
	popupAddCardForm.close();
});

popupAddCardForm.setEventListeners();


const createdCard = (item) => {
	const card = new Card(item, '#element-template', handleCardClick).createElements();
	return card;
}


//-------Экземпляр класса Section. ------------------------------------
const cardElementList = new Section(
	{
		data: initialCards,
		renderer: (item) => {
			cardElementList.addItem(createdCard(item))
		},
	},
	elementsContainer,
)

cardElementList.renderItems()

//Открываем и обновляем попап с карточками
profileCardsAddButton.addEventListener('click', function () {
	validatePopupFormElementAdd.resetValidation();
	// validatePopupFormElementAdd.toggleButtonState();
	popupAddCardForm.open();
})
//---------------------------------Профиль------------------------------

const popupEditProfileForm = new PopupWithForm('.popup_profile', formValues)

function formValues(data) {
	userInfo.setUserInfo({ name: data.inputName, info: data.inputAbout });
	popupEditProfileForm.close();
}

popupEditProfileForm.setEventListeners()


const userInfo = new UserInfo({
	userName: '.profile__title',
	userInfo: '.profile__subtitle'
})


profileButton.addEventListener('click', () => {
	validatePopupProfileEdit.resetValidation();           //Очистка ошибок, после открытия попапа.
	validatePopupProfileEdit.toggleButtonState();            // Валидация кнопки при открытии попапа.
	const { name, info } = userInfo.getUserInfo()
	inputName.value = name;
	inputAbout.value = info;
	popupEditProfileForm.open();


});
