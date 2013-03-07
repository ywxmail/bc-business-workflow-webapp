bc.namespace("bswf.requestServiceCertificate");
bswf.requestServiceCertificate.financeAccountDirectorConfirmForm = {
	init : function(option,readonly){
		var $form = $(this);

	},
	
	buildFormData : function(){
		
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.requestServiceCertificate.financeAccountDirectorConfirmForm.buildFormData.call(this);
		
		return true;
	}
};