bc.namespace("bswf.companyComplainHandle");
bswf.companyComplainHandle.affirm4BranchManagerForm = {
	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
		//判断是否能办理
		var isTransact=$form.find("input[name='isTransact4BranchManager']").val();
		if(isTransact=="false"){
			bc.msg.alert("服务督办员审核驾驶员的客管投诉信息后才能办理！请联系服务督办员！");	
			return false;
		}
	
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
				$form.find(":input[name='isReturn_lc']").val(value);
			}
		
		}
		
		$form.find("input[name='isTransact4BranchManager']").val(false)

		return true;
	}
	
};