bc.namespace("bswf.companyComplainHandle");
bswf.companyComplainHandle.auditing4MonitoringGroupForm = {
		init : function(option,readonly){
			var $form = $(this);
			//是否归档
			$form.find("input[type='radio'][name='isReturn']").change(function(){
				
				$rhandings=$form.find("input[type='radio'][name='isReturn']");
				var checked=false;
				var value;
				$rhandings.each(function(){
					if($(this)[0].checked){
						value=$(this).val();
						checked=true;
					}
				});
				if(checked && value=="true"){
					$form.find(":input[type='hidden'][name='isReturn']").val(value);
					$form.find(":input[type='hidden'][name='isReturn_lc']").val(value);
				}else{
					$form.find(":input[type='hidden'][name='isReturn']").val(false);
					$form.find(":input[type='hidden'][name='isReturn_lc']").val(false);
				}
				
			});

				
		},	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
		//是否返回	
		var isReturnValue=$form.find("input[type='hidden'][name='isReturn']").val();

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
				$form.find(":input[type='hidden'][name='isReturn']").val(value);
			}
		
		}
		

		return true;
	}
	
};