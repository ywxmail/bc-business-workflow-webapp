bc.namespace("bswf.infractBusinessInfo.");
bswf.infractBusinessInfo..DepartmentCooperationForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	buildFormData : function(){
		
	
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.infractBusinessInfo.DepartmentCooperationForm.buildFormData.call(this);
		
		return true;
	}
};