bc.namespace("bswf.generalOrder");
bswf.generalOrder.OperationSecurityCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//绑定下一步的处理方式事件
		$form.find(":input[name='osc_handing']").change(function(){
			switch($(this).val()){
				case "送部门经理落实执行" :
					handing_hide($form.find("#inCharDeputyGeneralManagerCheck"));
					$form.find(":input[name='is_umi_flow']").val(true);
					 break;
				case "送分管副总审批":
					handing_show($form.find("#inCharDeputyGeneralManagerCheck"));
						$form.find(":input[name='is_umi_flow']").val(false);
					 break;
				default: alert("other");
			}
		});
		
		//下一步处理方式自定义显示函数
		function handing_show($div){
			$div.show();
			$inputs=$div.find(":input");
			$inputs.each(function(){
				if($(this).hasClass("ignore")){
					$(this).removeClass("ignore");
				}
			});
		}
		//下一步处理方式自定义隐藏函数
		function handing_hide($div){
			$div.hide();
			
			$inputs=$div.find(":input");
			$inputs.each(function(){
				if(!$(this).hasClass("ignore")){
					$(this).addClass("ignore");
				}
			});
		}
		
		//绑定添加分管副总事件	
		$form.find("#selectInChargeDeputyGeneralManager").click(function(){
			bc.identity.selectUser({
				onOk : function(user) {
					$form.find(":input[name='inChargeDeputyGeneralManagerName']").val(user.name);
					$form.find(":input[name='inChargeDeputyGeneralManager']").val(user.account);
				}
			});
		});
	},
	buildFormData : function(){
		$form = $(this);
		var $applyMattersTRs = $form.find("#applyMatters tr:gt(0)");
		var applyMatters = [];
		$applyMattersTRs.each(function(){
			$tr = $(this);
			var $inputs = $tr.find(":input");
			var $tds=$tr.find("td");
			var applyMatter = {
				id: $($tds[0]).text(),
				matter: $inputs[0].value,
				check: $inputs[1].value
			};
			applyMatters.push(applyMatter);
		});
		
		$form.find(":input[name='list_osc_applyMatters']").val($.toJSON(applyMatters));
		
		var osc_handing=$form.find(":input[name='osc_handing']:checked").val();
		$form.find(":input[name='oscHanding']").val(osc_handing);
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.generalOrder.OperationSecurityCheckForm.buildFormData.call(this);
		
		return true;
	}
};