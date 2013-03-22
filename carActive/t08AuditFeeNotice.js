bc.namespace("bswf.carActive");
bswf.carActive.t08AuditFeeNoticeForm = {
		init : function(option,readonly){
			var $form = $(this);
			var $container = $form.closest(".detail");
			//获取收费通知
			$form.find("#addFeeNotice").click(function(){
				//任务id
				var taskId = $form.closest(".info.ui-widget-content.form").attr("data-id");
				//流程id
				var procInstId = $form.parents().find("#wsForm").find(":input[name='id']").val();
				//车辆id 
				var carId = $form.find(":input[name='carId']").val();
				//后台复制收费通知[经济合同]
				bc.ajax({
					url: bc.root + "/bc-business/contract4Charger/copyFeeNotice",
					dataType: "json",
					data: {taskId: taskId,procInstId: procInstId,carId: carId},
					success: function(json){
						//完成后提示用户
						if(json.success){
						
							//生成附件
							bc.msg.slide(json.msg);
							//生成上下文为附件列表容器对象
							var simpleLine = bc.flow.workspace.TPL.LINE.format("attach","ui-icon-link","link",json.subject, bc.flow.workspace.TPL.ATTACH_BUTTONS);
							var detailLine = bc.flow.workspace.TPL.TEXT_LINE.format("low little",json.author + " " + json.fileDate);
							var info = bc.flow.workspace.TPL.INFO.format(json.id,json.subject,json.size,json.path,simpleLine,detailLine,"","attach");
					
							//插入附件
							$container.children(".comment,.normalFirst").filter(":first").before(info);
							
							}else{
								bc.msg.alert(json.msg);
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
		
		//检查是否添加收费通知
		var $container = $form.closest(".detail");
		var $document = $container.find("div.info.ui-widget-content.attach");
		var documentSize=0;
		$document.each(function(){
			var name=$(this).attr("data-subject").substr(0,4);
			if(name=='收费通知'){
				documentSize=1;
			}
		});
		if(documentSize==0){
			bc.msg.alert("请上传文档名为“收费通知”的文档！");
			return false;
		}

		
		return true;
	}
	
};