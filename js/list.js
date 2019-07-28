function jumpcart(_data){//点击按钮跳转到购物车
	var _list=document.getElementsByClassName("box")[0].children[1].children;
	for(var i=0;i<_list.length;i++){
		_list[i].children[1].children[4].onclick=function(){
			window.location.href="cart.html?id="+this.id+"&counter=1&num=0";
			console.log(this);
		}
	}
}

function jumpdetail(_data){//点击图片跳转到详情页
	var _list=document.getElementsByClassName("box")[0].children[1].children;
	for(var i=0;i<_list.length;i++){
		_list[i].children[0].children[0].onclick=function(){
			window.location.href="detail.html?id="+this.id
			console.log(this);
		}
	}
}

function page() {
	$.ajax({
		url:"list.json",
		success:function(_data){
			console.log(_data);
			let _total=parseInt(_data["product"].length/12+1);
			// console.log(_total)
			window.setTimeout(function(){
				// list(_data["product"]);
					let _page = new Page({
					"firstPage": 1,
					"totalPage": _total,
					"showPage": 5,
					"pageIndex": 1
				},_data["product"]);
				_page.create();
				_page.ul();
				_page.event();
				_page.list();
				jumpdetail(_data);
				jumpcart(_data);
			},200)
		}
	})
	document.onselectstart = function(e) {
		e = e || window.event;
		e.preventDefault();
		return;
	};
	document.onselect = function() {
		return false;
	}
}

function main(){
	page();
	
}

window.onload=main;