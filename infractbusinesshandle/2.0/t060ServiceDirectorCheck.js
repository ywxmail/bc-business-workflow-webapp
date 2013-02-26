bc.namespace("bswf.infractBusinessInfo.version2");
bswf.infractBusinessInfo.version2.serviceDirectorCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		$form.find(":input[name='risReturn']").change(function(){
			var $div=$form.find("#grade");
			switch($(this).val()){
				case "true":
					$div.hide();
					if(!$form.find(":input[name='grade']").hasClass("ignore")){
						$form.find(":input[name='grade']").addClass("ignore");
					}
					break;
				case "false":
					$div.show();
					if($form.find(":input[name='grade']").hasClass("ignore")){
						$form.find(":input[name='grade']").removeClass("ignore");
					}
					break;
				default :"other";
			}
		});

	},
	buildFormData : function(){
		var $form = $(this);
		var check=$form.find(":input[name='risReturn']:checked").val();
		$form.find(":input[name='isReturn']").val(check);
		$form.find(":input[name='isReturn_lc']").val(check);

		if(check=="false"){
			var grade=$form.find(":input[name='rGrade']:checked").val();
			$form.find(":input[name='grade']").val(grade);
		}
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		var $form = $(this);
		
		if($form.find(":input[name='risReturn']:checked").size()>0){
			var check=$form.find(":input[name='risReturn']:checked").val();
			if(check=="false"){
				if($form.find(":input[name='rGrade']:checked").size()==0){
					bc.msg.alert("请对投诉处理质量进行评分！");
					return false;
				}
			}
		}else{
			bc.msg.alert("请确认下一步相关操作！");
			return false;
		}
		
		bswf.infractBusinessInfo.version2.serviceDirectorCheckForm.buildFormData.call(this);
		
		return true;
	}
};