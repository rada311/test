class Slider {
	constructor(_body,_width,_distance,_time,_hz,_origin,_imgLength,_css,_containercss,_second) {
		this.body = _body;
		this.width = _width;
		this.timer = null;
		this.distance = _distance;
		this.time = _time;
		this.hz = _hz;
		this.times = this.time / this.hz;
		this.step = this.distance / this.times;
		this.origin = _origin;
		this.imgLength = _imgLength;
		this.css=_css;
		this.containercss=_containercss;
		this.second=_second
	}

	ranColor() {
		return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() *
			256) + ")";
	}

	create() {
		
		let _container = document.createElement("div");
		_container.setAttribute("class",this.containercss);
		this.body.appendChild(_container);
		this.imgs = document.createElement("div");
		this.imgs.setAttribute("class",this.css)
		// _imgs.id = "imgs";
		_container.appendChild(this.imgs);
		this.list = document.createElement("ul");
		// _ul.id = "ul";
		_container.appendChild(this.list);

		for (let i = 0; i < this.imgLength; i++) { ////////
			let _img = document.createElement("div");
			// _img.innerHTML = i + 1;
			this.imgs.appendChild(_img);
			// _img.style.backgroundColor = this.ranColor();
			let _circle = document.createElement("li");
			this.list.appendChild(_circle);
		}
		this.list.style.width = this.imgLength * 18 + "px";
		this.list.style.marginLeft = -this.list.offsetWidth / 2 + "px";
		let _lastImg = this.imgs.children[0].cloneNode("true");
		this.imgs.appendChild(_lastImg);

		this.span1 = document.createElement("span");
		this.span2 = document.createElement("span");
		this.span1.setAttribute("class", "leftspan");
		this.span1.innerHTML = "&lt";
		this.span2.innerHTML = "&gt"
		this.span2.setAttribute("class", "rightspan");
		_container.appendChild(this.span1);
		_container.appendChild(this.span2);
		this.list.children[0].style.background = "red";
	}
	change() {
		// this.list = document.getElementById("ul");
		let _me = this,
			_counter = 0;

		this.timer = window.setInterval(function() {
			_me.imgs.style.left = (_me.imgs.offsetLeft - _me.step) + "px";
			_counter++;
			if (_counter >= _me.times) {
				_me.events();
				_me.index = Math.round(_me.imgs.offsetLeft / -_me.width);

				_me.imgs.style.left = _me.origin - _me.distance + "px";
				window.clearInterval(_me.timer);

				for (let i = 0; i < _me.list.children.length; i++) {
					_me.list.children[i].style.background = "#C3C3C3";
				}
				if (_me.index >= _me.imgLength) {
					_me.index = 0;
					_me.imgs.style.left = "0px";
				}
				_me.list.children[_me.index].style.background = "red";

				_me.timer = window.setInterval(function() {
					window.clearInterval(_me.timer);
					_me.step = _me.distance / _me.times;
					_me.origin = _me.imgs.offsetLeft;

					_me.change();
				}, _me.second)
			}
		}, this.hz)
	}

	events() {
		let _me = this;
		for (let i = 0; i < this.list.children.length; i++) {
			this.list.children[i].onmouseover = function() {
				window.clearInterval(_me.timer);
				let _long = -_me.width * i;
				_me.step = -(_long - _me.imgs.offsetLeft) / _me.times;
				_me.origin = _long + _me.width;
				_me.distance = _me.width;
				console.log(_me.step);
				_me.change();
			}
		}

		this.span1.onclick = function() {
			window.clearInterval(_me.timer);
			let i = Math.floor(_me.imgs.offsetLeft / -_me.width) - 1;
			console.log(i);

			if (i == -1) {
				i = _me.imgLength - 1;
				_me.imgs.style.left = -_me.imgLength * _me.width + "px";
				let _long1 = -_me.width * i;
				_me.step = -(_long1 - _me.imgs.offsetLeft) / _me.times;
				_me.origin = _long1 - _me.width;
				_me.distance = -_me.width;
				if (_me.imgs.offsetLeft != _long1) {
					_me.span1.onclick = null;
				}
				_me.change();
				return;
			}
			let _long = -_me.width * i;
			_me.step = -(_long - _me.imgs.offsetLeft) / _me.times;
			_me.origin = _long + _me.width;
			_me.distance = _me.width;
			if (_me.imgs.offsetLeft != _long) {
				_me.span1.onclick = null;
			}
			_me.change();
		}

		this.span2.onclick = function() {
			window.clearInterval(_me.timer);
			let i = Math.floor(_me.imgs.offsetLeft / -_me.width) + 1;
			console.log(i);
			let _long = -_me.width * i;
			_me.step = -(_long - _me.imgs.offsetLeft) / _me.times;
			_me.origin = _long + _me.width;
			_me.distance = _me.width;
			if (_me.imgs.offsetLeft != _long) {
				_me.span2.onclick = null;
			}
			_me.change();
		}
	}
}

function books(_data,_ele,_class){
	var $li=$('<li></li>');
	$li.attr("class",_class[0]);
	var $a=$('<a href="#"></a>');
	$a.attr("class",_class[1]);
	var $img=$('<img/>');
	$img.attr("src",_data[0]);
	var $p=$('<div></div>');
	var $p1=$('<p></p>');
	$p1.attr("class",_class[2]);
	var $pa=$('<a href="#"></a>');
	$pa.html(_data[1]);
	var $p2=$('<p></p>');
	// var $p2span=$('<span></span>');
	$p2.attr("class",_class[3]);
	// $p2span.attr("class","l_a_span");
	$p2.html('<span></span>'+_data[2]);
	var $p3=$('<p></p>');
	$p3.attr("class",_class[4]);
	var $span1=$('<span><span></span><span></span><span></span></span>');
	var $span2=$('<span><span></span><span></span><span></span></span>');
	$span1.attr("class",_class[5]);
	// console.log($span1.get(0).children[0])
	$span1.get(0).children[0].setAttribute("class",_class[7]);
	$span1.get(0).children[0].innerHTML=_data[3];
	$span1.get(0).children[1].setAttribute("class",_class[8]);
	$span1.get(0).children[1].innerHTML=_data[4];
	$span1.get(0).children[2].setAttribute("class",_class[9]);
	$span1.get(0).children[2].innerHTML=_data[5];
	$span2.attr("class",_class[6]);
	$span2.get(0).children[0].setAttribute("class",_class[7]);
	$span2.get(0).children[0].innerHTML=_data[6];
	$span2.get(0).children[1].setAttribute("class",_class[8]);
	$span2.get(0).children[1].innerHTML=_data[7];
	$span2.get(0).children[2].setAttribute("class",_class[9]);
	$span2.get(0).children[2].innerHTML=_data[8];
	$a.append($img);
	$li.append($a);
	$li.append($p);///
	$p.append($p1);
	$p1.append($pa);
	$p.append($p2);
	$p.append($p3);
	// $p2.append($p2span);
	$p3.append($span1);
	$p3.append($span2);
	_ele.append($li);
}

function pia(_data,_key,_element){
	for(var i=0;i<10;i++){
		$(_element+">div:nth-child("+(i+1)+")").stop().html(_data["pia"][_key][i]);
		if(i!=0){
			$(_element+">div:nth-child("+(i+1)+")").stop().css({"height":"40","padding-left":"20px","line-height":"40px"});
		}
	}
	$(_element+">div:nth-child(1)").html("")
	books(_data["product"]["0"][0],$(_element+">div:nth-child(1)"),["linel1","linel_img1","l_name1","l_author1","l_price1","rob1","price_r1","l_sign1","l_num1","l_tail1"]);
	$(_element+">div:nth-child(1)").css({"height":"160"})
	$(_element+">div").mouseenter(function(){
		$(_element+">div").stop().not(this).css({"height":"40","padding-left":"20px","line-height":"40px"});
		for(var i=0;i<10;i++){
			$(_element+">div:nth-child("+(i+1)+")").stop().html(_data["pia"][_key][i]);
		}
		$(this).css({"height":"160","padding-left":"0","line-height":""});
		$(this).html("");
		books(_data["product"]["0"][$(this).attr("name")],$(this),["linel1","linel_img1","l_name1","l_author1","l_price1","rob1","price_r1","l_sign1","l_num1","l_tail1"]);
	})
	// $(".body_body>div").mouseleave(function(){
		// $(".body_body>div").stop().css({height:40});
		// for(var i=0;i<10;i++){
		// 	$(".body_body>div:nth-child("+(i+1)+")").stop().html(_data["pia"][i]);
		// }
	// })
}