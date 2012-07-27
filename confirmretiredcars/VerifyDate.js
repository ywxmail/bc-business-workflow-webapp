bc.namespace("bswf.confirmretiredcars");
bswf.confirmretiredcars.VerifyDateForm = {
	init : function(option,readonly){
	},
	buildFormData : function(){
		$form = $(this);
		var $carTRs = $form.find("#cars tr:gt(0)");
		var cars = [];
		$carTRs.each(function(){
			$tr = $(this);
			var $inputs = $tr.find(":input");
			var car = {
				id: $inputs[0].value,
				plateNo: $inputs[1].value,
				isClaim: $inputs[2].value,
				executionType: $inputs[3].value,
				sureReturnDate: $inputs[4].value
			};
			cars.push(car);
		});
		$form.find(":input[name='list_vd_cars']").val($.toJSON(cars));
		$form.find(":input[name='list_vd_cars_gl']").val($.toJSON(cars));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		//alert("GatherCars.validateForm");
		if(!bc.validator.validate(this))
			return false;
		bswf.confirmretiredcars.VerifyDateForm.buildFormData.call(this);
		return true;
	}
};