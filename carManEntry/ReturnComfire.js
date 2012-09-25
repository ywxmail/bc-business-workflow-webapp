bc.namespace("bswf.carManEntry");
bswf.carManEntry.ReturnComfireForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		$form.find(".oldCar").hide();
		
		//绑定车辆需求事件
		$form.find(":input[name='is2NeedOldCar']").change(function(){
			var flag=$(this).val();
			if(flag == 'true'){
				$form.find(":input[name='oldCarPlate']").attr("data-validate","required");
				$form.find(".oldCar").show();
			}else{
				$form.find(".oldCar").hide();
				$form.find(":input[name='oldCarPlate']").val('');
				$form.find(":input[name='oldCarId']").val('');
				$form.find(":input[name='oldCarUnitCompanyId']").val('');
				$form.find(":input[name='oldCarPlate']").removeAttr("data-validate");
			}
		});	
		
		//绑定车辆选择按钮
		$form.find("#selectCar").click(function(){
			bs.selectCar({
				status: '0',
				data:{multiple: false,loadLevel:'1'},
				onOk:function(car){
					$form.find(":input[name='oldCarPlate']").val(car.plate);
					$form.find(":input[name='oldCarId']").val(car.id);
					$form.find(":input[name='oldCarUnitCompanyId']").val(car.unitCompanyId);
				}
			});
		});
	},
	
	buildFormData : function(){
		$page = $(this);
		
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.carManEntry.UnitManagerInterviewForm.buildFormData.call(this);
		
		return true;
	}
};