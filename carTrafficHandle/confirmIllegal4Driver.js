bc.namespace("bswf.carTrafficHandle");
bswf.carTrafficHandle.confirmIllegal4DriverForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//选择当事司机
		$form.find("#addDriver").click(function() {
			bs.selectDriver({
				onOk : function(carMan) {
					$form.find(":input[name='driverId']").val(carMan.id);
					$form.find(":input[name='driver']").val(carMan.name);
				}
			});
					
		});

		
		
		
		
		
		
		
	},
};