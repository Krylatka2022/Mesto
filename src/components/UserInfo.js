export default class UserInfo {
	constructor({ userName, userInfo }) {

		//Принимает в конструктор объект с селекторами двух элементов:
		//элемента имени пользователя и элемента информации о себе.

		this._userName = document.querySelector(userName);
		this._userInfo = document.querySelector(userInfo);
	}

	//Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
	//Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

	getUserInfo() {

		const data = {
			name: this._userName.textContent,
			info: this._userInfo.textContent,
		}
		return data;
	}


	//Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

	setUserInfo(data) {
		this._userName.textContent = data.name;
		this._userInfo.textContent = data.info;
	}

}
