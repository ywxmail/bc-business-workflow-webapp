bc.namespace("bswf.requirement");
bswf.requirement.developmentGroupHandleForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		var $isWorkflowed=$form.find(":input[name='isWorkflowed']");
		if($isWorkflowed != null&&$isWorkflowed.val()=="true"){
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
		
		// 添加协办部门事件绑定
		bswf.requirement.departmentCooperation.init.call(this);
		
		$form.find(":input[name='rsend']").change(function(){
			if($(this).val()=="2"){
				bswf.requirement.departmentCooperation.show_co4department.call($form);
			}else{
				bswf.requirement.departmentCooperation.hide_co4department.call($form);
			}
		});
		
		$form.find(":input[name='risWorkflow']").change(function(){
			switch($(this).val()){
				case "true":
					$form.find(".connetionWorkflow").show();
					$form.find(".connetionWorkflow :input").each(function(){
						if($(this).hasClass("ignore")){
							$(this).removeClass("ignore");
						}
						if($(this).hasClass("bswf-required")){
							$(this).attr("data-validate","required");
						}
					});
					break;
				case "false":
					$form.find(".connetionWorkflow").hide();
					$form.find(".connetionWorkflow :input").each(function(){
						if(!$(this).hasClass("ignore")){
							$(this).addClass("ignore");
						}
						if($(this).hasClass("bswf-required")){
							$(this).removeAttr("data-validate");
						}
					});
					break;
				default : "Other";
			}
		});
	},
	buildFormData : function(){
		var $form = $(this);
		
		// 初始化控制流程走向的变量
		var _isReturn = $form.find(":input[name='_isReturn']").val();
		if(_isReturn=="true"){
			if($form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").removeClass("ignore");
			}
			$form.find(":input[name='isReturn']").val(false);
		}else{
			if(!$form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").addClass("ignore");
			}
		}
		var _isCooperate = $form.find(":input[name='_isCooperate']").val();
		if(_isCooperate=="true"){
			if($form.find(":input[name='isCooperate']").hasClass("ignore")){
				$form.find(":input[name='isCooperate']").removeClass("ignore");
			}
			$form.find(":input[name='isCooperate']").val(false);
		}else{
			if(!$form.find(":input[name='isCooperate']").hasClass("ignore")){
				$form.find(":input[name='isCooperate']").addClass("ignore");
			}
		}
		
		//根据下一步相关操作 修改走向变量的值	
		var rsend=$form.find(":input[name='rsend']:checked").val();
		$form.find(":input[name='send']").val(rsend);
		if(rsend == "6"){//退回
			if($form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").removeClass("ignore");
			}
			$form.find(":input[name='isReturn']").val(true);
		}else if(rsend == "2"){//送相关部门协办
			if(_isCooperate=="true"){
				if(!$form.find(":input[name='isCooperate']").hasClass("ignore")){
					$form.find(":input[name='isCooperate']").addClass("ignore");
				}
			}else{
				if($form.find(":input[name='isCooperate']").hasClass("ignore")){
					$form.find(":input[name='isCooperate']").removeClass("ignore");
				}
				$form.find(":input[name='isCooperate']").val(true);
			}
			// 相关协办部门信息处理
			bswf.requirement.departmentCooperation.buildFormData.call(this);
		}
		
		$form.find(":input[name='moduleCode_lc']").val($form.find(":input[name='moduleCode']").val());
		
		if($form.find(":input[name='risWorkflow']:checked").val()=="true"){
			$form.find(":input[name='isWorkflow']").val(true);
			$form.find(":input[name='isWorkflow_lc']").val(true);
			$form.find(":input[name='procinstName_lc']").val($form.find(":input[name='procinstName']").val());
			$form.find(":input[name='procinstId_lc']").val($form.find(":input[name='procinstId']").val());
			$form.find(":input[name='procinstKey_lc']").val($form.find(":input[name='procinstKey']").val());
			$form.find(":input[name='procinstSubject_lc']").val($form.find(":input[name='procinstSubject']").val());
			$form.find(":input[name='procinstTaskName_lc']").val($form.find(":input[name='procinstTaskName']").val());
			$form.find(":input[name='procinstTaskKey_lc']").val($form.find(":input[name='procinstTaskKey']").val());
			$form.find(":input[name='procinstTaskID_lc']").val($form.find(":input[name='procinstId']").val());
		}else{
			$form.find(":input[name='isWorkflow']").val(false);
			$form.find(":input[name='isWorkflow_lc']").val(false);
		}
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		var $form = $(this);

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
		
		if($form.find(":input[name='risWorkflow']:checked").size() == 0){
			bc.msg.alert("请选择是否关联流程！");
			return false;
		}
		
		
		bswf.requirement.developmentGroupHandleForm.buildFormData.call(this);
		
		return true;
	}
};