bc.namespace("bswf.carRetired");
bswf.carRetired.TechnicalGroupCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		$form.find(":input[name='isTouchMedia']").click(function(){
			if($form.find(":input[name='isTouchMedia']")[0].checked){
				$form.find(":input[name='isCityTV']")[0].checked=false;
			}
		});
		
		$form.find(":input[name='isCityTV']").click(function(){
			if($form.find(":input[name='isCityTV']")[0].checked){
				$form.find(":input[name='isTouchMedia']")[0].checked=false;
			}
		});
		
		$form.find(":input[name='isYCT213']").click(function(){
			if($form.find(":input[name='isYCT213']")[0].checked){
				$form.find(":input[name='isYCT216']")[0].checked=false;
			}
		});
		
		$form.find(":input[name='isYCT216']").click(function(){
			if($form.find(":input[name='isYCT216']")[0].checked){
				$form.find(":input[name='isYCT213']")[0].checked=false;
			}
		});
		
		
	},
	buildFormData : function(){
		$form = $(this);
		var isComplete=$form.find(":input[name='isComplete']:checked").val();
		$form.find(":input[name='tgcIsComplete']").val(isComplete);
		
		
		var length=$form.find(":input[name='isTouchMedia']:checked").length;
		$form.find(":input[name='tgcIsTouchMedia']").val(length>0?'true':'false');
		
		length=$form.find(":input[name='isCityTV']:checked").length;
		$form.find(":input[name='tgcIsCityTV']").val(length>0?'true':'false'); 
		
		length=$form.find(":input[name='isYCT213']:checked").length;
		$form.find(":input[name='tgcIsYCT213']").val(length>0?'true':'false');
		
		length=$form.find(":input[name='isYCT216']:checked").length;
		$form.find(":input[name='tgcIsYCT216']").val(length>0?'true':'false');

	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.TechnicalGroupCheckForm.buildFormData.call(this);
		return true;
	}
};