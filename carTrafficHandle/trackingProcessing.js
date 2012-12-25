bc.namespace("bswf.carTrafficHandle");
bswf.carTrafficHandle.trackingProcessingForm = {
		/** 表单验证方法 */
		validateForm: function(){
			$form = $(this);
		
			if(!bc.validator.validate(this))
				return false;
				
			//违法缴款凭证
			if($form.find("input[type='radio'][name='paymentVouchers']").size()!=0){
				$rhandings=$form.find("input[type='radio'][name='paymentVouchers']");
				var checked=false;
				var value;
				$rhandings.each(function(){
					if($(this)[0].checked){
						value=$(this).val();
						checked=true;
					}
				});
				
				if(!checked){
					bc.msg.alert("请确认驾驶员违法缴款凭证信息！");
					return false;
				}else{
					$form.find(":input[name='paymentVouchers']").val(value);
				}
		
			}

			//确认驾驶员已写违法承诺书
			if($form.find("input[type='radio'][name='letterOfCommitment']").size()!=0){
				$rhandings=$form.find("input[type='radio'][name='letterOfCommitment']");
				var checked=false;
				var value;
				$rhandings.each(function(){
					if($(this)[0].checked){
						value=$(this).val();
						checked=true;
					}
				});
				
				if(!checked){
					bc.msg.alert("请确认驾驶员的违法承诺书信息！");
					return false;
				}else{
					$form.find(":input[name='letterOfCommitment']").val(value);
				}
		
			}

			//驾驶员能否提供有效分值证明
			if($form.find("input[type='radio'][name='scoreProof']").size()!=0){
				$rhandings=$form.find("input[type='radio'][name='scoreProof']");
				var checked=false;
				var value;
				$rhandings.each(function(){
					if($(this)[0].checked){
						value=$(this).val();
						checked=true;
					}
				});
				if(!checked){
					bc.msg.alert("请确认驾驶员是否提供有效分值证明信息！");
					return false;
				}else{
					$form.find(":input[name='scoreProof']").val(value);
				}
		
			}

			return true;
		}
		
};