bc.namespace("bswf.complainHandle");
bswf.complainHandle.DepartmentCooperationForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	buildFormData : function(){
		
	
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.complainHandle.DepartmentCooperationForm.buildFormData.call(this);
		
		return true;
	}
};