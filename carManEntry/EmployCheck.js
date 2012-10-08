bc.namespace("bswf.carManEntry");
bswf.carManEntry.EmployCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	
	buildFormData : function(){
		$form = $(this);
		var ecIsEmploy_temp=$form.find(":input[name='ecIsEmploy_temp']:checked").val();
		$form.find(":input[name='ecIsEmploy']").val(ecIsEmploy_temp);
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.carManEntry.EmployCheckForm.buildFormData.call(this);
		
		return true;
	}
};