var _timer;

function list(_class, _data, _cssul, _cssli, _cssa, _lock, _word) { //渲染菜单：选择器，数据，css样式
	let _ul = document.createElement("ul"),
		_li, _a;
	for (var key in _cssul) {
		_ul.style[key] = _cssul[key];
	}
	for (var i = 0; i < _data.length; i++) {
		_li = document.createElement("li");
		_a = document.createElement("a");
		_a.href = "#";
		_a.innerHTML = _data[i];
		_li.appendChild(_a)
		_ul.appendChild(_li);
		for (var k in _cssli) {
			_li.style[k] = _cssli[k];
		}
		for (var k1 in _cssa) {
			_a.style[k1] = _cssa[k1];
		}
		if (_lock) {
			if (i == 0) {
				_li.setAttribute("class", "alll");
				_li.innerHTML = _word;
				let _span = document.createElement("span");
				_li.appendChild(_span);
				_span.setAttribute("class", "glyphicon glyphicon-menu-down alll_span");
			}
		}
	}
	$(_class).append(_ul);
}


function gps(_data) { //定位地址选择
	$(".gpsin").get(0).children[0].innerHTML = "北京";
	for (let i = 0; i < _data.length; i++) {
		$(".gpss").get(0).children[0].children[i].onclick = function() {
			$(".gpsin").get(0).children[0].innerHTML = _data[i];
		}
	}
}

function focus() { //搜索框
	$(".logo form input").focus(function() {
		this.value = "";
		if ($(".logo form input").val() === "") {
			$(".logo form input").blur(function() {
				this.value = "暑期读书,30万册图书5折封顶";
			})
		}
		let _code;
		$(".logo form input").change(function() { //表单内容改变跳转
			if ($(".logo form input").val() != "") {
				window.location.href = "list.html";
			}
		})
	})
	$(".logo .search").click(function() { //点击搜索跳转
		window.location.href = "list.html";
	})
}

function changeword(_data, _ele) { //改变默认字
	let i = 0;
	let timer = window.setInterval(function() {
		$(_ele).html(_data[i]);
		if (i >= _data.length - 1) {
			i = -1;
		}
		i++;
	}, 20000)
}

function menu(_data) { //菜单
	_dataa = _data["全部商品分类"]["nav"];
	_datab = _data["全部商品分类"]["内容"];
	let _div = document.createElement("div"),
		_ul, _li, _a;
	_div.setAttribute("class", "nav_t_div");
	$(".nav-topins .alll").get(0).appendChild(_div);
	for (var k in _dataa) {
		_ul = document.createElement("ul");
		_ul.setAttribute("class", "nav_t_ul");
		_ul.count = k.substring(0, 1);

		_ul.onmouseenter = function() {
			_divin.innerHTML = "";
			menuin(_datab[this.count], _divin, _data["全部商品分类"]["img"]);
		}
		_ul.onmouseleave = function() {
			_divin.innerHTML = "";
			menuin(_datab["1"], _divin, _data["全部商品分类"]["img"]);
		}

		_div.appendChild(_ul);
		for (let i = 0; i < _dataa[k].length; i++) {
			_li = document.createElement("li");
			_li.setAttribute("class", "nav_t_li");
			_a = document.createElement("a");
			_a.href = "#";
			_a.setAttribute("class", "nav_t_a");
			_ul.appendChild(_li);
			_li.appendChild(_a);
			_a.innerHTML = _dataa[k][i] + "<span>、</span>";
		}
	}
	let _divin = document.createElement("div"),
		_ulin, _liin, _ain;
	_divin.setAttribute("class", "nav_t_i_d");
	_div.appendChild(_divin);
}

function menuin(_data, _divin, _imgs) {
	let _span, _spanr, _imglist = document.createElement("ul"),
		_img;
	_divin.appendChild(_imglist);
	_imglist.setAttribute("class", "nav_t_i_img");
	for (let i = 0; i < _imgs.length; i++) {
		// console.log(_imgs[i]);
		_img = document.createElement("img");
		_imglist.appendChild(_img);
		_img.src = _imgs[i];
	}
	for (var k in _data) {
		_ulin = document.createElement("ul");
		if (k === "top") {
			_ulin.setAttribute("class", "nav_t_i_u_t");
			_divin.appendChild(_ulin);
			for (let i = 0; i < _data[k].length; i++) {
				_liin = document.createElement("li");
				_liin.setAttribute("class", "nav_t_i_l_t");
				_spanr = document.createElement("span");
				_ain = document.createElement("a");
				_ain.href = "#";
				_ain.setAttribute("class", "nav_t_i_a_t");
				_ulin.appendChild(_liin);
				_liin.appendChild(_ain);
				_ain.innerHTML = _data[k][i];
				_liin.appendChild(_spanr);
				_spanr.setAttribute("class", "glyphicon glyphicon-menu-down .spanr")
			}
		} else {
			_ulin.setAttribute("class", "nav_t_i_u");
			_divin.appendChild(_ulin);
			_span = document.createElement("span");
			_ulin.appendChild(_span);
			_span.setAttribute("class", "nav_t_i_s");
			// console.log(k);
			_span.innerHTML = k;
			for (let i = 0; i < _data[k].length; i++) {
				_liin = document.createElement("li");
				_liin.setAttribute("class", "nav_t_i_l");
				_ain = document.createElement("a");
				_ain.href = "#";
				_ain.setAttribute("class", "nav_t_i_a");
				_ulin.appendChild(_liin);
				_liin.appendChild(_ain);
				_ain.innerHTML = _data[k][i];
			}
		}
	}
}

function sidemenu() { //第二个菜单
	let _list = $(".sidemenu_body").get(0);
	for (let i = 0; i < _list.children.length; i++) {
		_list.children[i].setAttribute("class", "level_one");
	}
}

function color() {
	let _ul = $(".slider ul").get(0);
	for (let i = 0; i < _ul.children.length; i++) {
		_ul.children[i].style.background = "#fff";
	}
}

function slider(_imgs, i) { //轮播图
	var _img = $(".slider a img").get(0);
	var _ul = $(".slider ul").get(0);
	_img.src = _imgs[i];
	_timer = window.setInterval(function() {
		if (i == _imgs.length - 1) {
			i = -1;
		}
		i++;
		_img.src = _imgs[i];
		color();
		_ul.children[i].style.background = "red";
	}, 5000)
}

function changeslider(_imgs) {
	var _ul = $(".slider ul").get(0);
	for (let j = 0; j < _ul.children.length; j++) {
		_ul.children[j].num = j;
		_ul.children[j].onmouseover = function() {
			window.clearInterval(_timer);
			color();
			_ul.children[this.num].style.background = "red";
			slider(_imgs, this.num);
		}
	}
}

function boolsinit(_data) {
	var k = 0,
		r = 0;
	for (var i = 0; i < 8; i++) {
		books(_data["product"]["0"][k], $(".s_imgs>div"), ["linel", "linel_img", "l_name", "l_author", "l_price", "rob",
			"price_r", "l_sign", "l_num", "l_tail"
		]);
		k++;
		if (k > 2) {
			k = 0;
		}
	}
	for (var j = 0; j < 5; j++) {
		books(_data["product"]["0"][r], $(".s_imgs1>div:nth-child(" + (j + 1) + ")"), ["linel1", "linel_img1", "l_name1",
			"l_author1", "l_price1", "rob1", "price_r1", "l_sign1", "l_num1", "l_tail1"
		]);
		r++;
		if (r > 2) {
			r = 0;
		}
	}
}

function pialist(_data, _classname,_element) { //选项卡右侧
	var i = 0;
	for (var key in _data["pia"]) {
		$(_classname)[i].setAttribute("name", key);
		i++;
	}
	pia(_data, $(_classname)[0].getAttribute("name"),_element);
	for (var k in _data["pia"]) {
		$(_classname).mouseenter(function() {
			pia(_data, $(this).attr("name"),_element);
		})
	}
}
// product
function listb(_data, _classname) { //选项卡
	var i = 0;
	for (var key in _data["product"]) {
		$(_classname)[i].setAttribute("name", key);
		i++;
	}
	for (var k in _data["product"][$(_classname)[0].getAttribute("name")]) {
		if(k<=9){
			books(_data["product"][$(_classname)[0].getAttribute("name")][k], $(".s_t_left_body"), ["linel", "linel_img",
				"l_name", "l_author", "l_price", "rob", "price_r", "l_sign", "l_num", "l_tail"
			]);
		}
	}
	$(_classname)[0].setAttribute("class","s_t_left_head_li_hover");
	$(_classname).mouseenter(function() {
		$(_classname).attr("class","s_t_left_head_li")
		$(this).attr("class","s_t_left_head_li_hover")
		$(".s_t_left_body").html("")
		for (var k in _data["product"][$(this).attr("name")]) {
			if(k<=9){
				books(_data["product"][$(this).attr("name")][k], $(".s_t_left_body"), ["linel", "linel_img", "l_name", "l_author",
					"l_price", "rob", "price_r", "l_sign", "l_num", "l_tail"
				]);
			}
		}
	})

}

function last(_data){
	for(var i=0;i<18;i++){
		if(i!=0&&i!=12){
			$(".storey_fourin>ul>li:nth-child("+(i+1)+")>a>img").attr("src",_data[i][0]);
			$(".storey_fourin>ul>li:nth-child("+(i+1)+")>p:nth-child(2)>a").html(_data[i][1]);
			$(".storey_fourin>ul>li:nth-child("+(i+1)+")>p:nth-child(3)>span").html(_data[i][2]+'<span>'+_data[i][3]+'</span>');
		}
		if(i==0){
			// $(".storey_fourin>ul>li:nth-child("+(i+1)+")>a>img").attr("src","images/04.jpg");
			$(".storey_fourin>ul>li:nth-child("+(i+1)+")").css("background-image","url(images/04.jpg)");
		}
		if(i==12){
			$(".storey_fourin>ul>li:nth-child("+(i+1)+")").css("background-image","url(images/05.jpg)");
		}
	}
}

function main() {
	$.ajax({
		url: "dd.json",
		success: function(_data) {
			list(".gpss", _data["gps"], { //定位列表数据
				"width": "310px",
				"overflow": "hidden",
				"border": "#c3c3c3 solid 1px",
				"paddingTop": "10px",
				"paddingLeft": "10px",
				"paddingBottom": "10px"
			}, {
				"float": "left",
				"width": "58px",
				"height": "26px",
				"paddingLeft": "10px",
				"lineHeight": "26px"
			});
			gps(_data["gps"]); //定位数据改变
			list(".mydd", _data["mydd"], {
				"width": "77px",
				"overflow": "hidden",
				"border": "#c3c3c3 solid 1px",
				"borderTop": "none"
			}, {
				"height": "22px",
				"width": "77px",
				"paddingLeft": "5px"
			});
			list(".buy", _data["buy"], {
				"width": "77px",
				"overflow": "hidden",
				"border": "#c3c3c3 solid 1px",
				"borderTop": "none"
			}, {
				"height": "22px",
				"width": "77px",
				"lineHeight": "22px",
				"paddingLeft": "5px"
			});
			list(".serv", _data["serv"], {
				"width": "77px",
				"overflow": "hidden",
				"border": "#c3c3c3 solid 1px",
				"borderTop": "none"
			}, {
				"height": "22px",
				"width": "77px",
				"lineHeight": "22px",
				"paddingLeft": "5px"
			});
			list(".logonav", _data["热搜"], {
				"float": "left",
				"paddingTop": "5px"
			}, {
				"float": "left",
				"paddingRight": "10px"
			})
			list(".allsort", _data["全部分类"], {
				"width": "108px",
				"height": "290px",
				"overflowY": "scroll"
			}, {
				"paddingLeft": "10px",
				"height": "20px",
				"paddingTop": "2px",
				"paddingBottom": "2px"
			})
			changeword(_data["全部分类"], ".asc");
			list(".nav-topins", _data["导航top"], {
				"height": "40px",
				"width": "1200px"
			}, {
				"float": "left",
				"padding": "10px",
				"paddingLeft": "25px",
				"fontWeight": "1000",
				"fontSize": "14px"
			}, {

			}, true, "全部商品分类")
			menu(_data);
			list(".nav-botin", _data["导航bottom"], {
				"width": "1200px",
				"height": "30px"
			}, {
				"float": "left",
				"lineHeight": "30px",
				"paddingLeft": "15px",
				"paddingRight": "15px"
			})

			$(".slider ul").get(0).children[0].style.background = "red";

			slider(_data["slider"], 0);
			changeslider(_data["slider"]);
			boolsinit(_data);
			// pia(_data,"总榜");
			pialist(_data, ".head_head>li",".body_body");
			// console.log($(".head_head>li")[0])
			listb(_data, ".s_t_left_head li");
			pialist(_data, ".head_head1>li",".s_t_left_body1");
			last(_data["last"])
		}
	})

	focus();

	sidemenu();

	var _slider = new Slider($(".slidergap .roll").get(0), 750, 750, 1000, 50, 0, 4, "s_imgs", "container",7000);
	_slider.create();
	_slider.change();
	_slider.events();

	var _slider1 = new Slider($(".s_o_r_c_slider").get(0), 240, 240, 600, 50, 0, 5, "s_imgs1", "container1",4000);
	_slider1.create();
	_slider1.change();
	_slider1.events();
	
	var _cart=new Cart();
	$("#cartcounter").html(_cart.sum())
	$(".cartin").click(function(){
		window.location.href="cart.html";
	})
}

window.onload = main;
