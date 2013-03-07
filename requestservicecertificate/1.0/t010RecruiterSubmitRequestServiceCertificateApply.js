bc.namespace("bswf.requestServiceCertificate");
bswf.requestServiceCertificate.recruiterSubmitRequestServiceCertificateApplyForm = {
	init : function(option,readonly){
		var $form = $(this);
		$form.delegate(".bswf-requestServiceCertificate-driverName","click",function(){
			var $a=$(this);
			// 打开查询窗口
			bc.page.newWin({
				mid: "tempDriver." + $(this).attr("data-id"),
				name: $(this).text(),
				url: bc.root + "/bc-business/tempDriver/edit",
				data: {id:$(this).attr("data-id")}
			});
		});
		$form.delegate(".bswf-requestServiceCertificate-processName","click",function(){
			var $tr=$(this).closest("tr");
			var $inputs=$tr.find(":input");
			//打开工作空间
			bc.page.newWin({
				name: "工作空间",
				mid: "workspace."+$(this).attr("data-id"),
				url: bc.root+ "/bc-workflow/workspace/open?id="+$(this).attr("data-id")
			});
		});

		if(readonly)return;
		
		$form.find(":input[name='risPayDeposit']").change(function(){
			if($(this).val()=="true"){
				$form.find(".preNewCarDeposit").css("display","inline-block")
				$form.find(":input[name='preNewCarDeposit']").attr("data-validate",'{"required":true,"type":"number"}');
			}else{
				$form.find(".preNewCarDeposit").hide();
				$form.find(":input[name='preNewCarDeposit']").removeAttr("data-validate"	);
			}
		});
		
		
	},
	
	buildFormData : function(){
		var $form=$(this);
		$form.find(":input[name='isPayDeposit']").val($form.find(":input[name='risPayDeposit']:checked").val());
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		var $form=$(this);
		
		if($form.find(":input[name='risPayDeposit']:checked").size()==0){
			bc.msg.alert("请选择是否收取订金！");
			return false;
		}
		
		bswf.requestServiceCertificate.recruiterSubmitRequestServiceCertificateApplyForm.buildFormData.call(this);
		
		return true;
	}
};