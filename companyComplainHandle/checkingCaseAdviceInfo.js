bc.namespace("bswf.companyComplainHandle");
bswf.companyComplainHandle.checkingCaseAdviceInfoForm = {
		init : function(option,readonly){
			var $form = $(this);
			//是否返回车队长重办
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
					$form.find(":input[type='hidden'][name='isDelete']").val(true);
					//添加ignore样式
					$form.find(":input[type='hidden'][name='isTransact4BranchManager']").addClass("ignore");
				}else{
					$form.find(":input[type='hidden'][name='isReturn']").val(false);
					$form.find(":input[type='hidden'][name='isReturn_lc']").val(false);
					$form.find(":input[type='hidden'][name='isDelete']").val(false);
					//添加ignore样式
					$form.find(":input[type='hidden'][name='isTransact4BranchManager']").removeClass("ignore");
				}
				
			});

				
		},	
	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
		//判断是否能办理
		var isTransact=$form.find("input[name='isTransact4SupervisoryMember']").val();
		if(isTransact=="false"){
			bc.msg.alert("车队长核查处理驾驶员的客管投诉信息后才能办理！请联系车队长！");	
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
				$form.find(":input[type='hidden'][name='isReturn']").val(value);
			}
		
		}
		
		$form.find("input[name='isTransact4SupervisoryMember']").val(false)
		return true;
	}
	
};