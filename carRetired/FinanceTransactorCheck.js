bc.namespace("bswf.carRetired");
bswf.carRetired.FinanceTransactorCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		//$form.find(":input[name='ftcDesc']").val("已结算。");
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		return true;
	}
};