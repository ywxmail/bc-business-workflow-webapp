bc.namespace("bswf.companyComplainHandle");
bswf.companyComplainHandle.handleCaseAdviceInfoForm = {
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
							$form.find(":input[name='workDate']").val(carMan.workDate);
							$form.find(":input[name='driverId_lc']").val(carMan.id);
							$form.find(":input[name='driver_lc']").val(carMan.name);
							$form.find(":input[name='cert4fwzg_lc']").val(carMan.cert4FWZG);
							$form.find(":input[name='workDate_lc']").val(carMan.workDate);
							//组装主题
							var subject = $form.find(":input[name='subject']").val();
							//判断组装的标题是否已经存在司机姓名，如果存在就去掉
							if(subject.lastIndexOf(")")!=-1){
								subject=subject.substring(0,subject.indexOf("("));
							}
							$form.find(":input[name='subject']").val(subject+'('+carMan.name+')');
							//通过司机ID查找该司机的违法信息
							var happenDate = $form.find(":input[name='case4Advice_happenDate']").val();
							var url=bc.root + "/bc-business/caseAdvice/getSecurityServiceInfoByCarManId";
							$.ajax({
								url:url,
								dataType:"json",
								data:{carManId:carMan.id,happenDate:happenDate},
								success:function(json){
									var keguantousuInfo;//组装客管投诉信息
									var gongsitousuInfo;//组装自接投诉信息
									if(json.keguantousuInfo){
										keguantousuInfo="客管投诉"+json.count4keguantousu+"宗"+"(其中"+json.keguantousuInfo+")";
									}else{
										keguantousuInfo="客管投诉:"+json.count4keguantousu+"宗";
									}
									
									if(json.gongsitousuInfo){
										gongsitousuInfo="自接投诉"+json.count4gongsitousu+"宗"+"(其中"+json.gongsitousuInfo+"),连本次自接投诉总计"+parseInt(json.count4gongsitousu+1)+"宗";
									}else{
										gongsitousuInfo="自接投诉:"+parseInt(json.count4gongsitousu+1)+"宗";
									}
									
									//组装安全服务信息
									var info="该员从"+json.startDate+"起至本次事发日期止一年内发生："+keguantousuInfo+"、"
											+gongsitousuInfo+"、交通违法"+json.count4jiaotongweizhang+"宗、营运违法"+json.count4yingyunweizhang
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
		$form.find(":input[name='driverId']").val(ui.item.id);
		$form.find(":input[name='cert4fwzg']").val(ui.item.cert4FWZG);
		$form.find(":input[name='workDate']").val(ui.item.workDate);
		$form.find(":input[name='driverId_lc']").val(ui.item.id);
		$form.find(":input[name='driver_lc']").val(ui.item.name);
		$form.find(":input[name='cert4fwzg_lc']").val(ui.item.cert4FWZG);
		$form.find(":input[name='workDate_lc']").val(ui.item.workDate);
		//组装主题
		var subject = $form.find(":input[name='subject']").val();
		//判断组装的标题是否已经存在司机姓名，如果存在就去掉
		if(subject.lastIndexOf(")")!=-1){
			subject=subject.substring(0,subject.indexOf("("));
		}
		$form.find(":input[name='subject']").val(subject+'('+ui.item.name+')');
		//通过司机ID查找该司机的安全服务信息
		var happenDate = $form.find(":input[name='case4Advice_happenDate']").val();
		var url=bc.root + "/bc-business/caseAdvice/getSecurityServiceInfoByCarManId";
		$.ajax({
			url:url,
			dataType:"json",
			data:{carManId:ui.item.id,happenDate:happenDate},
			success:function(json){
				var keguantousuInfo;//组装客管投诉信息
				var gongsitousuInfo;//组装自接投诉信息
				if(json.keguantousuInfo){
					keguantousuInfo="客管投诉"+json.count4keguantousu+"宗"+"(其中"+json.keguantousuInfo+")";
				}else{
					keguantousuInfo="客管投诉:"+json.count4keguantousu+"宗";
				}
				
				if(json.gongsitousuInfo){
					gongsitousuInfo="自接投诉"+json.count4gongsitousu+"宗"+"(其中"+json.gongsitousuInfo+"),连本次自接投诉总计"+parseInt(json.count4gongsitousu+1)+"宗";
				}else{
					gongsitousuInfo="自接投诉:"+parseInt(json.count4gongsitousu+1)+"宗";
				}
				
				//组装安全服务信息
				var info="该员从"+json.startDate+"起至本次事发日期止一年内发生："+keguantousuInfo+"、"
						+gongsitousuInfo+"、交通违法"+json.count4jiaotongweizhang+"宗、营运违法"+json.count4yingyunweizhang
						+"宗、事故理赔"+json.count4shigulipei+"宗";
				$form.find(":input[name='securityServiceInfo']").val(info);
				//alert("count4keguantousu："+json.count4keguantousu+" count4gongsitousu:"+json.count4gongsitousu+" count4jiaotongweizhang:"+json.count4jiaotongweizhang+" count4yingyunweizhang:"+json.count4yingyunweizhang+" count4shigulipei:"+json.count4shigulipei)
			}
		});

			// 记得返回false，否则司机域信息会被清空
		return false;
	}
	
};