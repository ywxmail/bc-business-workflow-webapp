bc.namespace("bswf.carManEntry");
bswf.carManEntry.QualificationCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	
	buildFormData : function(){
		$form = $(this);
		var qcIsAgree_temp=$form.find(":input[name='qcIsAgree_temp']:checked").val();
		$form.find(":input[name='qcIsAgree']").val(qcIsAgree_temp);
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.carManEntry.QualificationCheckForm.buildFormData.call(this);
		
		return true;
	}
};