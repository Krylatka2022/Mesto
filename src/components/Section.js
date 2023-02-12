export default class Section {
	constructor({ data, renderer }, selectorContainer) {
		this._renderedItems = data;
		this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице;
		this._container = selectorContainer; // селектор контейнера, в который нужно добавлять созданные элементы.
	}

	// перебирает изначальный массив – initialCards, выуживая из него данные для каждой отдельной карточки.
	renderItems() {

		this._renderedItems.forEach((item) =>
			this._renderer(item));
	};


	// универсальный метод, который формирует карточку и отрисовывает ее на странице (в начале списка);
	addItem(item) {
		this._container.prepend(item);
	}

	// //   формирует карточку и отрисовывает ее на странице (в конце списка)
	// addItemAppend(item) {
	// 	this._container.append(item);
	// }


}