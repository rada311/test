class Sign {
	constructor() {
		this.auto();
		this.events();
	}

	connect(_account, _password) {
		console.log(_account, _password)
		let _xhr = new XMLHttpRequest();
		_xhr.onreadystatechange = function() {
			if (_xhr.status === 200 && _xhr.readyState === 4) {
				console.log(_xhr.responseText);
				let _data = _xhr.responseText;
				_data = window.eval("(" + _data + ")");
				if (_data.code == 2000) {
					window.location.href = "dd.html"
				}
			}
		}
		_xhr.open("post", "http://localhost:8081/new/kilo/7.6dengluzhuce/signIn.php", true);
		_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		_xhr.send("account=" + _account + "&password=" + _password)
	}

	save(_account, _password) {
		document.cookie = "account=" + _account + "; path=/; expires=" + new Date(new Date().getTime() + 7 * 24 * 3600000);
		document.cookie = "password=" + _password + "; path=/; expires=" + new Date(new Date().getTime() + 7 * 24 *
			3600000);
	}

	events() {
		let _me = this;
		document.getElementById("in").onclick = function() {
			let _account = document.getElementById("account").value;
			let _password = document.getElementById("password").value;
			console.log(_account, _password)
			_me.connect(_account, _password);
			if (document.getElementById("memory").checked) {
				_me.save(_account, _password);
			}
		}
	}

	auto() { //自动登陆
		let _cookie = document.cookie;
		let _map = _cookie.split(";");
		let _item = null,
			_account, _password;
		for (let i = 0; i < _map.length; i++) {
			_item = _map[i].split("=");
			if (_item[0].indexOf("account") != -1) {
				_account = _item[1];
			}
			if (_item[0].indexOf("password") != -1) {
				_password = _item[1];
			}
		}
		this.connect(_account, _password);
	}
}

function main(){
	new Sign();
	$(".zc").click(function(){
		window.location.href="signup.html"
	})
}

window.onload=main;
