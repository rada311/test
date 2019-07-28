function json(_cart) { //获取json数据
	$.ajax({
		url: "list.json",
		success: function(_data) {
			//console.log(_data);
			var _data1 = window.location.href;
			//console.log(_data1);
			if (_data1.split("?")[1]) { //如果是跳转到购物车的，地址栏有参数
				_identify = _data1.split("?")[1].split("&")[0];
				_counter = _data1.split("?")[1].split("&")[1];
				_num = _data1.split("?")[1].split("&")[2];
				_identify = window.eval("(" + _identify + ")");
				_counter = window.eval("(" + _counter + ")");
				_num = window.eval("(" + _num + ")");
				_comment = _data["product"][_identify]["comment"][_num]
				// console.log(_identify,_counter,_comment);
				_cart.push(_identify, _counter, _comment);
				run(_data, _cart);
			} else {
				//console.log("没有参数")
				run(_data, _cart);
			}
			chec();
			$(function() {
				var url = window.location.href; //获取当前页面的url
				if (url.indexOf("?") != -1) { //判断是否存在参数
					url = url.replace(/(\?|#)[^'"]*/, ''); //去除参数
					window.history.pushState({}, 0, url);
				}
			})
		}
	})
}

//点击加入购物车跳转到购物车页面，并把该商品的id通过href地址栏传递到购物车页面，调用cart的push方法。（参数是id和comment）

function events(_data, _cart) { //删除改变数值等操作
	$(".push").click(function() {
		var _identify = this.parentNode.parentNode.parentNode.children[1].id;
		//console.log(_identify)
		var _comment = this.parentNode.parentNode.children[0].children[0].innerHTML;
		_cart.push(_identify, 1, _comment);
		run(_data, _cart);
		chec();
	})
	$(".sub").click(function() {
		var _identify = this.parentNode.parentNode.parentNode.children[1].id;
		//console.log(_identify)
		var _comment = this.parentNode.parentNode.children[0].children[0].innerHTML;
		_cart.sub(_identify, 1, _comment);
		run(_data, _cart);
		chec();
	})
	$(".change").change(function() {
		var _identify = this.parentNode.parentNode.parentNode.children[1].id;
		var _counter = this.value;
		var _comment = this.parentNode.parentNode.children[0].children[0].innerHTML;
		_cart.change(_identify, _counter, _comment);
		run(_data, _cart);
		chec();
	})
	$(".dele").click(function() {
		var _identify = this.parentNode.parentNode.children[1].id;
		var _comment = this.parentNode.children[0].children[0].innerHTML;
		_cart.remove(_identify, _comment);
		run(_data, _cart);
		chec();
	})
}

function chec() { //全选等操作
	var allcheck = document.getElementsByClassName("allcheck")[0];
	var check = document.getElementsByClassName("check");
	var _sumpri;
	allcheck.onclick = function() {
		if (this.checked) {
			for (var i = 0; i < check.length; i++) {
				check[i].checked = true;
			}
			_sumpri = 0;
			for (var i = 0; i < $(".sumprice").length; i++) {
				_sumpri += Number($(".sumprice")[i].innerHTML.split("￥")[1]);
			}
			$(".zongji").html("￥" + _sumpri.toFixed(2));
		} else {
			for (var i = 0; i < check.length; i++) {
				check[i].checked = false;
			}
			$(".zongji").html("￥0");
		}

	}

	var _lock;
	console.log(check, check.length)
	for (var j = 0; j < check.length; j++) {
		check[j].onclick = function() {
			_sumpri = 0;
			_lock = true;
			for (var m = 0; m < check.length; m++) {
				if (!check[m].checked) {
					_lock = false;
				}
				if (check[m].checked) {
					_sumpri += Number($(".sumprice")[m].innerHTML.split("￥")[1]);
				}
			}
			$(".zongji").html("￥" + _sumpri.toFixed(2));
			if (_lock) {
				allcheck.checked = true;
			} else {
				allcheck.checked = false;
			}
		}
	}
}

function run(_data, _cart) { //渲染页面
	_cart.take();
	//console.log(_data["product"])
	// console.log(_data["product"][_cart.cookie[0].ID]["current"].slice(1))
	var str = "";
	//console.log(_cart.cookie,_cart.cookie.length)
	$(".counter").html(_cart.sum());

	for (var i = 0; i < _cart.cookie.length; i++) {
		str += '<div class="productin">' +
			'<input class="check" type="checkbox">' +
			'<img class="img" id="' + _cart.cookie[i].ID + '" src="' + _data["product"][_cart.cookie[i].ID]["src"] + '" alt="">' +
			'<div class="detail">' +
			'<div class="name">' + _data["product"][_cart.cookie[i].ID]["title"] + '<span class="comment">' + _cart.cookie[i].comment +
			'</span>' + '</div>' +
			'<div class="price">' + _data["product"][_cart.cookie[i].ID]["current"] + '</div>' +
			'<div class="operate">' +
			'<span class="sub">-</span>' +
			'<input class="change" type="text" value="' + _cart.cookie[i].counter + '">' +
			'<span class="push">+</span>' +
			'</div>' +
			'<div class="sumprice">￥' + _cart.sums(_cart.cookie[i].ID, _cart.cookie[i].comment, _data["product"][_cart.cookie[0]
				.ID
			]["current"].slice(1)) + '</div>' +
			'<div class="dele">删除</div>' +
			'</div>' +
			'</div>'
	}
	$(".product").html(str);
	$(".zongji").html("￥0")
	events(_data, _cart);
}

function main() {
	var _cart = new Cart();
	json(_cart);

}

window.onload = main;


