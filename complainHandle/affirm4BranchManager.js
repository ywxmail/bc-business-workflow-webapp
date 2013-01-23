bc.namespace("bswf.complainHandle");
bswf.complainHandle.affirm4BranchManagerForm = {
	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
	
		if(!bc.validator.validate(this))
			return false;
			
		//是否返回车队长核查
		if($form.find("input[type='radio'][name='isReturn']").size()!=0){
			$rhandings=$form.find("input[type='radio'][name='isReturn']");
			var checked=false;
			var value;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			
			if(!checked){
				bc.msg.alert("请确认下一步相关操作！");
				return false;
			}else{
				$form.find(":input[name='isReturn']").val(value);
			}
		
		}

		return true;
	}
	
};