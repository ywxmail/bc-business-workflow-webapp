bc.namespace("bswf.carManEntry");
bswf.carManEntry.UnitManagerInterviewForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	
	buildFormData : function(){
		$page = $(this);
		
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.carManEntry.UnitManagerInterviewForm.buildFormData.call(this);
		
		return true;
	}
};