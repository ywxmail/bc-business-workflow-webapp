bc.namespace("bswf.carTrafficHandle");
bswf.carTrafficHandle.trackingProcessingForm = {
		/** 表单验证方法 */
		validateForm: function(){
			$form = $(this);
		
			if(!bc.validator.validate(this))
				return false;
			//将调查情况，处理情况，回复投诉人情况设置为全局变量
			$form.find(":input[name='complaintInvestigationSituation']").val($form.find(":input[name='complaintInvestigationSituation_lc']").val());
			$form.find(":input[name='complaintHandling']").val($form.find(":input[name='complaintHandling_lc']").val());
			$form.find(":input[name='replyComplainantSituation']").val($form.find(":input[name='replyComplainantSituation_lc']").val());

		}
};