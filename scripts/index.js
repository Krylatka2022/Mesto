const profileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_name');
const inputAbout = document.querySelector('.popup__input_about');

//console.log({ profileButton, popup, popupClose, formElement });

/*Вызываем, добавляем класс при нажатии, отражаем в инпут-полях имя, заданное изначально по умолчаию*/
function openPopup() {
popup.classList.add('popup_opened');
inputName.value = profileTitle.textContent;
inputAbout.value = profileSubtitle.textContent;
}
profileButton.addEventListener('click', openPopup); //Отслеживаем событие 'open'

/*закрываем попап, удаляем класс*/
function closePopup() {
 popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', closePopup); //Отслеживаем событие 'close'

/*Корректируем текст попапа, сохраняем, добавляеи в 'profile'*/
function handleFormSubmit (evt) {
 evt.preventDefault();
profileTitle.textContent = inputName.value;
profileSubtitle.textContent = inputAbout.value;
closePopup();
}
 //Отслеживаем событие корректирования попапа
formElement.addEventListener('submit', handleFormSubmit);

/*Закрываем попап нажатием на любое поле вне попапа*/
/*popup.addEventListener('click', function(event) {
  if(!event.defaultPrevented) {
    closePopup();
  }
   })
  document.querySelector('.popup__container').addEventListener('click', function(event) {
  event.preventDefault();
    })*/

/*1
//popup.addEventListener('click', function(event) {
//  if(event.target === event.currentTarget){
//    closePopup();
//  }
//})

//2
//popup.addEventListener('click', closePopup);
//document.querySelector('.popup__container').addEventListener('click', function(event) {
  //event.stopPropagation();
 //  })
*/

//const likeActiv = document.querySelector('.element__like_active');
//const like = document.querySelector('.element__like');
//console.log({like});

//function likeActiv() {
// console.log(event);
//like.classList.add('element__like_active');
//return likeActiv;
//}
//function likeDisabled() {
//console.log(event);
//like.classList.remove('element__like_active');
//return like;
//}
//like.addEventListener('click', likeActiv);
