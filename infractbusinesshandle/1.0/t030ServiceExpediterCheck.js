bc.namespace("bswf.infractBusinessInfo");
bswf.infractBusinessInfo.serviceExpediterCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
			
	},
	buildFormData : function(){
		var $form = $(this);
		var check=$form.find(":input[name='risReturn']:checked").val();
		$form.find(":input[name='isReturn']").val(check);
		$form.find(":input[name='isReturn_lc']").val(check);		
		
		if(check=="true"){
			$form.find(":input[name='completeTaskCodition']").val("t020MotorcadeLeaderCheck_s");
		}else{
			$form.find(":input[name='completeTaskCodition']").val("t040UnitManagerConfirm_s");
		}
	},	
	/** 表单验证方法 */
	validateForm: function($form,namespace,procinstId,taskId,callback){
		//先必填验证
		if(bc.validator.validate($form)){
			//选项验证
			if($form.find(":input[name='risReturn']:checked").size()>0){
				bc.flow.findGlobalValus({
					id:procinstId,
					globalKeys:"completeTaskCodition",
					onReturn:function(json){
						var task_code=$form.find(":input[name='task_code']").val();
						var completeTaskCodition_temp=$form.find(":input[name='completeTaskCodition_temp']").val();
						//具备完成此任务的条件
						if(task_code==completeTaskCodition_temp&&json.completeTaskCodition==task_code){
							bswf.infractBusinessInfo.serviceExpediterCheckForm.buildFormData.call($form);
							callback.call($form,true);
						}else if(task_code!=completeTaskCodition_temp&&json.completeTaskCodition==task_code){	
							bc.msg.confirm("车队长已完成核查处理任务，但当前流程窗口未显示最新信息，是否需要重新打开当前流程窗口？"
								,function(){
									// 关闭当前窗口
									var $todo = $form.closest(".todo");
									var $page = $todo.closest(".bc-page");
									$page.data("data-status", true);
									$page.dialog("close");
									
									// 打开工作空间
									bc.flow.openWorkspace({id:procinstId,name:"工作空间"});
								},function(){
									
								},"重新打开当前窗口确认"
							);
						}else{
							bc.msg.alert("车队长还没完成核查处理任务，不能完成此任务！");
						}
					}
				});
			}else{
				bc.msg.alert("请确认下一步相关操作！");
			}
			
		}
	
	}
	
};