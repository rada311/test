$(function(){
	$(".zc").click(function(){
		window.location.href="signin.html"
	})
})

function main(){
	$("#in").click(function(){
		var _account=$("#account").val();
		var _password=$("#password").val();
		var _passwordacc=$("#passwordacc").val();
		var reg1=/^\d{11}$/g;
		// console.log(reg1.test(_account));
		var _lock=true;
		var _ajax1=new Ajax();
		_ajax1.request({
			api:"http://localhost:8081/new/kilo/7.3ajax/api/query.php",
			success:function(_data1){
				_data1=window.eval("("+_data1+")");
				console.log(_data1)
				for(var k in _data1){
					if(_data1[k]["phone"]==_account){
						_lock=false;
					}
					// console.log(_lock);
				}
				window.setTimeout(function(){
					// console.log(_lock&&reg1.test(_account)&&_password===_passwordacc);
					if(_lock&&reg1.test(_account)&&_password===_passwordacc){
						console.log("aaa")
						var _ajax=new Ajax();
						_ajax.request({
							send:{
								"account":_account,
								"password":_password
							},
							api:"http://localhost:8081/new/kilo/7.3ajax/api/insert.php",
							success:function(_data){
								_data=window.eval("("+_data+")");
								console.log(_data)
								if(_data["code"]==200){
									window.location.href="dd.html"
								}
							}
						})
					}
				},100)
			}
		})
		
	})
}

window.onload=main;