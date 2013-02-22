bc.namespace("bswf.requirement");
bswf.requirement.managerCheckForm = {
	init : function(option,readonly){
		var $form = $(this);

		// 添加协办部门事件绑定
		bswf.requirement.departmentCooperation.init.call(this);
		
		$form.find(":input[name='rsend']").change(function(){
			if($(this).val()=="2"){
				bswf.requirement.departmentCooperation.show_co4department.call($form);
			}else{
				bswf.requirement.departmentCooperation.hide_co4department.call($form);
			}
		});
	},
	buildFormData : function(){
		var $form = $(this);
		
		// 初始化控制流程走向的变量
		var _isReturn = $form.find(":input[name='_isReturn']").val();
		if(_isReturn=="true"){
			if($form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").removeClass("ignore");
			}
			$form.find(":input[name='isReturn']").val(false);
		}else{
			if(!$form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").addClass("ignore");
			}
		}
		var _isCooperate = $form.find(":input[name='_isCooperate']").val();
		if(_isCooperate=="true"){
			if($form.find(":input[name='isCooperate']").hasClass("ignore")){
				$form.find(":input[name='isCooperate']").removeClass("ignore");
			}
			$form.find(":input[name='isCooperate']").val(false);
		}else{
			if(!$form.find(":input[name='isCooperate']").hasClass("ignore")){
				$form.find(":input[name='isCooperate']").addClass("ignore");
			}
		}
		
		//根据下一步相关操作 修改走向变量的值		
		var rsend=$form.find(":input[name='rsend']:checked").val();
		$form.find(":input[name='send']").val(rsend);
		if(rsend == "6"){//退回
			if($form.find(":input[name='isReturn']").hasClass("ignore")){
				$form.find(":input[name='isReturn']").removeClass("ignore");
			}
			$form.find(":input[name='isReturn']").val(true);
			
			// 退回邮件通知详细信息设置
			if($form.find(":input[name='returnView']").hasClass("ignore")){
				$form.find(":input[name='returnView']").removeClass("ignore");
			}
			$form.find(":input[name='returnView']").val($form.find(":input[name='view']").val());
		}else if(rsend == "2"){//送相关部门协办
			if(_isCooperate=="true"){
				if(!$form.find(":input[name='isCooperate']").hasClass("ignore")){
					$form.find(":input[name='isCooperate']").addClass("ignore");
				}
			}else{
				if($form.find(":input[name='isCooperate']").hasClass("ignore")){
					$form.find(":input[name='isCooperate']").removeClass("ignore");
				}
				$form.find(":input[name='isCooperate']").val(true);
			}
			// 相关协办部门信息处理
			bswf.requirement.departmentCooperation.buildFormData.call(this);
		}
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		var $form = $(this);

		var rsend=$form.find(":input[name='rsend']:checked").val();
		if(rsend != null){
			if(rsend=="2"){
				if(!bswf.requirement.departmentCooperation.validateForm.call(this)){
					return false;
				}
			}
		}else{
			bc.msg.alert("请确认下一步相关操作！");
			return false;
		}
		
		bswf.requirement.managerCheckForm.buildFormData.call(this);
		
		return true;
	}
};