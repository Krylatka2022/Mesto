
//функция показать ошибку
function showError(formElement, input, config) {
	const errorElement = formElement.querySelector(`#${input.id}-error`);
	errorElement.classList.add(config.errorClass);
	errorElement.textContent = input.validationMessage;
	input.classList.add(config.inputErrorClass);

}

//функция убрать показ ошибки
function hideError(formElement, input, config) {
	const errorElement = formElement.querySelector(`#${input.id}-error`);
	errorElement.classList.remove(config.errorClass);
	errorElement.textContent = '';
	input.classList.remove(config.inputErrorClass)
}

//функция проверки валидности инпутов - функция работает, ошибки в консоли видит
function checkValidateInput(formElement, input, config) {
	if (input.validity.valid) {
		hideError(formElement, input, config);
	} else {
		showError(formElement, input, config);
	}
}


//проверить валидность полей
function hasInvalidInput(inputs) {

	return inputs.some((input) => !input.validity.valid);
}

//функция, которая делает кнопку сабмита неактивной и наоборот, дизейбл кнопки
function toggleButtonState(inputs, submitButton, config) {
	if (hasInvalidInput(inputs)) {//если есть ошибки
		submitButton.classList.add(config.inactiveButtonClass);
		submitButton.setAttribute('disabled', true);
	} else
		submitButton.classList.remove(config.inactiveButtonClass);
	submitButton.removeAttribute('disabled');
}

// 	/*const isFormValid = Array.from(inputs).every(input => {
// 		return input.validity.valid;
// 	});*/
// 	// if (isFormValid) {//если форма валидна и нет ошибки
// 	// 	submitButton.disabled = false; // убираем атрибут disabled из HTML
// 	// 	submitButton.classList.remove(config.inactiveButtonClass); //перекрашиваем кнопку в активный цвет
// 	// } else { //иначе наоборот - значение заданное по умолчанию - на кнопке не активный цвет, установлен атрибут disabled в HTML
// 	// 	submitButton.disabled = true;
// 	// 	submitButton.classList.add(config.inactiveButtonClass);
// 	// }

// }


/*function setHandlers(formElement, config) {
	const inputs = form.querySelectorAll(config.inputSelector); //находим все инпуты
	const button = form.querySelector(config.submitButtonSelector);
	console.log(inputs)
	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			checkValidateInput(form, input, config)
			toggleButtonState(inputs, button, config)
		})
	})
}
*/

/*
//функция слушателя, чтобы проверял валидность при инпуте и дизейблил/раздизейблил кнопку - рабочая!!!
function setEventListeners(formElement, config) {
	const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
	const submitButton = formElement.querySelector(config.submitButtonSelector);

	//toggleButtonState(inputs, submitButton, config);

	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			checkValidateInput(formElement, input, config);
			toggleButtonState(inputs, submitButton, config);
		});
		hideError(formElement, input, config);
	});

	// form.addEventListener('reset', () => {
	// 	setTimeout(() => {
	// 		toggleButtonState(inputs, submitButton, config);
	// 	}, 0)
	// })
}*/


/*function enableValidation(validationConfig) {
	const forms = document.querySelectorAll(config.formSelector);//находим все формы

	// forms.addEventListener('submit', (evt) => {
	// 	evt.preventDefault();

	forms.forEach(form => {
		const inputs = form.querySelectorAll(validationConfig.inputSelector); //находим все инпуты
		// console.log(inputs)
		const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector); //находим кнопку сабмита

		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		})
		//hideError(form, input, validationConfig)
		inputs.forEach(function (input) {
			input.addEventListener('input', () => {
				checkValidateInput(form, input, validationConfig); //проверяем валидность инпутов
				//setSubmitButtonState(inputs, buttonSubmit, validationConfig); //делаем активной или неактивной кнопку сабмита
				setHandlers(form, validationConfig);
			})
		})

	})
}*/

// Работает, но вторичное добавление картинки делает кнопку создать уже активной и загружает фигню - исправить-web
/* function enableValidation(config) {
	const forms = document.querySelectorAll(config.formSelector); //находим все формы

	forms.forEach(form => {
		const inputs = form.querySelectorAll(config.inputSelector); //находим все инпуты
		const submitButton = form.querySelector(config.submitButtonSelector); //находим кнопку сабмита

		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		})

		inputs.forEach(function (input) {
			input.addEventListener('input', () => {//Слушатель на 2 события: проверку валидности инпута и сабмит
				checkValidateInput(form, input, config); //проверяем валидность инпутов
				setButtonState(inputs, submitButton, config); //делаем активной или неактивной кнопку сабмита, не даем ввести значения
			})
		})

	})
}*/
function enableValidation({ formSelector, inputSelector, errorClass }) {

	//действие запуска процесса валидации
	const forms = Array.from(document.querySelectorAll(formSelector));

	//прописываем обработчик для каждой формы чтобы она не сабмитилась
	forms.forEach(formElement => {
		formElement.addEventListener('submit', (evt) =>
			evt.preventDefault());

		//действие налложения обработчиков на поля форм - следующая отдельная функция - setEvenlisteners(form, rest(config))
		const inputs = Array.from(formElement.querySelectorAll(inputSelector));
		inputs.forEach(input => {
			input.addEventListener('input', e => {
				//проверка валидности введенных данных - следующая отдельная функция
				//console.log(input.validity) - нет проблем
				//console.log(input.validationMessage) - нет проблем
				if (input.validity.valid) {
					//скрыть ошибку под полем
					hideError(formElement, input, config)
					//поиск errorPlace

				} else {
					//показать ошибку под полем
					showError(formElement, input, config)

					//поиск errorPlace - - следующая отдельная функция
					const inputName = input.getAttribute('name')
					const errorPlace = document.getElementById(`${inputName}-error`)
					//console.log(errorPlace)-ok
					errorPlace.textContent = input.validationMessage
					errorPlace.classList.add(errorClass)
				}

			})
		})
		setEventListeners(formElement, input, config);
	});

}
const validationConfig = {
	formSelector: '.popup__form', //ok
	inputSelector: '.popup__input', //ok
	submitButtonSelector: '.popup__submit-button',//добавлено новое
	inactiveButtonClass: 'popup__submit-button_disabled',////добавлено новое, по умолчанию новое при открытии
	inputErrorClass: 'popup__input_type_invalid',//добавлено новое
	errorClass: 'popup__error_visible'//добавлено новое
};
enableValidation(validationConfig)
// )

// 	})


// }

//действие запуска процесса наложения валидации
//действие наложения обработчиков на поля форм - следующая отдельная функция
//проверка валидности введенных данных - следующая отдельная функция
//скрыть ошибку под полем - ok
//поиск errorPlace - - следующая отдельная функция
//показать ошибку под полем - ok

// функция валидации кнопки
// проверка есть ли хотя бы одно невалидное поле в форме (every), эту функцию использовать в предыдущей (функция валидности кнопки)

