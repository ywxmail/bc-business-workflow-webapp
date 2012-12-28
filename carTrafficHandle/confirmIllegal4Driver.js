bc.namespace("bswf.carTrafficHandle");
bswf.carTrafficHandle.confirmIllegal4DriverForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//选择当事司机
		$form.find("#addDriver").click(function() {
			var carId = $form.find(":input[name='case4InfractTraffic_carId']").val();
			bs.findInfoByCar({
				carId: carId,
				multiple: true,
				success: function(info){
						if(info.driver.length>0){
						var drivers=info.driver;
						$.each(drivers,function(i,carMan){

							$form.find(":input[name='driverId']").val(carMan.id);
							$form.find(":input[name='driver']").val(carMan.name);
							$form.find(":input[name='cert4fwzg']").val(carMan.cert4FWZG);
							$form.find(":input[name='certDrivingFirstDate']").val(carMan.certDrivingFirstDate);
							$form.find(":input[name='workDate']").val(carMan.workDate);
							//组装主题
							var subject = $form.find(":input[name='subject']").val();
							$form.find(":input[name='subject']").val(subject+'('+carMan.name+')');
							//通过司机ID查找该司机的违法信息
							var happenDate = $form.find(":input[name='case4InfractTraffic_happenDate']").val();
							var url=bc.root + "/bc-business/caseTraffic/getCaseTrafficInfoByCarManId";
							$.ajax({
								url:url,
								dataType:"json",
								data:{carManId:carMan.id,happenDate:happenDate},
								success:function(json){
									$form.find(":input[name='happenNumber']").val(json.count);
									$form.find("input[name='accumulatedPoints']").val(json.accumulatedPoints);
									$form.find(":input[name='availableScore']").val(json.remainder);
									//如果扣完12分就要通知停运
									if(json.remainder==0){
									$form.find("#driverInfo").append('<tr><td >&nbsp;</td><td class="value" colspan="5" style="text-align: left;">'
																	+'<input type="checkbox" name="toldStop" Style="width:1em;" value="true" />'
																	+'<label>&nbsp;已通知司机停运</label>'
																	+'<input type="hidden" name="toldStop" class="ui-widget-content" value="" data-scope="global"></td></tr>');
									}
								}
							});

						});
					}
				}
			});			
		});
		
		
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		$form = $(this);
	
		if(!bc.validator.validate(this))
			return false;
			
		//通知司机停运
		if($form.find("input[type='checkbox'][name='toldStop']").size()!=0){
			$rhandings=$form.find("input[type='checkbox'][name='toldStop']");
			var checked=false;
			var value;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			
			if(!checked){
				bc.msg.alert("请通知司机停运！");
				return false;
			}else{
				$form.find(":input[name='toldStop']").val(value);
			}
	
		}

		return true;
	},
	/** 选择司机后 */
	afterSelectCarMan: function(event, ui){
		var $form = $(this).closest(".bc-page");
//		$form.find(":input[name='e.carId']").val(ui.item.id);// 车辆ID
//		$form.find(":input[name='e.company']").val(ui.item.company);// 公司
//		$form.find(":input[name='e.motorcade.id']").val(ui.item.motorcadeId);// 公司
		

		$form.find(":input[name='driverId']").val(ui.item.id);
		$form.find(":input[name='driver']").val(ui.item.name);
		$form.find(":input[name='cert4fwzg']").val(ui.item.cert4FWZG);
		$form.find(":input[name='certDrivingFirstDate']").val(ui.item.certDriverFirstDate);
		$form.find(":input[name='workDate']").val(ui.item.workDate);
		//组装主题
		var subject = $form.find(":input[name='subject']").val();
		$form.find(":input[name='subject']").val(subject+'('+ui.item.name+')');
		//通过司机ID查找该司机的违法信息
		var happenDate = $form.find(":input[name='case4InfractTraffic_happenDate']").val();
		var url=bc.root + "/bc-business/caseTraffic/getCaseTrafficInfoByCarManId";
		$.ajax({
			url:url,
			dataType:"json",
			data:{carManId:ui.item.id,happenDate:happenDate},
			success:function(json){
				$form.find(":input[name='happenNumber']").val(json.count);
				$form.find("input[name='accumulatedPoints']").val(json.accumulatedPoints);
				$form.find(":input[name='availableScore']").val(json.remainder);
				//如果扣完12分就要通知停运
				if(json.remainder==0){
				$form.find("#driverInfo").append('<tr><td >&nbsp;</td><td class="value" colspan="5" style="text-align: left;">'
												+'<input type="checkbox" name="toldStop" Style="width:1em;" value="true" />'
												+'<label>&nbsp;已通知司机停运</label>'
												+'<input type="hidden" name="toldStop" class="ui-widget-content" value="" data-scope="global"></td></tr>');
				}
			}
		});

			// 记得返回false，否则司机域信息会被清空
		return false;
	}
	
};