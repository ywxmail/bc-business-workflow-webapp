bc.namespace("bswf.companyComplainHandle");
bswf.companyComplainHandle.accraditationCaseAdviceInfoForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//是否送相关部门协办的处理方式事件
		$form.find("input[type='radio'][name='nextStep']").change(function(){
			
			$rhandings=$form.find("input[type='radio'][name='nextStep']");
			var checked=false;
			var value;
			var name;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			if(checked && value=="true"){
				//隐藏评分按钮
				$form.find("#grade").hide();
				$form.find(":input[type='hidden'][name='isReturn']").val(value);
				$form.find(":input[type='hidden'][name='isReturn_lc']").val(value);
				//添加ignore样式
				$form.find(":input[type='hidden'][name='grade']").addClass("ignore");
			}else{
				//展开评分按钮
				$form.find("#grade").show();
				$form.find(":input[type='hidden'][name='isReturn']").val(false);
				$form.find(":input[type='hidden'][name='isReturn_lc']").val(false);
				//添加ignore样式
				$form.find(":input[type='hidden'][name='grade']").removeClass("ignore");
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
		
		//下一步相关操作
		if($form.find("input[type='radio'][name='nextStep']").size()!=0){
			$rhandings=$form.find("input[type='radio'][name='nextStep']");
			var checked=false;
			var value;
			var name;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					name=$(this).attr("id");
					checked=true;
				}
			});
			
			if(!checked){
				bc.msg.alert("请确认下一步相关操作！");
				return false;
			}else{
				$form.find(":input[name='"+name+"']").val(value);
				$form.find(":input[name='isReturn_lc']").val(value);
			}
		
		}
		//投诉处理评分
		if($form.find("input[type='radio'][name='grade']").size()!=0 && isReturnValue=="false"){
			$rhandings=$form.find("input[type='radio'][name='grade']");
			var checked=false;
			var value;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			
			if(!checked){
				bc.msg.alert("请对投诉处理质量进行评分！");
				return false;
			}else{
				$form.find(":input[name='grade']").val(value);
			}
		
		}
		

		return true;
	}
};