import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/../components/PopupWithImage.js";
import { initialCards } from "../utils/initialCards.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { token, cohort } from "../utils/autorization.js"
import "./index.css";
import { data } from "autoprefixer";

const validationConfig = {
	formSelector: '.popup__form', //ok
	inputSelector: '.popup__input', //ok
	submitButtonSelector: '.popup__submit-button', //добавлено новое
	inactiveButtonClass: 'popup__submit-button_disabled', ////добавлено новое, по умолчанию новое при открытии
	inputErrorClass: 'popup__input_type_invalid', //добавлено новое
	errorClass: 'popup__error_visible' //добавлено новое
};

const profileButton = document.querySelector('.profile__edit-button'); //кнопка вызова редактирования профайла
const popupProfileEdit = document.querySelector('.popup_profile'); //попап для редактирования имени профайла
const popupAvatar = document.querySelector('.popup_avatar'); //попап для смены аватара
const popupCloseProfile = document.querySelector('.popup__close_type-profile'); //кнопка закрытия редактирования профайла
const popupFormAvatar = document.querySelector('.popup__form_type_avatar'); //форма попапа аватара
const popupAvatarButton = document.querySelector('.profile__avatar-button'); //кнопка на аватаре
const profileAvatar = document.querySelector('.profile__avatar') //картинка аватар
const inputAvatarName = document.querySelector('.popup__input_type_avatar');//инпут аватара
const profileTitle = document.querySelector('.profile__title'); //имя профайла
const profileSubtitle = document.querySelector('.profile__subtitle'); //род деятельности (о себе)
const profileFormElement = document.forms['profileFormElement']; //форма попапа редактирования профиля
const popupFormElementAdd = document.forms['popupFormElementAdd'] //форма попапа добавления карточек
const inputName = document.querySelector('.popup__input_type_name'); //поле для ввода нового имени профайла
const inputAbout = document.querySelector('.popup__input_type_about'); //поле для ввода нового рода деятельности (о себе)
const elementsContainer = document.querySelector('.elements');  // контейнер, куда добавляются элементы из массива
const inputNameCard = document.querySelector('.popup__input_type_name-card'); //поле для названия добавленной карточки
const inputUrlCard = document.querySelector('.popup__input_type_url-card'); // поле для ссылки добавленной карточки
const popupPreview = document.querySelector('.popup_type_preview'); // попап для увеличения фото
const popupPreviewImage = document.querySelector('.popup__preview-image'); //для увеличения фото, большая картинка;
const popupPreviewTitle = document.querySelector('.popup__preview-title'); //для увеличения фото, надпись под большой картинкой
const popupClosePreview = document.querySelector('.popup__close_type-preview'); ////для увеличения фото, кнопка-контейнер
const profileCardsAddButton = document.querySelector('.profile__add-button'); // Кнопка на профиле добавления карточек-новых мест
const popupCards = document.querySelector('.popup_cards'); //попап для добавления карточек

/** Подключить API */
const api = new Api({
	baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
	headers: {
		authorization: token,
		'Content-Type': 'application/json'
	}
});
//--------------validation------------------------

const validatePopupProfileEdit = new FormValidator(validationConfig, profileFormElement);
validatePopupProfileEdit.enableValidation();

const validatePopupFormElementAdd = new FormValidator(validationConfig, popupFormElementAdd);
validatePopupFormElementAdd.enableValidation();

const validateAvatar = new FormValidator(validationConfig, popupFormAvatar);
validateAvatar.enableValidation();

let userId = null

//-------------------Карточки---------------------------

// Создание новой карточки
const createNewCard = (data) => {
	const newCard = new Card(data, userId, '#element-template', {
		handleCardClick: (name, link) => {
			popupBigImage.open(name, link)
		},
		handleLikeClick: (id) => {
			newCard.checkUserLikes()
				? api
					.deleteLike(id)
					.then((res) => {
						newCard.setLikes(res.likes)
					})
					.catch((err) => console.log(err))
				: api
					.addLike(id)
					.then((res) => {
						newCard.setLikes(res.likes)
					})
					.catch((err) => {
						console.log(err)
					})
		},
		handleDeleteClick: (id, card) => {
			popupConfirmation.open(id, card);
			},
	})
	
	return newCard.createElements()
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.setUserInfo(data)
    // userInfo.setUserAvatar(user.avatar)
    userId = data._id
    renderInitialCards(items)
  })
  .catch((err) => {
    console.log(err)
  })
const handleDeleteClick = (id, card) => {
	popupConfirmation.renderLoading(true);
	api
	  .deleteCard(id)
	  .then(() => {
		popupConfirmation.deleteCard()
		popupConfirmation.close()
	  })
	  .catch((error) => {
		console.log(error)
		.finally(() => popupConfirmation.renderLoading(false))
	}) 
}

// Функция попапа увеличения картинки 
const popupBigImage = new PopupWithImage('.popup_type_preview')
popupBigImage.setEventListeners()


// -------------Подтверждение удаления карточки -----------------
const popupConfirmation = new PopupWithConfirmation ('.popup_card-delete', (id, card) =>
handleDeleteClick(id, card),)
popupConfirmation.setEventListeners();

const userInfo = new UserInfo({
	userName: '.profile__title',
	userInfo: '.profile__subtitle',
	userAvatar: '.profile__avatar'
})
 
//-------Класс Section. ------------------------------------
const cardElementList = new Section(
	{
	 data: initialCards,
		renderer: (item) => {
			cardElementList.addItemAppend(createNewCard(item))
		},
	},
	elementsContainer
)
const renderInitialCards = (items) => {
	cardElementList.renderItems(items)
  }
//Добавление новой карточки 
const popupAddCardForm = new PopupWithForm('.popup_cards', 
(data) => {
	popupAddCardForm.renderLoading(true);
	api.addCard(data.inputNameCard, data.inputUrlCard).then((data) => {
	cardElementList.addItem(createNewCard(data));
	popupAddCardForm.close();
}).catch((err) =>{
	console.error(err);
}).finally(() => 
	popupAddCardForm.renderLoading(false));
});
popupAddCardForm.setEventListeners();

//Открываем и обновляем попап с карточками
profileCardsAddButton.addEventListener('click', function () {
	validatePopupFormElementAdd.resetValidation();
	validatePopupFormElementAdd.toggleButtonState();
	popupAddCardForm.open();
})

//--------------------Профиль------------------------------

/** Pедактирование информации name и about*/
const updateProfile = new PopupWithForm('.popup_profile', (data) => {
	updateProfile.renderLoading(true);
	api.changeUserInfo(data.inputName, data.inputAbout).then((data) => {
		userInfo.setUserInfo(data);
		updateProfile.close()
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		updateProfile.renderLoading(false);
	})
})
updateProfile.setEventListeners();

// Клик на кнопке редактирования информации name и about
profileButton.addEventListener('click', () => {
	validatePopupProfileEdit.resetValidation();           //Очистка ошибок, после открытия попапа.
	validatePopupProfileEdit.toggleButtonState();            // Валидация кнопки при открытии попапа.
	const { name, about } = userInfo.getUserInfo()
	inputName.value = name;
	inputAbout.value = about;
	updateProfile.open();
});

// ----------------Аватар-----------------------------
/** Сменить аватар профиля*/
const updateAvatar = new PopupWithForm('.popup_avatar', () => {
	updateAvatar.renderLoading(true);
	api.changeUserAvatar(inputAvatarName.value).then((data) => {
		userInfo.setUserInfo(data);
		updateAvatar.close();
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		updateAvatar.renderLoading(false);
	});
});
updateAvatar.setEventListeners();

/** Клик на кнопке редактирования аватара */
popupAvatarButton.addEventListener('click', () => {
	validateAvatar.resetValidation();
	updateAvatar.open();
});

