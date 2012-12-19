bc.namespace("bswf.carActive");
bswf.carActive.inform4dispatchCarForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//绑定选择车辆事件
		$form.find("#addCar").click(function() {
			bs.selectCar({
				status: '-1,0',
				data:{multiple: false},
				onOk : function(car) {
					//车
					$form.find(":input[name='plate']").val(car.plate);
					$form.find(":input[name='plate_gl']").val(car.plate);
					$form.find(":input[name='carId_gl']").val(car.id);
					//分公司
					$form.find(":input[name='filiale']").val(car.unitName);
					$form.find(":input[name='filiale_gl']").val(car.unitName);
					$form.find(":input[name='filialeId_gl']").val(car.unitId);
					bc.ajax({
						dataType: "json", data: {carId:car.id},
						url: bc.root + "/bc-business/findInfoByCar",
						success: function(json){
							logger.info("json=" + $.toJSON(json));
							if(json.drivers.length == 0){
								//提示用户此不正常现象
								bc.msg.alert("没有找到所选车辆对应的营运司机信息！");
							}else if(json.drivers.length == 1){
								$form.find(":input[name='driver1']").val(json.drivers[0].name);
								$form.find(":input[name='driver1_gl']").val(json.drivers[0].name);
								$form.find(":input[name='driverId1_gl']").val(json.drivers[0].id);
								$form.find(":input[name='certFwzg4Driver1_gl']").val(json.drivers[0].cert4FWZG);
							}else{
								var drivers = json.drivers;
								var n=1;
								for(var i=0; i<drivers.length; i++){
									$form.find(":input[name='driver"+n+"']").val(drivers[i].name);
									$form.find(":input[name='driver"+n+"_gl']").val(drivers[i].name);
									$form.find(":input[name='driverId"+n+"_gl']").val(drivers[i].id);
									$form.find(":input[name='certFwzg4Driver"+n+"_gl']").val(drivers[i].cert4FWZG);
									n++;
								}
							}
						}
					});
				}
			})
		});
		
		//选择司机1
		$form.find("#addDriver1").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					$form.find(":input[name='driver1']").val(driver.name);
					$form.find(":input[name='driver1_gl']").val(driver.name);
					$form.find(":input[name='driverId1_gl']").val(driver.id);
				}
			});
		});	
		//选择司机2
		$form.find("#addDriver2").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					$form.find(":input[name='driver2']").val(driver.name);
					$form.find(":input[name='driver2_gl']").val(driver.name);
					$form.find(":input[name='driverId2_gl']").val(driver.id);
				}
			});
		});	
	},
	
};