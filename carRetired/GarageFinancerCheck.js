bc.namespace("bswf.carRetired");
bswf.carRetired.GarageFinancerCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		$form.find(":input[name='isDebt']").change(function(){
			var isDebt=$form.find(":input[name='isDebt']:checked").val();
			if(isDebt == 'true'){
				$form.find("#idGfcDesc").show();
				$form.find(":input[name='gfcDesc']").attr("data-validate","required");
			}else{
				$form.find(":input[name='gfcDesc']").val('');
				$form.find(":input[name='gfcDesc']").removeAttr("data-validate");
				$form.find("#idGfcDesc").hide();
			}
		});
	},
	buildFormData : function(){
		$form = $(this);
		var isDebt=$form.find(":input[name='isDebt']:checked").val();
		$form.find(":input[name='gfcIsDebt']").val(isDebt);
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.GarageFinancerCheckForm.buildFormData.call(this);
		return true;
	}
};