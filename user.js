var UserProfile = function(user_json){
	this.id =user_json.id;
	this.f_name = user_json.f_name;	
	this.l_name = user_json.l_name;
	this.pic = user_json.pic;
	
	if(this.pic == null){
		console.log('this.pic is null');
	}
	if(user_json.pic == null){
		console.log('json is null');
	}
}

