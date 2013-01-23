bc.namespace("bswf.complainHandle");
bswf.complainHandle.handleCaseAdviceInfoForm = {
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
							$form.find(":input[name='case4Advice_driverCert']").val(carMan.cert4FWZG);
							$form.find(":input[name='workDate']").val(carMan.workDate);
							//组装主题
							var subject = $form.find(":input[name='subject']").val();
							$form.find(":input[name='subject']").val(subject+'('+carMan.name+')');
							//通过司机ID查找该司机的违法信息
							var happenDate = $form.find(":input[name='case4Advice_happenDate']").val();
							var url=bc.root + "/bc-business/caseAdvice/getSecurityServiceInfoByCarManId";
							$.ajax({
								url:url,
								dataType:"json",
								data:{carManId:carMan.id,happenDate:happenDate},
								success:function(json){
									//组装安全服务信息
									var info="该员从"+json.startDate+"起至本次事发日期止一上内发生："+"客管投诉"+parseInt(json.count4keguantousu+1)+"宗、总台投诉"
											+json.count4gongsitousu+"宗、交通违法"+json.count4jiaotongweizhang+"宗、营运违法"+json.count4yingyunweizhang
											+"宗、事故理赔"+json.count4shigulipei+"宗";
									$form.find(":input[name='securityServiceInfo']").val(info);
									//alert("count4keguantousu："+json.count4keguantousu+" count4gongsitousu:"+json.count4gongsitousu+" count4jiaotongweizhang:"+json.count4jiaotongweizhang+" count4yingyunweizhang:"+json.count4yingyunweizhang+" count4shigulipei:"+json.count4shigulipei)
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
			
		//检查保证书情况
		if($form.find("input[type='radio'][name='isGuarantee']").size()!=0){
			$rhandings=$form.find("input[type='radio'][name='isGuarantee']");
			var checked=false;
			var value;
			$rhandings.each(function(){
				if($(this)[0].checked){
					value=$(this).val();
					checked=true;
				}
			});
			
			if(!checked){
				bc.msg.alert("请确认驾驶员保证书信息！");
				return false;
			}else{
				$form.find(":input[name='isGuarantee']").val(value);
			}
	
		}

		return true;
	},
	/** 选择司机后 */
	afterSelectCarMan: function(event, ui){
		var $form = $(this).closest(".bc-page");
		
		$form.find(":input[name='driver']").val(ui.item.name);
		$form.find(":input[name='case4Advice_driverCert']").val(ui.item.cert4FWZG);
		$form.find(":input[name='workDate']").val(ui.item.workDate);
		//组装主题
		var subject = $form.find(":input[name='subject']").val();
		$form.find(":input[name='subject']").val(subject+'('+ui.item.name+')');
		//通过司机ID查找该司机的安全服务信息
		var happenDate = $form.find(":input[name='case4Advice_happenDate']").val();
		var url=bc.root + "/bc-business/caseAdvice/getSecurityServiceInfoByCarManId";
		$.ajax({
			url:url,
			dataType:"json",
			data:{carManId:ui.item.id,happenDate:happenDate},
			success:function(json){
				var count4keguantousu =json.count4keguantousu+1;
				//组装安全服务信息
				var info="该员从"+json.startDate+"起至本次事发日期止一上内发生："+"客管投诉"+count4keguantousu+"宗、总台投诉"
						+json.count4gongsitousu+"宗、交通违法"+json.count4jiaotongweizhang+"宗、营运违法"+json.count4yingyunweizhang
						+"宗、事故理赔"+json.count4shigulipei+"宗";
				$form.find(":input[name='securityServiceInfo']").val(info);
				//alert("count4keguantousu："+json.count4keguantousu+" count4gongsitousu:"+json.count4gongsitousu+" count4jiaotongweizhang:"+json.count4jiaotongweizhang+" count4yingyunweizhang:"+json.count4yingyunweizhang+" count4shigulipei:"+json.count4shigulipei);
			}
		});

			// 记得返回false，否则司机域信息会被清空
		return false;
	}
	
};