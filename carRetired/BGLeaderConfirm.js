bc.namespace("bswf.carRetired");
bswf.carRetired.BGLeaderConfirmForm = {
	init : function(option,readonly){
		var $form = $(this);
		$form.find(":input[name='bglcDesc']").val("情况属实，请计财部结算。");
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		return true;
	}
};