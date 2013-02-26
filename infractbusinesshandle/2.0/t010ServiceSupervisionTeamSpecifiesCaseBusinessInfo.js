bc.namespace("bswf.infractBusinessInfo.version2");
bswf.infractBusinessInfo.version2.serviceSupervisionTeamSpecifiesCaseBusinessInfoForm = {
		/** 表单验证方法 */
		validateForm: function(){
			$form = $(this);
		
			if(!bc.validator.validate(this))
				return false;
			

		}
};