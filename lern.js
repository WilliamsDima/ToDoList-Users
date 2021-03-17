const emailUser = document.getElementById('email');
const supernameUser = document.getElementById('supername');
const userName = document.getElementById('nameUser');
const ageUser = document.getElementById('age');
const phoneUser = document.getElementById('phone');

const todoUser = document.getElementById('todo');

const spanUser = document.getElementById('users-length');
const userCreate = document.getElementById('createUser');

const allInput = [];//массив инпутов
allInput.push(emailUser);
allInput.push(supernameUser);
allInput.push(userName);
allInput.push(ageUser);
allInput.push(phoneUser);

let usersArr = []; //массив для пользователей const не работает в данном случае для localStorage


if (localStorage.getItem('todo')) {
	usersArr = JSON.parse(localStorage.getItem('todo'));
	displayMessages();
}

userCreate.addEventListener('click', function() { //слушатель на кнопку

	if (!emailUser.value) return;//запрет на незаполнение полей
	if (!supernameUser.value) return;
	if (!userName.value) return;
	if (!ageUser.value) return;
	if (!phoneUser.value) return;

	let newUser = { //параметры пользователя
		mail: emailUser.value,
		supername: supernameUser.value,
		name: userName.value,
		age: ageUser.value,
		phone: phoneUser.value,
		important: false
	};

	usersArr.push(newUser);//добовляю пользователя в массив
	localStorage.setItem('todo', JSON.stringify(usersArr)); //добовляем в localStorage наш массив через метод JSON.stringify
	displayMessages();

	allInput.forEach(function(item) {//очищаю все инпуты
		item.value = '';
	});

	createUser();
});

function displayMessages() { //добавляю новый тег на страницу

	let usersLength = JSON.parse(localStorage.getItem('todo'));
	spanUser.innerHTML = usersLength.length;//выводит длинну массива пользователей из localStorage

	if (usersArr.length === 0) {//если длинна массива равна 0 то туду лист будет пустой
		todoUser.innerHTML = '';
	}

	let displayMessages = '';
	usersArr.forEach(function(item, i){//перебираю массив
		displayMessages += `
		<li>
			<label for="item_${i}" class="${item.important ? 'important' : ''}">
				<p>Email : <span>${item.mail}</span><span class="info"> <--  удалить</span></p>
				<p>Фамилия: ${item.supername}</p>
				<p>Имя: ${item.name}</p>
				<p>Лет: ${item.age}</p>
				<p>Номер телефона: ${item.phone}</p>
			</label>
		</li>
		`;//задаются уникальные id которые берутся из массива

		todoUser.innerHTML = displayMessages;//добовляю текст на страницу
	});
}


todoUser.addEventListener('change', function(event) {// change функция проверяет любые изменения в объекте

	let idInput = (event.target.getAttribute('id'));//получаю тег с id в котором произошли изменения
	let forLabel = todoUser.querySelector('[for='+ idInput + ']');//ищу объект по атрибуту в котором произошли изменения
	let valueLabel = forLabel.innerHTML;//получаю текст который содержится в объекте


	usersArr.forEach( function(item) { //пробегаю по массиву
		if (item.mail === valueLabel) { //если значение инпута равно valueLabel
			item.checked = !item.checked;//то меню checked на противоположный инвертируется
			localStorage.setItem('todo', JSON.stringify(usersArr));//сохраняю в localStorage
		}
	});
	console.log(valueLabel);
});

todoUser.addEventListener('contextmenu', function(event) {
	event.preventDefault();//отключаю стандартный вывод контекстного меню при клике правой кнопкой мыши
	
	usersArr.forEach( function(item, i) {

			if (item.mail === event.target.innerHTML) {

				if (event.ctrlKey || event.metaKey) {//если зажата клавиша cntrl + ПКМ то объект удолится
					
					usersArr.splice(i, 1);//удаление элемента
			} else {
				item.important = !item.important;//инвертируется
			}
			localStorage.setItem('todo', JSON.stringify(usersArr)); 
			displayMessages();
			}
				
	});

});


// Функция отправки запроса на сервер
//запуск сервера в cmd путь к файлу -> напиасть node ./server.js
const createUser = () => {
	fetch('http://localhost:3000/createUser', {
		method: "POST",
		body: JSON.stringify(usersArr),// Наши данные
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		return res.json()
	}).then((res) => {
		console.log(res);
	})
}