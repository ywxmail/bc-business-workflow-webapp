bc.namespace("bswf.requestServiceCertificate");
bswf.requestServiceCertificate.recruiterRecheckForm = {
	init : function(option,readonly){
		var $form = $(this);

	},
	
	buildFormData : function(){
		var $form = $(this);
		var risRecheck=$form.find(":input[name='risRecheck']:checked").val();
		$form.find(":input[name='isRecheck']").val(risRecheck);
		$form.find(":input[name='isRecheck_lc']").val(risRecheck);
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		var $form=$(this);
		if($form.find(":input[name='risRecheck']:checked").size()==0){
			bc.msg.alert("请选择下一步相关操作！")
			return false;
		}	
		
		bswf.requestServiceCertificate.recruiterRecheckForm.buildFormData.call(this);
		
		return true;
	}
};