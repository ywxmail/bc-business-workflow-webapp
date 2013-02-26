bc.namespace("bswf.infractBusinessInfo.version2");
bswf.infractBusinessInfo.version2.motorcadeLeaderCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//选择当事司机
		$form.find("#addDriver").click(function() {
			var carId = $form.find(":input[name='carId']").val();
			bs.findInfoByCar({
				carId: carId,
				multiple: true,
				success: function(info){
						if(info.driver.length>0){
						var drivers=info.driver;
						$.each(drivers,function(i,carMan){
							$form.find(":input[name='driverId']").val(carMan.id);
							$form.find(":input[name='driverId_lc']").val(carMan.id);
							
							$form.find(":input[name='driver']").val(carMan.name);
							$form.find(":input[name='driver_lc']").val(carMan.name);
							
							$form.find(":input[name='cert4fwzg']").val(carMan.cert4FWZG);
							$form.find(":input[name='cert4fwzg_lc']").val(carMan.cert4FWZG);
							
							$form.find(":input[name='workDate']").val(carMan.workDate);
							$form.find(":input[name='workDate_lc']").val(carMan.workDate);
							
							//通过司机ID查找该司机的违法信息
							var happenDate = $form.find(":input[name='happenDate']").val();
							var url=bc.root + "/bc-business/caseAdvice/getSecurityServiceInfoByCarManId";
							$.ajax({
								url:url,
								dataType:"json",
								data:{carManId:carMan.id,happenDate:happenDate},
								success:function(json){
									//组装客管投诉信息
									var keguantousuInfo;
									if(json.keguantousuInfo){
										keguantousuInfo="客管投诉"+json.count4keguantousu+"宗"+"(其中"+json.keguantousuInfo+"),连本次客管投诉总计"+parseInt(json.count4keguantousu+1)+"宗";
									}else{
										keguantousuInfo="客管投诉:"+parseInt(json.count4keguantousu+1)+"宗";
									}
									//组装安全服务信息
									var info="该员从"+json.startDate+"起至本次事发日期止一年内发生："+keguantousuInfo+"、总台投诉"
											+json.count4gongsitousu+"宗、交通违法"+json.count4jiaotongweizhang+"宗、营运违法"+json.count4yingyunweizhang
											+"宗、事故理赔"+json.count4shigulipei+"宗";
									$form.find(":input[name='securityServiceInfo']").val(info);
								}
							});

						});
					}
				}
			});			
		});
		
		
	},
	buildFormData : function(){
		var $form = $(this);
		var subject=$form.find(":input[name='subject']").val();
		var driver=$form.find(":input[name='driver_lc']").val();
		
		if(subject.indexOf("(")!=-1){
			subject=subject.substring(0,subject.indexOf("("));
		}
		
		$form.find(":input[name='subject']").val(subject+"("+driver+")");
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		var $form = $(this);
	
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
		
		bswf.infractBusinessInfo.version2.motorcadeLeaderCheckForm.buildFormData.call(this);

		return true;
	},
	/** 选择司机后 */
	afterSelectCarMan: function(event, ui){
		var $form = $(this).closest(".bc-page");
		
		$form.find(":input[name='driver']").val(ui.item.name);
		$form.find(":input[name='driver_lc']").val(ui.item.name);
		
		$form.find(":input[name='driverId']").val(ui.item.id);
		$form.find(":input[name='driverId_lc']").val(ui.item.id);
		
		$form.find(":input[name='cert4fwzg']").val(ui.item.cert4FWZG);
		$form.find(":input[name='cert4fwzg_lc']").val(ui.item.cert4FWZG);
		
		$form.find(":input[name='workDate']").val(ui.item.workDate);
		$form.find(":input[name='workDate_lc']").val(ui.item.workDate);
		//通过司机ID查找该司机的安全服务信息
		var happenDate = $form.find(":input[name='happenDate']").val();
		var url=bc.root + "/bc-business/caseAdvice/getSecurityServiceInfoByCarManId";
		$.ajax({
			url:url,
			dataType:"json",
			data:{carManId:ui.item.id,happenDate:happenDate},
			success:function(json){
				//组装客管投诉信息
				var keguantousuInfo;
				if(json.keguantousuInfo){
					keguantousuInfo="客管投诉"+json.count4keguantousu+"宗"+"(其中"+json.keguantousuInfo+"),连本次客管投诉总计"+parseInt(json.count4keguantousu+1)+"宗";
				}else{
					keguantousuInfo="客管投诉:"+parseInt(json.count4keguantousu+1)+"宗";
				}
				//组装安全服务信息
				var info="该员从"+json.startDate+"起至本次事发日期止一年内发生："+keguantousuInfo+"、总台投诉"
						+json.count4gongsitousu+"宗、交通违法"+json.count4jiaotongweizhang+"宗、营运违法"+json.count4yingyunweizhang
						+"宗、事故理赔"+json.count4shigulipei+"宗";
				$form.find(":input[name='securityServiceInfo']").val(info);
			}
		});

		// 记得返回false，否则司机域信息会被清空
		return false;
	}
	
};