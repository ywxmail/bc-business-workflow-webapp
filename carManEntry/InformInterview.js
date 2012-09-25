bc.namespace("bswf.carManEntry");
bswf.carManEntry.InformInterviewForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	
	buildFormData : function(){
		$form = $(this);
		var iiIsJoin_temp=$form.find(":input[name='iiIsJoin_temp']:checked").val();
		$form.find(":input[name='iiIsJoin']").val(iiIsJoin_temp);
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.carManEntry.InformInterviewForm.buildFormData.call(this);
		
		return true;
	}
};