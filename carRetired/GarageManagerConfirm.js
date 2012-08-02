bc.namespace("bswf.carRetired");
bswf.carRetired.GarageManagerConfirmForm = {
	init : function(option,readonly){
		var $form = $(this);
		$form.find(":input[name='gmcDesc']").val("上述情况属实，本部门手续已经完成。");
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		return true;
	}
};