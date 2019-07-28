class Page {
	constructor(_config,_data) {
		this.firstPage = _config["firstPage"];
		this.totalPage = _config["totalPage"];
		this.showPage = _config["showPage"];
		this.fixedMiddle = Math.floor(this.showPage / 2);
		this.pageIndex = _config["pageIndex"];
		this.data=_data;
	}

	jumpcart(){//点击按钮跳转到购物车
	var _list=document.getElementsByClassName("box")[0].children[1].children;
	for(var i=0;i<_list.length;i++){
		_list[i].children[1].children[4].onclick=function(){
			window.location.href="cart.html"
			console.log(this);
		}
	}
}

	jumpdetail(){//点击图片跳转到详情页
	var _list=document.getElementsByClassName("box")[0].children[1].children;
	for(var i=0;i<_list.length;i++){
		_list[i].children[0].children[0].onclick=function(){
			window.location.href="detail.html?id="+this.id
			console.log(this);
		}
	}
}
	list() {
		// console.log("a")
		let _me=this;
		var str = "",
			num;
		for (var j = 0; j < $("#ul>li").length; j++) {
			if ($("#ul>li")[j].style.background === "red") {
				num = $("#ul>li")[j].innerHTML;
			}
		}
		//0-11,12-23,24-35
		var _start = (num - 1) * 12,
			_last = (num - 1) * 12 + 11;
		// console.log(_start, _last)
		for (var i = _start; i <= _last; i++) {
			if (_me.data.length - 1 > _last - 11) {//24,35
				if (_last > _me.data.length - 1) {
					_last = _me.data.length - 1;
					// console.log(_start,_last)
				}
				str += '<li>' +
					'<div class="list_left">' +
					'<img id="'+i+'a" src="' + _me.data[i]["src"] + '" alt="">' +
					'</div>' +
					'<div class="list_right">' +
					'<div class="title"><a href="#">' + _me.data[i]["title"] + '</a></div>' +
					'<div class="price">' +
					'<span class="current">' + _me.data[i]["current"] + '</span>' +
					'<span class="original">' + _me.data[i]["original"] + '</span>' +
					'</div>' +
					'<div class="author">' +
					'<span>' + _me.data[i]["author"] + '</span>著' +
					'</div>' +
					'<div class="synopsis">' + _me.data[i]["synopsis"] + '</div>' +
					'<div class="add" id="'+i+'">加入购物车</div>' +
					'</div>' +
					'</li>'
			}
		}
		$(".box>ul").html(str);
	}

	create() { //创建页面元素
		let _box = document.createElement("div"); //盒子
		_box.id = "box";
		// console.log(document.getElementsByClassName("page")[0])
		document.getElementsByClassName("page")[0].appendChild(_box);

		let _prevSpan = document.createElement("span");
		_prevSpan.id = "prevspan";
		_prevSpan.innerHTML = "前一页";
		let _ul = document.createElement("ul");
		_ul.id = "ul";
		let _nextSpan = document.createElement("span");
		_nextSpan.id = "nextspan"
		_nextSpan.innerHTML = "后一页";

		_box.appendChild(_prevSpan);
		_box.appendChild(_ul);
		_box.appendChild(_nextSpan);

	}

	ul() { //渲染ul
		this.middlePage = Math.ceil(this.showPage / 2); //中间页码

		let _start = this.firstPage;
		if (this.pageIndex < this.middlePage) {
			_start = this.firstPage;
		} else {
			_start = this.pageIndex - this.middlePage + 1;
		}

		if (this.pageIndex > this.totalPage - this.middlePage + 1) {
			_start = this.totalPage - (this.middlePage - 1) * 2;
		}

		ul.innerHTML = "";
		for (let i = _start; i <= this.showPage + _start - 1; i++) {
			let _li = document.createElement("li");
			_li.style.background = "";
			_li.innerHTML = i;
			if (i == this.pageIndex) {
				_li.style.background = "red";
			}
			ul.appendChild(_li);
		}

		let _me = this;

		for (let i = 0; i < ul.children.length; i++) { //点击变色
			ul.children[i].onclick = function() {
				prevspan.style.background = "";
				nextspan.style.background = "";
				_me.pageIndex = this.innerHTML;
				if (_me.pageIndex == 1) {
					prevspan.style.background = "gray";
				}
				if (_me.pageIndex >= _me.totalPage) {
					nextspan.style.background = "gray";
				}
				_me.ul();
				_me.list();
				jumpdetail();
				jumpcart();
			}
		}
	}

	event() { //事件

		let _me = this;

		prevspan.onclick = function() {
			prevspan.style.background = "";
			nextspan.style.background = "";

			if (_me.pageIndex > 1) {
				_me.pageIndex--;
				_me.ul();
				_me.list();
				jumpdetail();
				jumpcart();
			}

			if (_me.pageIndex == 1) {
				prevspan.style.background = "gray";
			}
		}

		nextspan.onclick = function() {
			prevspan.style.background = "";
			nextspan.style.background = "";

			if (_me.pageIndex < _me.totalPage) {
				_me.pageIndex++;
				_me.ul();
				_me.list();
				jumpdetail();
				jumpcart();
			}

			if (_me.pageIndex >= _me.totalPage) {
				nextspan.style.background = "gray";
			}
		}

		if (_me.pageIndex >= _me.totalPage) {
			nextspan.style.background = "gray";
		}

		if (_me.pageIndex == 1) {
			prevspan.style.background = "gray";
		}
	}
}
