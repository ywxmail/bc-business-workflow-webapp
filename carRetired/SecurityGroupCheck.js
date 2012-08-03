bc.namespace("bswf.carRetired");
bswf.carRetired.SecurityGroupCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
	},
	buildFormData : function(){
		$form = $(this);
		var CaseIsComplete=$form.find(":input[name='CaseIsComplete']:checked").val();
		var BlackListIsDone=$form.find(":input[name='BlackListIsDone']:checked").val();
		$form.find(":input[name='sgCaseIsComplete']").val(CaseIsComplete);
		$form.find(":input[name='sgBlackListIsDone']").val(BlackListIsDone);
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.SecurityGroupCheckForm.buildFormData.call(this);
		return true;
	}
};