bc.namespace("bswf.carRetired");
bswf.carRetired.returnCertificatesForm = {
	init : function(option,readonly){
		var $form = $(this);
		$form.find(":input[name='rcDesc']").val("已交回证件等相关资料。");
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		return true;
	}
};