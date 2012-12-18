bc.namespace("bswf.carActive");
bswf.carActive.fillInInfoForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//选择司机1
		$form.find("#addDriver1").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					//$form.find(":input[name='driver1']").val(driver.name);
					$form.find(":input[name='driver1_gl']").val(driver.name);
					$form.find(":input[name='driverId1_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4Driver1_gl']").val(driver.cert4FWZG);
				}
			});
		});	
		//选择司机2
		$form.find("#addDriver2").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					//$form.find(":input[name='driver2']").val(driver.name);
					$form.find(":input[name='driver2_gl']").val(driver.name);
					$form.find(":input[name='driverId2_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4Driver2_gl']").val(driver.cert4FWZG);
				}
			});
		});	
		
		//选择迁出司机1
		$form.find("#addOldDriver1").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					//$form.find(":input[name='driver1']").val(driver.name);
					$form.find(":input[name='oldDriver1_gl']").val(driver.name);
					$form.find(":input[name='oldDriverId1_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4oldDriver1_gl']").val(driver.cert4FWZG);
				}
			});
		});	
		//选择选出司机2
		$form.find("#addOldDriver2").click(function() {
			bs.selectDriver({
				onOk : function(driver) {
					$form.find(":input[name='oldDriver2_gl']").val(driver.name);
					$form.find(":input[name='oldDriverId2_gl']").val(driver.id);
					$form.find(":input[name='certFwzg4oldDriver2_gl']").val(driver.cert4FWZG);
				}
			});
		});	
	},
	
};