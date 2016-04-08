$(function() {
	var $err = $(".error");
	var $sex = $("#sex"),
		$man = $('#man'),
		$woman = $('#woman');
	$man.on('click', function(){
		$man.addClass("radio-active").removeClass("radio");
		$woman.addClass("radio").removeClass("radio-active");
		$sex.val("男");
	});
	$woman.on('click', function(){
		$woman.addClass("radio-active").removeClass("radio");
		$man.addClass("radio").removeClass("radio-active");
		$sex.val("女");
	});

	$("#sub").on("click", function(){
		var form = $("#subform")[0];
		if(!isNull([form.name, form.phone, form.email, form.school, form.schooladdress])){
			$err.html("请填写必填项");
			return;
		}

		if(!isPhone(form.phone.value)){
			$err.html("请填写正确手机号码");
			return;
		}

		if(!isEmail(form.email.value)){
			$err.html("请填写正确邮箱");
			return;
		}

		if(form.qq.value!="" && !isNumber(form.qq.value)){
			$err.html("请填写正确qq号码");
			return;
		}
		$err.html("");
		
		$.ajax({
			url: "/join",
			type: "post",
			data: {
				name: form.name.value,
				sex: form.sex.value,
				phone: form.phone.value,
				email: form.email.value,
				qq: form.qq.value,
				age: form.age.value,
				address: form.address.value,
				school: form.school.value,
				schooladdress: form.schooladdress.value,
				des: form.des.value,
				book: form.book.value
			},
			success: function(data){
				if(data.code==200){
					location.href = "/success";
				}else alert(data.msg);
			}
		})

	});


	function isNull(array){
		for(var i=0;i<array.length;i++){
			if(array[i].value=="") return false
		}
		return true;
	}
	// /^([0-9.]+)$/  phone  qq
	//email /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	function isNumber(val){
		var reg = /^([0-9.]+)$/;
		return reg.test(val);
	}
	function isPhone(val){
		var reg = /^[1][0-9]{10}$/;
		return reg.test(val);
		
	}
	function isEmail(val){
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		return reg.test(val);
	}


})