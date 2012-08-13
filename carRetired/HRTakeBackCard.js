bc.namespace("bswf.carRetired");
bswf.carRetired.HRTakeBackCardForm = {
	init : function(option,readonly){
		var $form = $(this);
		var driverName=$form.find(":input[name='htcDriverName']").val();
		var driverFWZG=$form.find(":input[name='htcDriverFWZG']").val();
		var driverAndFWZG='';
				
		if(typeof(driverName)!="undefined" && typeof(driverFWZG)!="undefined" && driverName != '' && driverFWZG != ''){
			var dnArr=driverName.split(",");
			var dnFWZG=driverFWZG.split(",");
			if(dnArr.length==dnFWZG.length){
				for(var i=0;i<dnArr.length;i++){
					driverAndFWZG+=dnArr[i]+','+dnFWZG[i]+','+'已回收;'
				}
			}
		}
		
		if(driverAndFWZG!='')
			$form.find(":input[name='htbcDriverAndFWZG']").val(driverAndFWZG);
	},
	buildFormData : function(){
		$form = $(this);
		var isReclaim=$form.find(":input[name='isReclaim']:checked").val();
		$form.find(":input[name='htbcIsReclaim']").val(isReclaim);
	},
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		bswf.carRetired.HRTakeBackCardForm.buildFormData.call(this);
		return true;
	}
};