bc.namespace("bswf.infractBusinessInfo");
bswf.infractBusinessInfo.serviceSupervisionTeamSpecifiesCaseBusinessInfoForm = {
		/** 表单验证方法 */
		validateForm: function(){
			$form = $(this);
		
			if(!bc.validator.validate(this))
				return false;
			

		}
};