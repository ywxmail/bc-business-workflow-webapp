bc.namespace("bswf.confirmretiredcars");
bswf.confirmretiredcars.fallbackForm = {
	init : function(option,readonly){
			
	},
	/** 表单验证方法 */
	validateForm: function(){
		//alert("GatherCars.validateForm");
		if(!bc.validator.validate(this))
			return false;
		
		$form = $(this);
		
		if($form.find(":input:checked").size()==0){
			$form.find(":input[name='fallback']").val(false);
		}else
			$form.find(":input[name='fallback']").val(true);
		return true;
	}
};