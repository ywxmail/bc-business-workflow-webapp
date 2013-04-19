bc.namespace("bswf.requestServiceCertificate");
bswf.requestServiceCertificate.recruiterConfirmCertificateSituationForm = {
	adding : false,
	init : function(option,readonly){
		var $form = $(this);
		
		//绑定添加免摇珠申请书事件
		$form.find(".situation4table").delegate(".bswf-addAttach-fwzg-myzsq","click",function(){
			if(bswf.requestServiceCertificate.recruiterConfirmCertificateSituationForm.adding)
				return;
			var $tr=$(this).closest("tr");
			var id=$tr.attr("data-id");
			var applyAttrType=$tr.attr("data-applyAttrType");//1：新考，2：外司加入，3：留用，4：其它
			var pid=$form.find(":input[name='pid']").val();
			var tid=$form.find(":input[name='tid']").val();
			var company=$form.find(":input[name='company']").val();
			var templateCode="";
			if(company=="1"){
				templateCode="BC-TEMPDRIVER-FWZG-MYZSQ-BAOCHENG";
			}else{
				templateCode="BC-TEMPDRIVER-FWZG-MYZSQ-GUANGFA";
			}
			
			//待办任务容器
			var $container=$form.closest(".detail");
			bc.ajax({
				url:bc.root+"/bc-business/tempDriver/addWorkflowAttachFromTemplate",
				data:{driverId:id,procinstId:pid,procinstTaskId:tid,templateCode:templateCode},
				dataType:"json",
				success:function(json){
					bswf.requestServiceCertificate.recruiterConfirmCertificateSituationForm.adding=false;
					bc.msg.slide(json.msg);
					var simpleLine = bc.flow.workspace.TPL.LINE.format("attach","ui-icon-link","link",json.subject, bc.flow.workspace.TPL.ATTACH_BUTTONS);
					var detailLine = bc.flow.workspace.TPL.TEXT_LINE.format("low little",json.author + " " + json.fileDate);
					var info = bc.flow.workspace.TPL.INFO.format(json.id,json.subject,json.size,json.path,simpleLine,detailLine,"","attach");
					$container.children(".comment,.normalFirst").filter(":first").before(info);
				}
			});
		});
		
		//绑定添加服务资格证申领表事件
		$form.find(".situation4table").delegate(".bswf-addAttach-fwzg-apply","click",function(){
			if(bswf.requestServiceCertificate.recruiterConfirmCertificateSituationForm.adding)
				return;
			var $tr=$(this).closest("tr");
			var id=$tr.attr("data-id");
			var applyAttrType=$tr.attr("data-applyAttrType");//1：新考，2：外司加入，3：留用，4：其它
			var pid=$form.find(":input[name='pid']").val();
			var tid=$form.find(":input[name='tid']").val();
			var company=$form.find(":input[name='company']").val();
			var templateCode="";
			if(applyAttrType=="1"){//根据司机的申请属性加载申请书
				templateCode="BC-TEMPDRIVER-FWZG-APPLY-XL";
			}else if(applyAttrType=="2"||applyAttrType=="3"){
				templateCode="BC-TEMPDRIVER-FWZG-APPLY-BG";
			}else{
				templateCode="BC-TEMPDRIVER-FWZG-APPLY";
			}
			//待办任务容器
			var $container=$form.closest(".detail");
			bc.ajax({
				url:bc.root+"/bc-business/tempDriver/addWorkflowAttachFromTemplate",
				data:{driverId:id,procinstId:pid,procinstTaskId:tid,templateCode:templateCode},
				dataType:"json",
				success:function(json){
					bswf.requestServiceCertificate.recruiterConfirmCertificateSituationForm.adding=false;
					bc.msg.slide(json.msg);
					var simpleLine = bc.flow.workspace.TPL.LINE.format("attach","ui-icon-link","link",json.subject, bc.flow.workspace.TPL.ATTACH_BUTTONS);
					var detailLine = bc.flow.workspace.TPL.TEXT_LINE.format("low little",json.author + " " + json.fileDate);
					var info = bc.flow.workspace.TPL.INFO.format(json.id,json.subject,json.size,json.path,simpleLine,detailLine,"","attach");
					$container.children(".comment,.normalFirst").filter(":first").before(info);
				}
			});
		});
		
		//绑定已采用办证方式事件
		$form.find(":input[name='certificateMode']").change(function(){
			var $spans=$form.find(".situation4table .bswf-addAttach-fwzg-myzsq")
			if($(this).val()=="2"){
				$spans.each(function(){$(this).text("点击添加免摇珠申请书")});
			}else{
				$spans.each(function(){$(this).text("")});
			}
		});
		
		//绑定司机是否放弃办证事件
		$form.find(":input[name='risGiveUp']").change(function(){
			switch($(this).val()){
				case "true":
					_show($form.find(".giveUp4cause"));
					_hidde($form.find(".situation"));
					break;
				case "false":
					_show($form.find(".situation"));
					_hidde($form.find(".giveUp4cause"));
					break;
				default: alert("other");
			}
		});
		
		function _hidde($div){
			$div.hide();
			var $inputs=$div.find(":input");
			$inputs.each(function(){
				$(this).val("");
				$(this).addClass("ignore");
			});
			var $requireds=$div.find(".bswf-required");
			$requireds.each(function(){
				$(this).removeAttr("data-validate");
			});
		}
		
		function _show($div){
			$div.show();
			var $inputs=$div.find(":input");
			$inputs.each(function(){
				$(this).removeClass("ignore");
			});
			var $requireds=$div.find(".bswf-required");
			$requireds.each(function(){
				$(this).attr("data-validate","required");
			});
		}
	},
	
	buildFormData : function(){
		var $form=$(this);
		var risGiveUp=$form.find(":input[name='risGiveUp']:checked").val();
		$form.find(":input[name='isGiveUp']").val(risGiveUp);
		$form.find(":input[name='isGiveUp_lc']").val(risGiveUp);
		
		if(risGiveUp=="true"){
			$form.find(":input[name='giveUp4cause_lc']").val($form.find(":input[name='giveUp4cause']").val());
		}else{
			$form.find(":input[name='certificateMode_lc']").val($form.find(":input[name='certificateMode']").val());
			
			var $trs=$form.find(".situation4table .row");
			var drivers=[];
			$trs.each(function(i){
				var $inputs=$(this).find(":input");
				drivers.push({
					driverId:$(this).attr("data-id"),
					status:$inputs[0].value
				});
			});
			
			$form.find(":input[name='list_situation']").val($.toJSON(drivers));
			$form.find(":input[name='list_situation_lc']").val($.toJSON(drivers));
		}
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		var $form = $(this);
		if($form.find(":input[name='risGiveUp']:checked").size()==0){
			bc.msg.alert("请选择下一步相关操作！");
			return false;
		}
		
		bswf.requestServiceCertificate.recruiterConfirmCertificateSituationForm.buildFormData.call(this);
		
		return true;
	}
};