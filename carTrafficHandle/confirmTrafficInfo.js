bc.namespace("bswf.carTrafficHandle");
bswf.carTrafficHandle.confirmTrafficInfoForm = {
	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
	
		if(!bc.validator.validate(this))
			return false;
			
		//是否结案
		if($form.find("input[type='checkbox'][name='isClosed']").size()!=0){
			$rhandings=$form.find("input[type='checkbox'][name='isClosed']");
			var checked=false;
			var value;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			
			if(!checked){
				$form.find(":input[name='isClosed']").val(false);
			}else{
				$form.find(":input[name='isClosed']").val(value);
			}
	
		}

		return true;
	}
	
};