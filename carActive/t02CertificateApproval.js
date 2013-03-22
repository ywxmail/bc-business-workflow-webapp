bc.namespace("bswf.carActive");
bswf.carActive.t02CertificateApprovalForm = {
		/** 表单验证方法 */
		validateForm: function(){
			$form = $(this);
		
			if(!bc.validator.validate(this))
				return false;
				
			//是否已上传相关证件复印件
			if($form.find("input[type='radio'][name='copies']").size()!=0){
				$rhandings=$form.find("input[type='radio'][name='copies']");
				var checked=false;
				var value;
				$rhandings.each(function(){
					if($(this)[0].checked){
						value=$(this).val();
						checked=true;
					}
				});
				
				if(!checked){
					bc.msg.alert("请上传相关证件复印件！");
					return false;
				}else{
					$form.find(":input[name='copies']").val(value);
				}
		
			}

			//是否已上传证件审验确认书
			if($form.find("input[type='radio'][name='acceptanceCertificate']").size()!=0){
				$rhandings=$form.find("input[type='radio'][name='acceptanceCertificate']");
				var checked=false;
				var value;
				$rhandings.each(function(){
					if($(this)[0].checked){
						value=$(this).val();
						checked=true;
					}
				});
				
				if(!checked){
					bc.msg.alert("请上传证件审验确认书！");
					return false;
				}else{
					$form.find(":input[name='acceptanceCertificate']").val(value);
				}
		
			}
			
			//检查是否添加证件审验确认书
			var $container = $form.closest(".detail");
			var $document = $container.find("div.info.ui-widget-content.attach");
			var documentSize=0;
			$document.each(function(){
				var name=$(this).attr("data-subject").substr(0,7);
				if(name=='证件审验确认书'){
					documentSize=1;
				}
			});
			if(documentSize==0){
				bc.msg.alert("请上传文档名为“证件审验确认书”的文档！");
				return false;
			}

			return true;
		}
		
};