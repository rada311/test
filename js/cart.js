class Cart{
	take(){
		//[{"ID":"20190702144800125","counter":"8","comment":"123456ert"},{"ID":"20190702144800125","counter":"8","comment":"123456ert"},{"ID":"20190702144800125","counter":"8","comment":"123456ert"}]
		let _reg=/\bcat\b=\[(\{("\w+":"?[\u4e00-\u9fa5\w]+"?,?)+},?)*]/g;
// var _regex=/\b1911ACart\b=\[(\{("\w+":"[\u4e00-\u9fa5\w]+",?)+},?)*]/g;
		this.cookie=document.cookie;
		//console.log(this.cookie)
		//console.log(_reg.test(this.cookie))
		_reg.lastIndex=-1;
		if(_reg.test(this.cookie)){
			_reg.lastIndex=-1;
			this.cookie=this.cookie.match(_reg)[0].replace(/cat=/g,"");
			this.cookie=window.eval("("+this.cookie+")");
		}else{
			this.cookie=[];
		}
		//console.log(this.cookie);
	}
	date(){
		return new Date(new Date().getTime()+7*24*60*60*1000);
	}
	save(){
		document.cookie="cat="+JSON.stringify(this.cookie)+";path=/;expires="+this.date();
	}
	push(_identify,_counter,_comment){
		this.take();
		//console.log(this.cookie,this.cookie.length)
		let _exist=0;
		for(let i=0;i<this.cookie.length;i++){
			//console.log(_identify,this.cookie[i].ID);
			if(_identify==this.cookie[i].ID&&_comment==this.cookie[i].comment){
				this.cookie[i].counter=Number(this.cookie[i].counter)+_counter+"";
				_exist=1;
				break;
			}
		}
		if(!_exist){
			this.cookie.push({
				"ID":_identify,
				"counter":_counter+"",
				"comment":_comment
			})
		}
		this.save();
		//console.log(this.cookie);
	}
	
	sub(_identify,_counter,_comment){
		this.take();
		for(let i=0;i<this.cookie.length;i++){
			if(_identify==this.cookie[i].ID&&_comment==this.cookie[i].comment){
				if(this.cookie[i].counter>_counter){
					this.cookie[i].counter=this.cookie[i].counter-_counter+"";
					break;
				}else{
					this.cookie.splice(i,1);
				}
			}
		}
		this.save();
	}
	
	remove(_identify,_comment){
		this.take();
		for(let i=0;i<this.cookie.length;i++){
			if(_identify==this.cookie[i].ID&&_comment==this.cookie[i].comment){
				this.cookie.splice(i,1);
				break;
			}
		}
		this.save();
	}
	
	change(_identify,_counter,_comment){
		this.take();
		for(let i=0;i<this.cookie.length;i++){
			if(_identify==this.cookie[i].ID&&_comment==this.cookie[i].comment&&/^[1-9]\d*$/g.test(_counter)){
				this.cookie[i].counter=_counter+"";
				break;
			}
		}
		this.save();
	}
	
	sums(_identify,_comment,_price){
		//console.log(_price)
		let _sums=0;
		this.take();
		for(let i=0;i<this.cookie.length;i++){
			if(this.cookie[i].ID==_identify&&this.cookie[i].comment==_comment){
				_sums+=Number(this.cookie[i].counter);
			}
		}
		return (_sums*_price).toFixed(2);
	}
	
	sum(){
		let _sum=0;
		this.take();
		for(let i=0;i<this.cookie.length;i++){
			_sum+=Number(this.cookie[i].counter);
		}
		return _sum;
	}
}


// let _cart=new Cart();
// _cart.push("01",2,"s");