bc.namespace("bswf.confirmretiredcars");
bswf.confirmretiredcars.GatherCarsForm = {
	init : function(option,readonly){
		//alert("GatherCarsForm.init")
		var $form = $(this);
		
		//加载年和月份
		var d = new Date();
		$form.find(":input[name='jiaocheYear']").val(d.getFullYear());
		$form.find(":input[name='jiaocheMonth']").val(d.getMonth() + 1);
		
		//------------添加行-------------------
		var tableEl=$form.find("#cars")[0];
		$form.find("#addLine").click(function() {
			bs.selectCar({
				status: '0',
				data:{multiple: true,loadLevel:'1'},
				onOk : function(cars) {
					function selectUnit(cell){
						var $cell=$(cell);
						$cell.click(function(){
							bc.identity.selectUnit({
								onOk : function(unit) {
									$cell.find(":input[name='unitCompanyId']").val(unit.id);
									$cell.find(":input[name='unitCompany']").val(unit.name);
								}
							});
						})
					}
					
					//先验证是否添加相同的车辆信息
					var addflag=true;
					if($(tableEl).find("tr").size()>1){
						var $carTRs = $form.find("#cars tr:gt(0)");
						$carTRs.each(function(){
							$tr = $(this);
							var $inputs = $tr.find(":input");
							var trid=$inputs[0].value;
							for(var i=0;i <cars.length;i++){
								if(trid == cars[i].id){
									addflag=false;
									return;
								}
							}
						});
					}
					
					if(!addflag){
						bc.msg.alert("选择的车辆信息与已添加的车辆信息相同！");
						return;
					}
					
					for(var i=0;i <cars.length;i++){
						if($(tableEl).find("tr").size()==1 && $form.find(":input[name='verifyUnitId']").val()==''){
							$form.find(":input[name='verifyUnitId']").val(cars[i].unitCompanyId);
							$form.find(":input[name='verifyUnitName']").val(cars[i].unitCompany);
						}
						
						//插入行
						var newRow=tableEl.insertRow(tableEl.rows.length);
						newRow.setAttribute("class","ui-widget-content row");
						//插入列
						var cell=newRow.insertCell(0);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","id first");
						cell.innerHTML='<span class="ui-icon"></span><input class="ignore" type="hidden" name="id" value="'+cars[i].id+'"/>';//ID列
						
						//插入公司
						cell=newRow.insertCell(1);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input name="unitCompany" class="ignore"  style="border:none;background:none;width:4.9em;padding:0 0 0 2px"'
							+'value="'
							+cars[i].unitCompany+'"'
							+'type="text"  data-validate="required">'
							+'<input type="hidden" name="unitCompanyId" class="ignore" value="'+cars[i].unitCompanyId+'"/>';
						selectUnit(cell);
						
						//插入车号
						cell=newRow.insertCell(2);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input name="plateNo" class="ignore" style="border:none;background:none;width:4.4em;padding:0 0 0 2px"'
							+'value="'+cars[i].plateNo+'"'
							+'type="text" readonly="readonly"  data-validate="required">';
						
						//插入营运性质
						cell=newRow.insertCell(3);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input name="businessType" class="ignore" style="border:none;background:none;width:4.9em;padding:0 0 0 2px;"'
							+'value="'+cars[i].bsType+'"'
							+'type="text"  data-validate="required">';
						
						//插入登记日期
						cell=newRow.insertCell(4);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input type="text"  name="registerDate" data-validate=\'{"type":"date","required":true}\' value="'+cars[i].registerDate+'"'
							+'  style="border:none;background:none;width:6.5em;padding:0 0 0 2px;" class="ignore bc-date ui-widget-content" >';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
						
						//插入合同期限
						var ccEndDate='';
						if(!(cars[i].ccEndDate==null))
							ccEndDate=cars[i].ccEndDate.substring(0,10);
						cell=newRow.insertCell(5);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input type="text" name="ccEndDate" data-validate=\'{"type":"date","required":true}\' value="'+ccEndDate+'"'
							+'  style="border:none;background:none;width:6.5em;padding:0 0 0 2px;" class="ignore bc-date ui-widget-content" >';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
						
						//插入商业结束日期
						var commerialEndDate='';
						if(!(cars[i].commerialEndDate==null))
							commerialEndDate=cars[i].commerialEndDate.substring(0,10);
						cell=newRow.insertCell(6);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input type="text" name="commerialEndDate" data-validate=\'{"type":"date","required":true}\' value="'+commerialEndDate+'"'
							+'  style="border:none;background:none;width:6.5em;padding:0 0 0 2px;" class="ignore bc-date ui-widget-content"  >';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
						
						//插入强险结束日期
						var greenslipEndDate='';
						if(!(cars[i].greenslipEndDate==null))
							greenslipEndDate=cars[i].greenslipEndDate.substring(0,10);
						cell=newRow.insertCell(7);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input type="text" name="greenslipEndDate" data-validate=\'{"type":"date","required":true}\' value="'+greenslipEndDate+'"'
							+'  style="border:none;background:none;width:6.5em;padding:0 0 0 2px;" class="ignore bc-date ui-widget-content" >';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
												
						//插入预计交车日期
						var predictReturnDate='';
						if(!(cars[i].predictReturnDate==null))
							predictReturnDate=cars[i].predictReturnDate.substring(0,10);
						cell=newRow.insertCell(8);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input type="text" name="predictReturnDate" data-validate=\'{"type":"date","required":true}\' value="'+predictReturnDate+'"'
							+'  style="border:none;background:none;width:6.5em;padding:0 0 0 2px;" class="ignore bc-date ui-widget-content"  >';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
						
						//插入空白列
						cell=newRow.insertCell(9);
						cell.style.minWidth="0.01em";
						cell.style.borderLeftWidth="0";
						cell.setAttribute("class","last");
					}		
				}
			});
		});
		//点击选中行
		$form.find("#cars").delegate("tr.ui-widget-content.row>td.id","click",function(){
			$(this).parent().toggleClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").toggleClass("ui-icon-check");
		});
		$form.find("#cars").delegate("tr.ui-widget-content.row input","focus",function(){
			$(this).closest("tr.row").removeClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").removeClass("ui-icon-check");
		});
		//删除表中选中的
		$form.find("#deleteLine").click(function() {
			var $trs = $form.find("#cars tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要删除的车辆信息！");
				return;
			}
			bc.msg.confirm("确定要删除选定的 <b>"+$trs.length+"</b>个车辆明细吗？",function(){
				for(var i=0;i<$trs.length;i++){
					$($trs[i]).remove();
				}
			});
			
		});
		
		//上移表中选中的明细项目
		$form.find("#upLine").click(function() {
			var $trs = $form.find("#cars tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要上移的！");
				return;
			}else{
				$trs.each(function(){
					var $tr = $(this);
					if($tr[0].rowIndex < 2){
						bc.msg.slide("选中的为第一条,不能再上移！");					
					}else{
						var $beroreTr=$tr.prev();
						$beroreTr.insertAfter($tr);
					}
				});
			}

		});
		//下移表中选中的明细项目
		$form.find("#downLine").click(function() {
			var $trs = $form.find("#cars tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要下移的！");
				return;
			}else{
				
				for(var i=$trs.length;i>0;i--){
					var $tr=$($trs[i-1]);
					var $beroreTr=$tr.next();
					if($beroreTr.length==0){
						bc.msg.slide("选中的为一条项目,不能再下移！");					
					}else{
						$beroreTr.insertBefore($tr);
					}
				}
			}
		});
		
		// 选择经办分公司
		$form.find("#selectConfirmor").click(function(){
			bc.identity.selectUnit({
				onOk : function(unit) {
					$form.find(":input[name='verifyUnitId']").val(unit.id);
					$form.find(":input[name='verifyUnitName']").val(unit.name);
				}
			});
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
				unitCompany: $inputs[1].value,
				unitCompanyId: $inputs[2].value,
				plateNo: $inputs[3].value,
				businessType: $inputs[4].value,
				registerDate: $inputs[5].value,
				ccEndDate: $inputs[6].value,
				commerialEndDate: $inputs[7].value,
				greenslipEndDate: $inputs[8].value,
				predictReturnDate: $inputs[9].value
			};
			cars.push(car);
		});
		$form.find(":input[name='list_gc_cars']").val($.toJSON(cars));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		//alert("GatherCars.validateForm");
		if(!bc.validator.validate(this))
			return false;
		
		bswf.confirmretiredcars.GatherCarsForm.buildFormData.call(this);
		var cars = $form.find(":input[name='list_gc_cars']").val();
		if(cars.length < 3){
			bc.msg.alert("请先选择车辆信息！");
			return false;
		}
		
		//验证保存车辆的分公司是否与经办分公司相同
		var verifyUnitId=$form.find(":input[name='verifyUnitId']").val();
		var $cars=eval('('+cars+')');

		for(var i=0;i<$cars.length;i++){
			if(verifyUnitId != $cars[i].unitCompanyId){
				bc.msg.alert("只能确认相同分公司的车辆信息！");
				return false;
			}
		}
	
		return true;
	}
};