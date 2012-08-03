bc.namespace("bswf.carRetired");
bswf.carRetired.HRTakeBackCardForm = {
	init : function(option,readonly){
		var $form = $(this);
	},
	buildFormData : function(){
		$form = $(this);
		var isReclaim=$form.find(":input[name='isReclaim']:checked").val();
		$form.find(":input[name='hrIsReclaim']").val(isReclaim);
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.HRTakeBackCardForm.buildFormData.call(this);
		return true;
	}
};