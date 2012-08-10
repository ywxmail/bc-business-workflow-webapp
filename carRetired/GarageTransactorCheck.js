bc.namespace("bswf.carRetired");
bswf.carRetired.GarageTransactorCheckForm= {
	init : function(option,readonly){
		var $form = $(this);
		$form.find("#gtcDebt").hide();
		$form.find("select[name='gtcYCTisDebt']").change(function(){
			var YCTisDebt=$form.find("select[name='gtcYCTisDebt']").val();
			if(YCTisDebt == 'true'){
				$form.find("#gtcDebt").show();
			}else{
				$form.find(":input[name='gtcYCTDebtMoney']").val('');
				$form.find("#gtcDebt").hide();
			}
		});
	},
	buildFormData : function(){
		$form = $(this);
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.GarageTransactorCheckForm.buildFormData.call(this);
		return true;
	}
};