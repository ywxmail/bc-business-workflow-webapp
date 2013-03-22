bc.namespace("bswf.carActive");
bswf.carActive.t01SendOutInstructionsForm = {
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
					$form.find(":input[name='filialeId_gl']").val(car.unitId);
					$form.find(":input[name='filiale_gl']").val(car.unitName);
					//车队
					$form.find(":input[name='motorcadeName_gl']").val(car.motorcadeName);
					$form.find(":input[name='motorcadeId']").val(car.motorcadeId);
					//管理号
					$form.find(":input[name='manageNo_gl']").val(car.manageNo);
					//车辆状态 
					$form.find(":input[name='status4Car']").val(car.status);
					//拼装主题 
					$form.find(":input[name='subject']").val("关于"+car.plate+"的出车处理流程");
					
					//如果选择的是在案车辆，则为变更，或重发包。自动选择司机
					if(car.status==0){
						bc.ajax({
							dataType: "json", data: {carId:car.id},
							url: bc.root + "/bc-business/findInfoByCar",
							success: function(json){
								logger.info("json=" + $.toJSON(json));
								if(json.drivers.length == 0){
									//提示用户此不正常现象
									bc.msg.alert("没有找到所选车辆对应的营运司机信息！");
								}else if(json.drivers.length == 1){
									$form.find(":input[name='oldDriver1_gl']").val(json.drivers[0].name);
									$form.find(":input[name='oldDriverId1_gl']").val(json.drivers[0].id);
									$form.find(":input[name='certFwzg4oldDriver1_gl']").val(json.drivers[0].cert4FWZG);
								}else{
									var drivers = json.drivers;
									var n=1;
									for(var i=0; i<drivers.length; i++){
										$form.find(":input[name='oldDriver"+n+"_gl']").val(drivers[i].name);
										$form.find(":input[name='oldDriverId"+n+"_gl']").val(drivers[i].id);
										$form.find(":input[name='certFwzg4oldDriver"+n+"_gl']").val(drivers[i].cert4FWZG);
										n++;
									}
								}
							}
						});

					}
					
					
				}
			})
		});
		
		//选择司机1
		$form.find("#addOldDriver1").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					$form.find(":input[name='oldDriver1_gl']").val(driver.name);
					$form.find(":input[name='oldDriverId1_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4oldDriver1_gl']").val(driver.cert4FWZG);
				}
			});
		});	
		//清除司机1
		$form.find("#clearOldDriver1").click(function() {
			$form.find(":input[name='oldDriver1_gl']").val("");
			$form.find(":input[name='oldDriverId1_gl']").val("");
			$form.find(":input[name='certFwzg4oldDriver1_gl']").val("");
		});

		//选择司机2
		$form.find("#addOldDriver2").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					$form.find(":input[name='oldDriver2_gl']").val(driver.name);
					$form.find(":input[name='oldDriverId2_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4oldDriver2_gl']").val(driver.cert4FWZG);
				}
			});
		});	
		//清除司机2
		$form.find("#clearOldDriver2").click(function() {
			
			$form.find(":input[name='oldDriver2_gl']").val("");
			$form.find(":input[name='oldDriverId2_gl']").val("");
			$form.find(":input[name='certFwzg4oldDriver2_gl']").val("");
			
		});

		
		//在司机招聘模块中选择聘用状态的司机1
		$form.find("#addTempDriver1").click(function() {
			bs.selectTempDriver({
				status: '2',
				onOk : function(driver) {
					$form.find(":input[name='driver1_gl']").val(driver.name);
					$form.find(":input[name='driverId1_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4Driver1_gl']").val(driver.certFWZG);
				}
			});
		});	
		//清除司机招聘模块中选择聘用状态的司机1
		$form.find("#clearTempDriver1").click(function() {
			
			$form.find(":input[name='driver1_gl']").val("");
			$form.find(":input[name='driverId1_gl']").val("");
			$form.find(":input[name='certFwzg4Driver1_gl']").val("");
			
		});

		
		//在司机招聘模块中选择聘用状态的司机2
		$form.find("#addTempDriver2").click(function() {
			bs.selectTempDriver({
				status: '2',
				onOk : function(driver) {
					$form.find(":input[name='driver2_gl']").val(driver.name);
					$form.find(":input[name='driverId2_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4Driver2_gl']").val(driver.certFWZG);
				}
			});
		});	
		
		//清除司机招聘模块中选择聘用状态的司机2
		$form.find("#clearTempDriver2").click(function() {
			
			$form.find(":input[name='driver2_gl']").val("");
			$form.find(":input[name='driverId2_gl']").val("");
			$form.find(":input[name='certFwzg4Driver2_gl']").val("");
			
		});

		
	},
	
};