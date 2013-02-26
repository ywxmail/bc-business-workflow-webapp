bc.namespace("bswf.infractBusinessInfo.version2");
bswf.infractBusinessInfo.version2.serviceSupervisionTeamCloseFileForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	buildFormData : function(){
		var $form = $(this);
		var check=$form.find(":input[name='risClosed']:checked").val();
		$form.find(":input[name='isClosed']").val(check);
	},
	/** 表单验证方法 */
	validateForm: function(){
		var $form = $(this);
	
		if(!bc.validator.validate(this))
			return false;
		
		//是否结案
		if($form.find(":input[name='risClosed']:checked").size()>0){
			bswf.infractBusinessInfo.version2.serviceSupervisionTeamCloseFileForm.buildFormData.call(this);
		}else{
			bc.msg.alert("请确认是否将该违章信息结案！");
			return false;
		}

		return true;
	}
	
};