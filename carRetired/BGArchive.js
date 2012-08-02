bc.namespace("bswf.carRetired");
bswf.carRetired.BGArchiveForm = {
	init : function(option,readonly){
		var $form = $(this);
	},
	buildFormData : function(){
		$form = $(this);
		var isComplete=$form.find(":input[name='isComplete']:checked").val();
		$form.find(":input[name='bgaIsComplete']").val(isComplete);
	},
	/** 表单验证方法 */
	validateForm: function(){
		bswf.carRetired.BGArchiveForm.buildFormData.call(this);
		if(!bc.validator.validate(this))
			return false;
		return true;
	}
};