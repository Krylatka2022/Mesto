
export  {validationConfig as config, showError, hideError, checkValidateInput, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation }
//import { popupFormElementAdd } from "./index.js";
//функция показать ошибку
function showError(formElement, inputSelector, config) { //ok
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`#${inputSelector.id}-error`);
    // Остальной код такой же
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputSelector.validationMessage;
    inputSelector.classList.add(config.inputErrorClass);
}
//функция убрать показ ошибки
function hideError(formElement, inputSelector, config) { //ok
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`#${inputSelector.id}-error`);
    // Остальной код такой же
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputSelector.classList.remove(config.inputErrorClass)
}
//функция проверки валидности инпутов 
function checkValidateInput(formElement, inputSelector, config) { //ok
    if (!inputSelector.validity.valid) {
        showError(formElement, inputSelector, config);
    } else {
        hideError(formElement, inputSelector, config);
    }
}
//проверить валидность полей. // Функция принимает массив полей
const hasInvalidInput = (inputs) => {
        // проходим по этому массиву методом some
        return inputs.some((inputSelector) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true
            return !inputSelector.validity.valid;
        })
    }
    //функция, которая делает кнопку сабмита неактивной и наоборот, дизейбл кнопки
    // Функция принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputs, submitButton, config) {
    if (hasInvalidInput(inputs)) { //если есть ошибки // Если есть хотя бы один невалидный инпут
        // сделай кнопку неактивной
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        // иначе сделай кнопку активной
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.disabled = false;
    }
   
}
//функция слушателя для проверки валидности инпута 
function setEventListeners(formElement, config) {
    // Найдём все поля формы и сделаем из них массив
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputs, submitButton, config);
    inputs.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            checkValidateInput(formElement, inputSelector, config);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputs, submitButton, config);
        });
        hideError(formElement, inputSelector, config);
    });
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
           toggleButtonState(inputs, submitButton, config);
        }, 0)
      })
}

function enableValidation(config) {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const forms = document.querySelectorAll(config.formSelector); //находим все формы
    // Переберём полученную коллекцию
    forms.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement, config);
    })
}
const validationConfig = {
    formSelector: '.popup__form', //ok
    inputSelector: '.popup__input', //ok
    submitButtonSelector: '.popup__submit-button', //добавлено новое
    inactiveButtonClass: 'popup__submit-button_disabled', ////добавлено новое, по умолчанию новое при открытии
    inputErrorClass: 'popup__input_type_invalid', //добавлено новое
    errorClass: 'popup__error_visible' //добавлено новое
};
enableValidation(validationConfig);