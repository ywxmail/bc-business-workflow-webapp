bc.namespace("bswf.carRetired");
bswf.carRetired.UnitSafetyOfficerCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
	},
	buildFormData : function(){
		$form = $(this);
		var JTSGisComplete=$form.find(":input[name='JTSGisComplete']:checked").val();
		$form.find(":input[name='usocJTSGisComplete']").val(JTSGisComplete);
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.UnitSafetyOfficerCheckForm.buildFormData.call(this);
		return true;
	}
};