bc.namespace("bswf.requestServiceCertificate");
bswf.requestServiceCertificate.merchandiserCertificateForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		
		$form.find(".cert4table").delegate(".result","change",function(){
			var $tr=$(this).closest("tr");
			var $required=$tr.find(".bswf-required");
			var $loss4cause=$form.find(".loss4cause");
			switch($(this).val()){
				case "1":
					$required.attr("data-validate","required");
					break;
				case "2":
					$required.removeAttr("data-validate");
					$loss4cause.show();
					$loss4cause.find(":input[name='loss4cause']").attr("data-validate","required");
					$loss4cause.find(":input[name='loss4cause']").removeClass("ignore");
					break;
				default:"other!";
			}
			
			var $sucesses=$form.find(".cert4table .result");
			var flag=true;
			$sucesses.each(function(){
				if($(this).val()!="1"){
					flag=false;
				}
			});
			
			if(flag){
				$loss4cause.hide();
				$loss4cause.find(":input[name='loss4cause']").removeAttr("data-validate");
				$loss4cause.find(":input[name='loss4cause']").addClass("ignore");
			}
			
		});
	},
	
	buildFormData : function(){
		var $form=$(this);
		var $trs=$form.find(".cert4table .row");
		var drivers=[];
		$trs.each(function(i){
			var $inputs=$(this).find(":input");
			drivers.push({
				driverId:$(this).attr("data-id"),
				result:$inputs[0].value,
				certFWZG:$inputs[1].value
			});
		});
		
		$form.find(":input[name='list_result']").val($.toJSON(drivers));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;

		bswf.requestServiceCertificate.merchandiserCertificateForm.buildFormData.call(this);
		
		return true;
	}
};