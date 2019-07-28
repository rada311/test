class Ajax{
    /**
     * 0
     */
    create(){
        try{
			return new XMLHttpRequest();
        }catch (e) {
            try{
                return new ActiveXObject("Microsoft.XMLHTTP")
            }catch (e) {
                return null;
            }
        }
    }
    format(_send){
        let _parameters="";//url "k=1&v=2"
        for(let p in _send){
            _parameters+=p+"="+_send[p]+"&";
        }
        // "k=1&v=2&"
        return _parameters.substring(0,_parameters.lastIndexOf("&"));
    }
    request(_config){
        let _xhr=this.create();
        _xhr.onreadystatechange=function(){
            if(_xhr.readyState===4){
                _config.success(_xhr.responseText);
            }
        };
        if(_config.send && (typeof(_config.send)).toLowerCase()==="object") {//如果传了参数就格式化参数
            _config.send = this.format(_config.send);
			//console.log(_config.send);
        }
        if((!_config.method || (_config.method && _config.method.toUpperCase()==="GET")) && _config.send){
            _config.api=_config.api+"?"+_config.send;//get方式给路径加参数
			
        }
        _xhr.open(!_config.method?"GET":_config.method,_config.api,(_config.async===true||_config.async===false)?_config.async:true);
        _xhr.setRequestHeader("Content-type","Application/x-www-form-urlencoded;charset=utf-8");
        //_xhr.send(!_config.send?null:_config.send);
		_xhr.send(_config.method&&_config.method.toLowerCase()==="post"&&_config.send?_config.send:null);
		console.log(_config.api);
		console.log(_config.method&&_config.method.toLowerCase()==="post"&&_config.send?_config.send:null);
    }
}
