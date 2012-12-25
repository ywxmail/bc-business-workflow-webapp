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
					$form.find(":input[name='cert4fwzg']").val(carMan.cert4FWZG);
					$form.find(":input[name='certDrivingFirstDate']").val(carMan.certDriverFirstDate);
					$form.find(":input[name='workDate']").val(carMan.workDate);
					
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
	}
	
};