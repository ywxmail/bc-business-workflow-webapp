bc.namespace("bswf.carActive");
bswf.carActive.t13SendCertificateForm = {
	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
	
		if(!bc.validator.validate(this))
			return false;
			
		//是入库
		if($form.find("input[type='radio'][name='isUpdate']").size()!=0){
			$rhandings=$form.find("input[type='radio'][name='isUpdate']");
			var checked=false;
			var value;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			
			if(!checked){
				bc.msg.alert("请确认是否将车辆入库！");
				return false;
			}else{
				$form.find(":input[name='isUpdate']").val(value);
			}
		}else{
			$form.find(":input[name='isUpdate']").val(false);
		}

		return true;
	}
	
};