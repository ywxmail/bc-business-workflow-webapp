bc.namespace("bswf.requestServiceCertificate");
bswf.requestServiceCertificate.inChargeOfOperationDeputyGeneralManagerCheckForm = {
	init : function(option,readonly){
		var $form = $(this);

	},
	
	buildFormData : function(){
		var $form=$(this);
		var risReturn=$form.find(":input[name='risReturn']:checked").val();
		$form.find(":input[name='isReturn']").val(risReturn);
		$form.find(":input[name='isReturn_lc']").val(risReturn);
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		var $form=$(this);
		if($form.find(":input[name='risReturn']:checked").size()==0){
			bc.msg.alert("请选择下一步相关操作！")
			return false;
		}
		
		bswf.requestServiceCertificate.inChargeOfOperationDeputyGeneralManagerCheckForm.buildFormData.call(this);
		
		return true;
	}
};