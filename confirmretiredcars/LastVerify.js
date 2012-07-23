bc.namespace("bswf.confirmretiredcars");
bswf.confirmretiredcars.LastVerifyForm = {
	init : function(option,readonly){
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		//alert("GatherCars.validateForm");
		if(!bc.validator.validate(this))
			return false;
		
		$form = $(this);
		var $carTRs = $form.find("#cars tr:gt(0)");
		var cars = [];
		$carTRs.each(function(){
			$tr = $(this);
			var $inputs = $tr.find(":input");
			var car = {
				id: $inputs[0].value,
				isClaim: $inputs[1].value,
				plateNo: $inputs[2].value,
				executionType: $inputs[3].value
			};
			cars.push(car);
		});
		$form.find(":input[name='list_lv_cars']").val($.toJSON(cars));
		return true;
	}
};