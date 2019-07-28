function expand(){//放大镜
	$(".imgul li img").mouseenter(function(){
		$(".smallimg").attr("src",$(this).attr("src"));
		$(".expandsq img").attr("src",$(this).attr("src"));
	})
	$(".img").mouseenter(function(){
		$(".expandsq").show();
		$(".mask").show();
	})
	$(".img").mouseleave(function(){
		$(".expandsq").hide();
		$(".mask").hide();
	})
	$(".img").mousemove(function(e){
		e=e||window.event;
		if(e.target!=$(".expandsq img").get(0)){
			var width=$(".smallimg").get(0).offsetWidth;
			var _x=e.pageX-$(".cart").get(0).offsetLeft,_y=e.pageY-$(".cart").get(0).offsetTop;
			var _w=$(".mask").get(0).offsetWidth;
			var _left=_x-_w/2,_top=_y-_w/2;
			if(_left<=0){
				_left=0;
			}
			if(_top<=0){
				_top=0
			}
			if(_left>=width-_w){
				_left=width-_w
			}
			if(_top>=width-_w){
				_top=width-_w
			}
			$(".mask").css({
				"left":_left+"px",
				"top":_top+"px"
			})
			$(".bigimg").css({
				"left":-3*_left+"px",
				"top":-3*_top+"px"
			})
		}
		
	})
}

class Regions{//地点
	constructor(_data) {
	    this.data=_data;
		this.init();
	}
	province(){//省份
		let _options="";
		for(let i=0;i<this.data.regions.length;i++){
			_options+='<option>'+this.data.regions[i].name+'</option>';
		}
		$("#province").html(_options);
	}
	city(){
		let _options="";
		let _p=$("#province option:selected").index();
		let _city=this.data.regions[_p].regions;
		for(let i=0;i<_city.length;i++){
			_options+='<option>'+_city[i].name+'</option>';
		}
		$("#city").html(_options);
	}
	county(){
		let _options="";
		let _p=$("#province option:selected").index();
		let _c=$("#city option:selected").index();
		let _county=this.data.regions[_p].regions[_c].regions;
		for(let i=0;i<_county.length;i++){
			_options+='<option>'+_county[i].name+'</option>';
		}
		$("#county").html(_options);
	}
	events(){
		let _me=this;
		$("#province").change(function(e){
			$("#city").empty();
			_me.city();
			_me.county();
		})
		$("#city").change(function(){
			_me.county();
		})
	}
	init(){
		this.province();
		this.city();
		this.county();
		this.events();
	}
}

function init(_data){//渲染页面
	var data=window.location.href;
	data=data.split("?")[1].split("a")[0];
	data=window.eval("("+data+")");//id;
	var str="";
	var _data=_data["product"][data];
	str+='<div class="titleout"><img id="'+data+'" src="images/da.png" alt=""><span class="title">'+_data["title"]+'</span></div>'+
						'<div class="synopsis">'+_data["synopsis"]+'</div>'+
						'<div class="authorout">作者:<span class="author">'+_data["author"]+'</span></div>'+
						'<div class="snap">抢购价</div>'+
						'<div>'+
							'<div class="currentout">售价<span class="current">'+_data["current"]+'</span></div>'+
							'<div class="originalout">定价<span class="original">'+_data["original"]+'</span></div>'+
						'</div>'+
						'<div class="wechat">'+
							'<img src="images/wechat.png" alt="">'+
						'</div>'+
						'<div class="citys">'+
							'<div>配送至</div>'+
							'<div>'+
								'<select name="province" id="province"></select>'+
								'<select name="city" id="city"></select>'+
								'<select name="county" id="county"></select>'+
							'</div>'+
						'</div>'+
						'<div class="comment">'+
							'<ul>'+
								'<li style="background:red" name=0>'+_data["comment"][0]+'</li>'+
								'<li name=1>'+_data["comment"][1]+'</li>'+
								'<li name=2>'+_data["comment"][2]+'</li>'+
								'<li name=3>'+_data["comment"][3]+'</li>'+
								'<li name=4>'+_data["comment"][4]+'</li>'+
							'</ul>'+
						'</div>'+
						'<div class="cartadd">'+
							'<div class="count fl">'+
								'<input type="text" value="1">'+
								'<div>'+
									'<input class="push" type="button" value="+">'+
									'<input class="sub" type="button" value="-">'+
								'</div>'+
							'</div>'+
							'<div class="insert fl">加入购物车</div>'+
						'</div>'
	$(".relative").html(str);
	$(".smallimg").attr("src",_data["src"]);
	$(".bigimg").attr("src",_data["src"]);
	$(".imgul li")[0].children[0].setAttribute("src",_data["imgs"][0]);
	$(".imgul li")[1].children[0].setAttribute("src",_data["imgs"][1]);
	$(".imgul li")[2].children[0].setAttribute("src",_data["imgs"][2]);
	$(".imgul li")[3].children[0].setAttribute("src",_data["imgs"][3]);
	$(".imgul li")[4].children[0].setAttribute("src",_data["imgs"][4]);
}

function comment(){//点击选中描述
	$(".comment li").click(function(){
		$(".comment li").not(this).css("background","#fff")
		$(this).css("background","red");
	})
	$(".push").click(function(){
		this.parentNode.parentNode.children[0].value=Number(this.parentNode.parentNode.children[0].value)+1;
	})
	$(".sub").click(function(){
		if(this.parentNode.parentNode.children[0].value>1){
			this.parentNode.parentNode.children[0].value=Number(this.parentNode.parentNode.children[0].value)-1;
		}else{
			alert("不能再减少了哦")
		}
	})
}

function events(){
	$(".insert").click(function(){
		var _id=this.parentNode.parentNode.children[0].children[0].id;
		var _counter=this.parentNode.children[0].children[0].value;
		var _num;
		for(var i=0;i<$(".comment ul li").length;i++){
			if($(".comment ul li")[i].style.background=="red"){
				console.log("a")
				_num=$(".comment ul li")[i].getAttribute("name");
			}
		}
		console.log(_id,_counter,_num)
		window.location.href="cart.html?id="+_id+"&counter="+_counter+"&num="+_num;
	})
}

function main(){
	expand();
	$.ajax({
		url:"list.json",
		success:function(_data){
			init(_data);
			comment();
			events()
		}
	})
	$.ajax({
		url:"cityName.json",
		success:function(_data){
			new Regions(_data);
		}
	})
}

window.onload=main;