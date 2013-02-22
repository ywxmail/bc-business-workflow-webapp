bc.namespace("bswf.requirement");
bswf.requirement.proposerConfirmForm = {
	init : function(option,readonly){
		var $form = $(this);

		$form.find(":input[name='risReturn']").change(function(){
			switch($(this).val()){
				case "true":
					if(!$form.find(":input[name='grade']").hasClass("ignore")){
						$form.find(":input[name='grade']").addClass("ignore");
					}
					$form.find(".grade").hide();
					break;
				case "false":
					if($form.find(":input[name='grade']").hasClass("ignore")){
						$form.find(":input[name='grade']").removeClass("ignore");
					}
					$form.find(".grade").show();
					break;
				default : "Other";
			}
		});
		
	},
	buildFormData : function(){
		var $form = $(this);
		// 初始化控制流程走向的变量
		var _isReturn = $form.find(":input[name='_isReturn']").val();
		if(_isReturn=="true"){
			if($form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").removeClass("ignore");
			}
			$form.find(":input[name='isReturn']").val(false);
		}else{
			if(!$form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").addClass("ignore");
			}
		}
		
		if($form.find(":input[name='risReturn']:checked").val()=="true"){
			if($form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").removeClass("ignore");
			}
			$form.find(":input[name='isReturn']").val(true);
			$form.find(":input[name='isReturn_lc']").val(true);
		}else{
			$form.find(":input[name='isReturn_lc']").val(false);
			$form.find(":input[name='isReturn']").val(false);
			$form.find(":input[name='grade']").val($form.find(":input[name='rGrade']:checked").val());
		}
	},
	/** 表单验证方法 */
	validateForm: function(){
		var $form = $(this);
	
		if(!bc.validator.validate(this))
			return false;
		
		if($form.find(":input[name='risReturn']:checked").size()==0){
			bc.msg.alert("请确认下一步相关操作！");
			return false;
		}
		
		if($form.find(":input[name='risReturn']:checked").val()=="false"
			&&$form.find(":input[name='rGrade']:checked").size()==0){
			bc.msg.alert("请选择处理过程满意度评分！");
			return false;
		}

		bswf.requirement.proposerConfirmForm.buildFormData.call(this);
			
		return true;
	}
	
};