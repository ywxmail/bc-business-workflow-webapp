bc.namespace("bswf.requestServiceCertificate");
bswf.requestServiceCertificate.recheckSeal2HRForm = {
	init : function(option,readonly){
		var $form = $(this);
		
	},
	
	buildFormData : function(){
		var $form = $(this);
		var risPass=$form.find(":input[name='risPass']:checked").val();
		$form.find(":input[name='isPass']").val(risPass);
		$form.find(":input[name='isPass_lc']").val(risPass);
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		var $form=$(this);
		
		if($form.find(":input[name='risPass']:checked").size()==0){
			bc.msg.alert("请选择下一步相关操作！")
			return false;
		}	
			
		bswf.requestServiceCertificate.recheckSeal2HRForm.buildFormData.call(this);
		return true;
	}
};