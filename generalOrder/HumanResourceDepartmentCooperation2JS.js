bc.namespace("bswf.generalOrder");
bswf.generalOrder.HumanResourceDepartmentCooperationForm = {
	init : function(option,readonly){
		var $form = $(this);
		
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
				view: $inputs[1].value
			};
			applyMatters.push(applyMatter);
		});
		
		$form.find(":input[name='list_hrdc_applyMatters']").val($.toJSON(applyMatters));
		$form.find(":input[name='list_hrdc_applyMatters2local']").val($.toJSON(applyMatters));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.generalOrder.HumanResourceDepartmentCooperationForm.buildFormData.call(this);
		
		return true;
	}
};