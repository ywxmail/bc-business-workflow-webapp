bc.namespace("bswf.carRetired");
bswf.carRetired.GarageTransactorCheckForm= {
	init : function(option,readonly){
		var $form = $(this);
		$form.find("#gtcDebt").hide();
		$form.find(":input[name='YCTisDebt']").change(function(){
			var YCTisDebt=$form.find(":input[name='YCTisDebt']:checked").val();
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
		var YCTisComplete=$form.find(":input[name='YCTisComplete']:checked").val();
		var YCTisDebt=$form.find(":input[name='YCTidDebt']:checked").val();
		$form.find(":input[name='gtcYCTisComplete']").val(YCTisComplete);
		$form.find(":input[name='gtcYCTisDebt']").val(YCTisDebt);
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.GarageTransactorCheckForm.buildFormData.call(this);
		return true;
	}
};