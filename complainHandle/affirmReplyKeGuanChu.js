bc.namespace("bswf.complainHandle");
bswf.complainHandle.affirmReplyKeGuanChuForm = {

	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
	
		if(!bc.validator.validate(this))
			return false;
		
		//是否结案
		if($form.find("input[type='radio'][name='isClosed']").size()!=0){
			$rhandings=$form.find("input[type='radio'][name='isClosed']");
			var checked=false;
			var value;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			
			if(!checked){
				bc.msg.alert("请确认是否将该交通违法信息结案！");
				return false;
			}else{
				$form.find(":input[name='isClosed']").val(value);
			}
		
		}

		return true;
	}
	
};