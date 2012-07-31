bc.namespace("bswf.carRetired");
bswf.carRetired.CarInfoForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		$form.find("#addCar").click(function() {
			bs.selectCar({
				status: '0',
				data:{multiple: false,loadLevel:'1'},
				onOk : function(car) {
					$form.find(":input[name='carId']").val(car.id);
					$form.find(":input[name='plate']").val(car.plate);
					$form.find(":input[name='plateNo']").val(car.id);
					$form.find(":input[name='plateType']").val(car.id);
					$form.find(":input[name='factoryType']").val(car.id);
					$form.find(":input[name='logoutReason']").val(car.id);
					$form.find(":input[name='ccEndDate']").val(car.ccEndDate);
					$form.find(":input[name='sureReturnDate']").val(car.id);
					$form.find(":input[name='businessType']").val(car.id);
					$form.find(":input[name='logoutOwner']").val(car.id);
					$form.find(":input[name='isValuation']").val(car.id);
					$form.find(":input[name='charger']").val(car.charger);
				}
			})
		});
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		return true;
	}
};