bc.namespace("bswf.requirement");
bswf.requirement.applyMatterForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		var $isWorkflow_lc=$form.find(":input[name='isWorkflow_lc']");
		
		if($isWorkflow_lc != null){
			var procinstId=$form.find(".procinstId_lc").val();
			$form.find("#process").click(function(){
				bc.page.newWin({
					url: bc.root+"/bc-workflow/workspace/open?id=" + procinstId,
					name:"工作空间",
					mid: "workspace::" + procinstId
				});
			});
		}
		
		if(readonly)return;
		
		
		//非部门经理
		if($form.find(":input[name='isManager']").val()=="false")return;

		// 添加协办部门事件绑定
		bswf.requirement.departmentCooperation.init.call(this);
		
		$form.find(":input[name='rsend']").change(function(){
			if($(this).val()=="2"){
				bswf.requirement.departmentCooperation.show_co4department.call($form);
			}else{
				bswf.requirement.departmentCooperation.hide_co4department.call($form);
			}
		});
	},
	buildFormData : function(){
		var $form = $(this);
		
		// 获取已退回的控制值
		var returned=$form.find(":input[name='returned']").val();
		var isManager=$form.find(":input[name='isManager']").val();
		
		//未有回退时
		if(returned=="false"){
			// 初始化控制流程走向的变量
			$form.find(":input[name='isCancel']").val(false);
			$form.find(":input[name='isReturn']").val(false);
			$form.find(":input[name='isCooperate']").val(false);

			if(isManager == "true"){
				//根据下一步相关操作 修改走向变量的值
				var rsend=$form.find(":input[name='rsend']:checked").val();
				
				if(rsend=="1"){
					$form.find(":input[name='isCancel']").val(true);
				}else if(rsend=="2"){
					$form.find(":input[name='isCooperate']").val(true);
				}
				
				$form.find(":input[name='send']").val(rsend);
			}
			
		}else{
			// 初始化控制流程走向的变量
			$form.find(":input[name='isReturn']").val(false);
			if(!$form.find(":input[name='isCancel']").hasClass("ignore"))
				$form.find(":input[name='isCancel']").addClass("ignore");
			if(!$form.find(":input[name='isCooperate']").hasClass("ignore"))
				$form.find(":input[name='isCooperate']").addClass("ignore");
			
			//根据下一步相关操作 修改走向变量的值
			var rsend=$form.find(":input[name='rsend']:checked").val();
			if(rsend=="1"){
				if($form.find(":input[name='isCancel']").hasClass("ignore")){
					$form.find(":input[name='isCancel']").removeClass("ignore");
				}
				$form.find(":input[name='isCancel']").val(true);
			}else if(rsend=="2"){
				if($form.find(":input[name='isCooperate']").hasClass("ignore")){
					$form.find(":input[name='isCooperate']").removeClass("ignore");
				}
				$form.find(":input[name='isCooperate']").val(true);
			}
			
			$form.find(":input[name='send']").val(rsend);
		}
		
		
		// 协办部门信息的处理
		if(isManager=="true"
			&&$form.find(":input[name='rsend']:checked").val()=="2"){
			bswf.requirement.departmentCooperation.buildFormData.call(this);
		}
		
		
		//主题和申请事由本地变量的设置
		$form.find(":input[name='subject_lc']").val($form.find(":input[name='subject']").val());
		$form.find(":input[name='applyMatterDesc_lc']").val($form.find(":input[name='applyMatterDesc']").val());
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		var $form = $(this);
		
		// 获取已退回的控制值
		var returned=$form.find(":input[name='returned']").val();
		var isManager=$form.find(":input[name='isManager']").val();
		
		//情况1：刚发起流程部门经理有下一步相关操作，情况2：已退回的都有下一步相关操作
		if((returned=="false" && isManager == "true")||returned=="true"){
			var rsend=$form.find(":input[name='rsend']:checked").val();
			if(rsend != null){
				if(rsend=="2"){
					if(!bswf.requirement.departmentCooperation.validateForm.call(this)){
						return false;
					}
				}
			}else{
				bc.msg.alert("请确认下一步相关操作！");
				return false;
			}
		}
	
		
		bswf.requirement.applyMatterForm.buildFormData.call(this);
		
		return true;
	}
};