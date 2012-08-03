bc.namespace("bswf.carRetired");
bswf.carRetired.MotorcadeLeaderCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
	
	},
	buildFormData : function(){
		$form = $(this);
		var FYJisComplete=$form.find(":input[name='FYJisComplete']:checked").val();
		var isZjs=$form.find(":input[name='isZjs']:checked").val();
		$form.find(":input[name='mlcFYJisComplete']").val(FYJisComplete);
		$form.find(":input[name='mlcIsZjs']").val(isZjs);
	},
	/** 表单验证方法 */
	validateForm: function(){
		bswf.carRetired.MotorcadeLeaderCheckForm.buildFormData.call(this);
		if(!bc.validator.validate(this))
			return false;
		return true;
	}
};
