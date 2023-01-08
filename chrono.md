1. создали Card.js, перенесли туда карточки (const initialCards)
1.1. export { initialCards }; в index.js 
1.2. import {initialCards} from './Card.js'

2. Перименовали validation.js в FormValidator.js // - перестал работать слушатель profileCardsAddButton
перестал работать на 7-м спринте после эkспорта-импорта - закомменчены submitButton, 
не обновляется значение disabled и пр. при повторном заполнении полей, 
добавлено новое решение в setEventListeners 70-74, перед последней фигурной скобкой:

formElement.addEventListener('reset', () => {
        setTimeout(() => {
           toggleButtonState(inputs, submitButton, config);
        }, 0)
      })

2.1. export  {validationConfig as config, showError, hideError, checkValidateInput, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation }

2.2. import  
{config, 
showError, 
hideError, 
checkValidateInput, 
hasInvalidInput, 
toggleButtonState, 
setEventListeners, 
enableValidation } from './FormValidator.js'

-------------------------------------всё работает-------------------------------------------------------------

3. Добавлено в Card все функции и константы, что касаются создания карточек, добавили в export в indexs.js только функции, константы видны и так благодаря функциям: 
export { initialCards as cards, createElements, renderElement, handleFormSubmitCards };

3.1. Импортированы функции из index.js  в card.js 
export {openPopup, closePopup}
import { openPopup, closePopup } from "./index.js";