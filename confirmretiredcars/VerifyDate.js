bc.namespace("bswf.confirmretiredcars");
bswf.confirmretiredcars.VerifyDateForm = {
	init : function(option,readonly){
		$form = $(this);
		
		$form.find("#cars").delegate(".bswf-confirmretiredcars-executionType","change",function(){
			var $select = $(this);
			var $tr = $(this).closest("tr");
			var $sureReturnDate = $tr.find(":input[name='sureReturnDate']");
			if($select.val() == "fireCarRetiredProcess"){
				$sureReturnDate.attr("data-validate","{'type':'date','required':true}");
			}else{
				$sureReturnDate.removeAttr("data-validate");
				$sureReturnDate.attr("data-validate","{'type':'date'}");
			}
		});
		
	},
	buildFormData : function(){
		$form = $(this);
		var $carTRs = $form.find("#cars tr:gt(0)");
		var cars = [];
		$carTRs.each(function(){
			$tr = $(this);
			var $inputs = $tr.find(":input");
			var car = {
				id: $inputs[0].value,
				plateNo: $inputs[1].value,
				isClaim: $inputs[2].value,
				executionType: $inputs[3].value,
				sureReturnDate: $inputs[4].value
			};
			cars.push(car);
		});
		$form.find(":input[name='list_vd_cars']").val($.toJSON(cars));
		$form.find(":input[name='list_vd_cars_gl']").val($.toJSON(cars));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.confirmretiredcars.VerifyDateForm.buildFormData.call(this);
		
		//验证确认交车日期是否出现早于当前日期情况
		//比较日期方法
		 function duibi(now,predictReturnDate) {
			    var arr = now.split("-");
			    var starttime = new Date(arr[0], arr[1], arr[2]);
			    var nowtimes = starttime.getTime();
	
			    var arrs = predictReturnDate.split("-");
			    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
			    var predictReturnDatetimes = lktime.getTime();
	
			    if (nowtimes > predictReturnDatetimes) {
			        return true;
			    }
			    else
			        return false;
			}
		
		var cars = $form.find(":input[name='list_vd_cars']").val();
		var $cars=eval('('+cars+')');
		
		//系统当前日期
		var now2d=$form.find(":input[name='now2d']").val();
		//标记出现情况的索引字符串
		var indexStr="";
		for(var i=0;i<$cars.length;i++){
			var sureReturnDate=$cars[i].sureReturnDate;
			if(sureReturnDate.length>0&&duibi(now2d,sureReturnDate.length==10?sureReturnDate:sureReturnDate.substring(0,10))){
				var index=i+1;
				if(indexStr.length==0){
					indexStr+=index;
				}else
					indexStr+='、'+index;
			}
		}
		
		if(indexStr.length>0){
			return '第'+indexStr+'条车辆信息的确认交车日期早于当前日期，需要重新编辑信息请点击“否”按钮，不需编辑请点击“是”按钮完成办理此任务。';
		}else{
			return true;
		}
	}
};