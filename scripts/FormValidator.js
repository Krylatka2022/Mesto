export default class FormValidator {

	constructor(validationConfig, form) {
		this._config = validationConfig;
		this._form = form;
		this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
		this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
	}

	_getErrorElement(inputElement) {
		return this._form.querySelector(`#${inputElement.id}-error`);
	}

	//функция показать ошибку
	_showError(inputElement, validationMessage) { //ok
		// Находим элемент ошибки внутри самой функции
		const errorElement = this._getErrorElement(inputElement);
		const { errorClass, inputErrorClass } = this._config;
		// Остальной код такой же
		errorElement.classList.add(errorClass);
		errorElement.textContent = validationMessage;
		inputElement.classList.add(inputErrorClass);
	}
	//функция убрать показ ошибки
	_hideError(inputElement) { //ok
		// Находим элемент ошибки
		const errorElement = this._getErrorElement(inputElement);
		const { errorClass, inputErrorClass } = this._config;
		// Остальной код такой же
		errorElement.classList.remove(errorClass);
		errorElement.textContent = '';
		inputElement.classList.remove(inputErrorClass)
	}
	//функция проверки валидности инпутов
	_checkValidateInput(inputElement) { //ok
		if (!inputElement.validity.valid) {
			this._showError(inputElement, inputElement.validationMessage);
		} else {
			this._hideError(inputElement);
		}
	}

	//функция, которая делает кнопку сабмита неактивной и наоборот, дизейбл кнопки
	// Функция принимает массив полей ввода
	// и элемент кнопки, состояние которой нужно менять
	_toggleButtonState() {
		const hasInvalidInput = this._inputs.some((inputElement) => !inputElement.validity.valid);

		if (hasInvalidInput) { //если есть ошибки // Если есть хотя бы один невалидный инпут
			// сделай кнопку неактивной
			this._submitButton.classList.add(this._config.inactiveButtonClass);
			this._submitButton.disabled = true;
		} else {
			// иначе сделай кнопку активной
			this._submitButton.classList.remove(this._config.inactiveButtonClass);
			this._submitButton.disabled = false;
		}
	}

	// Cлушатель для добавления сообщений об ошибках при заполнении полей формы
	_setEventListeners = () => {
		this._toggleButtonState();
		this._inputs.forEach(inputSelector => {
			inputSelector.addEventListener('input', () => {
				this._checkValidateInput(inputSelector);
				this._toggleButtonState();
			});
		});
	}

	//Запуск выполнения методов класса
	enableValidation = () => {
		this._setEventListeners();
	};
}
