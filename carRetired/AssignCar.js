bc.namespace("bswf.carRetired");
bswf.carRetired.AssignCarForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//加载车辆责任人信息
		var chargerName=$form.find(":input[name='charger']").val();
		if(chargerName != null && chargerName.length > 0){
			var strAry = chargerName.split(";");
			var tempStr = "";
			for(var i=0;i<strAry.length;i++){
				tempStr += strAry[i].split(",")[0];
				if((i+1) < strAry.length)
					tempStr += "、";
			}
			$form.find(":input[name='chargerName']").val(tempStr);	
		}
		
		//绑定选择车辆事件
		$form.find("#addCar").click(function() {
			bs.selectCar({
				status: '0',
				data:{multiple: false,loadLevel:'1'},
				onOk : function(car) {
					$form.find(":input[name='carId']").val(car.id);
					$form.find(":input[name='plate']").val(car.plate);
					$form.find(":input[name='plateNo']").val(car.plateNo);
					$form.find(":input[name='plateType']").val(car.plateType);
					$form.find(":input[name='unitCompany']").val(car.unitCompany);
					$form.find(":input[name='verifyUnitId']").val(car.unitCompanyId);
					$form.find(":input[name='motorcadeId']").val(car.motorcadeId);
					$form.find(":input[name='motorcadeName']").val(car.motorcadeName);
					$form.find(":input[name='factoryType']").val(car.factoryType);
					$form.find(":input[name='ccEndDate']").val(car.ccEndDate.substring(0,10));
					$form.find(":input[name='driverName']").val(car.driverName);
					$form.find(":input[name='driverFWZG']").val(car.driverFWZG);
					var str = car.charger;
					if(str != null && str.length > 0){
						var strAry = str.split(";");
						var tempStr = "";
						for(var i=0;i<strAry.length;i++){
							tempStr += strAry[i].split(",")[0];
							if((i+1) < strAry.length)
								tempStr += "、";
						}
						$form.find(":input[name='chargerName']").val(tempStr);
					}
					$form.find(":input[name='charger']").val(car.charger);
					
					$form.find(":input[name='subject']").val(car.plate+"退出营运验收审批"+"（"+car.unitCompany+"）");
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