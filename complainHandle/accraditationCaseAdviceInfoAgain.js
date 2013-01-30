bc.namespace("bswf.complainHandle");
bswf.complainHandle.accraditationCaseAdviceInfoAgainForm = {
	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
		//获取完成时间
		$form.find("input[type='hidden'][name='finish4Majordomo']").val("");
		var myDate = new Date();
		var year=myDate.getFullYear();
		var month=myDate.getMonth()+1;
		var date=myDate.getDate();
		$form.find("input[type='hidden'][name='finish4Majordomo']").val(year+"年"+month+"月"+date+"日");
		
		if(!bc.validator.validate(this))
			return false;
			
		//是否返回监督组重办
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
				$form.find(":input[type='hidden'][name='isReturn']").val(value);
				$form.find(":input[type='hidden'][name='isReturn_lc']").val(value);
			}
		
		}

		return true;
	}
	
};