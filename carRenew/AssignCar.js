bc.namespace("bswf.carRenew");
bswf.carRenew.AssignCarForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//绑定投保人输入离开焦点事件
		$form.find(":input[name='policyHolder']").blur(function() {
			$form.find(":input[name='policyHolder_gl']").val($(this).val());
		});
		
//		$.ajax({
//			url:bc.root +"/bc/selectOptionGroupByKey",
//			dataType:"json",
//			data:{key:"CA_COMPANY"},
//			success: function(optionList){
//				logger.info("drivers=" + $.toJSON(optionList));
//			}
//		});
		
		//绑定选择车辆事件
		$form.find("#addCar").click(function() {
			bs.selectCar({
				status: '0',
				data:{multiple: false,loadLevel:'1'},
				onOk : function(car) {
					$form.find(":input[name='carId']").val(car.id);
					$form.find(":input[name='carId_gl']").val(car.id);
					$form.find(":input[name='plate']").val(car.plate);
					$form.find(":input[name='plate_gl']").val(car.plate);
					$form.find(":input[name='plateNo']").val(car.plateNo);
					$form.find(":input[name='plateNo_gl']").val(car.plateNo);
					$form.find(":input[name='plateType']").val(car.plateType);
					$form.find(":input[name='plateType_gl']").val(car.plateType);
					$form.find(":input[name='unitCompany']").val(car.unitCompany);
					$form.find(":input[name='unitCompany_gl']").val(car.unitCompany);
					$form.find(":input[name='verifyUnitId']").val(car.unitCompanyId);
					$form.find(":input[name='verifyUnitId_gl']").val(car.unitCompanyId);
					$form.find(":input[name='motorcadeId']").val(car.motorcadeId);
					$form.find(":input[name='motorcadeId_gl']").val(car.motorcadeId);
					$form.find(":input[name='motorcadeName']").val(car.motorcadeName);
					$form.find(":input[name='motorcadeName_gl']").val(car.motorcadeName);
					$form.find(":input[name='driverName']").val(car.driverName);
					$form.find(":input[name='driverName_gl']").val(car.driverName);
					var greenslipStartDate,greenslipEndDate,ccEndDate;
					if(car.greenslipStartDate != null){
						greenslipStartDate = car.greenslipStartDate.substring(0,10);
					}
					$form.find(":input[name='greenslipStartDate']").val(greenslipStartDate);
					$form.find(":input[name='greenslipStartDate_gl']").val(greenslipStartDate);
					if(car.greenslipEndDate != null){
						greenslipEndDate = car.greenslipEndDate.substring(0,10)
					}
					$form.find(":input[name='greenslipEndDate']").val(greenslipEndDate);
					$form.find(":input[name='greenslipEndDate_gl']").val(greenslipEndDate);
					$form.find(":input[name='registerDate']").val(car.registerDate.substring(0,10));
					$form.find(":input[name='registerDate_gl']").val(car.registerDate.substring(0,10));
					$form.find(":input[name='vin']").val(car.vin);
					$form.find(":input[name='vin_gl']").val(car.vin);
					$form.find(":input[name='unitCompany']").val(car.unitCompany);
					$form.find(":input[name='unitCompany_gl']").val(car.unitCompany);
					if(car.ccEndDate != null){
						ccEndDate = car.ccEndDate.substring(0,10);
					}
					$form.find(":input[name='ccEndDate']").val(ccEndDate);
					$form.find(":input[name='ccEndDate_gl']").val(ccEndDate);
					$form.find(":input[name='bsType']").val(car.bsType);
					$form.find(":input[name='bsType_gl']").val(car.bsType);
					
					var companyName;
					var companyName1="广州市宝城汽车出租有限公司";
					var companyName2="广州市广发出租汽车有限公司";
					if(car.company=="宝城"){
						companyName=companyName1;
					}else if(car.company=="广发"){
						companyName=companyName2;
					}else{
						companyName=car.company;
					}
					
					$form.find(":input[name='policyHolder']").val(companyName);
					$form.find(":input[name='policyHolder_gl']").val(companyName);
					$form.find(":input[name='engineNo']").val(car.engineNo);
					$form.find(":input[name='engineNo_gl']").val(car.engineNo);
					
				}
			})
		});
		
		
		var tableEl=$form.find("#buyPlantTables")[0];
		
		/**购买险种表格中插入input控件
		 * @option {string} name 单元格的name属性值
		 * @option {Object} value 单元格的json值
		 * @option {Boolean} readonly 单元格是否只读
		 * @option {Boolean} isFirst 单元格是列头
		 */
		function buildInput(name,value,readonly,isFirst){
			var s = '<input style="width:99%;height:100%;border:none;margin:0;padding:0 0 0 2px;';
			if(isFirst){
				s='<span class="ui-icon"></span><input style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;'
				s += 'background:none;';
			}
			if(name=="coverage"){
				s += '" name="' + name + '" type="text" class="ui-widget-content" value="' + value + '"';
			}else{
				s += '" name="' + name + '" type="text" class="ui-widget-content" value="' + value + '"';
			}

			s += '" name="' + name + '" type="text" class="ui-widget-content" value="' + value + '"';
			if(readonly){
				s += ' readonly="' + readonly + '"';
			}
			s += '/>';
			return s;
		}
		// 选择车辆保单险种
		$form.find("#selectInsuranceType").click(function() {
			bs.selectInsuranceType({
				multiple: true,
				onOk : function(selectInsuranceTypes) {
					for(var i=0;i<selectInsuranceTypes.length;i++){
						//插入行
						var newRow=tableEl.insertRow(tableEl.rows.length);
						newRow.setAttribute("class","ui-widget-content row");
						//插入列
						var cell=newRow.insertCell(0);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","id first");
						cell.innerHTML=buildInput("name",selectInsuranceTypes[i].name,true,true);//插入名称
						
						cell=newRow.insertCell(1);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML=buildInput("coverage",selectInsuranceTypes[i].coverage);//插入保额
						
						cell=newRow.insertCell(2);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML=buildInput("description",selectInsuranceTypes[i].description);//插入备注
					}
				}
			});
		});
		
		//添加选中险种
		$form.find("#buyPlantTables").delegate("tr.ui-widget-content.row>td.id","click",function(){
			$(this).parent().toggleClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").toggleClass("ui-icon-check");
		});
		$form.find("#buyPlantTables").delegate("tr.ui-widget-content.row input","focus",function(){
			$(this).closest("tr.row").removeClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").removeClass("ui-icon-check");
		});
		//删除表中选中的险种
		$form.find("#deleteInsuranceType").click(function() {
			var $trs = $form.find("#buyPlantTables tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要删除的险种！");
				return;
			}
			bc.msg.confirm("确定要删除选定的 <b>"+$trs.length+"</b>个险种吗？",function(){
				for(var i=0;i<$trs.length;i++){
					$($trs[i]).remove();
				}
			});
			
		});
	},
	
	buildFormData : function(){
		$page = $(this);
		//先将购买险种合并到隐藏域
		var buyPlants=[];
		//将购买险种表中的内容添加到buyPlants里
		$page.find("#buyPlantTables tr:gt(0)").each(function(){
			var $inputs = $(this).find("td>input");
			var json = {
				name: $inputs[0].value,
				coverage: $inputs[1].value,
				description: $inputs[2].value
			};
			var id = $(this).attr("data-id");
			if(id && id.length > 0)
				json.id = id;
			buyPlants.push(json);
		});
		$page.find(":input[name='list_buyPlants']").val($.toJSON(buyPlants));
		$page.find(":input[name='list_buyPlants_gl']").val($.toJSON(buyPlants));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.carRenew.AssignCarForm.buildFormData.call(this);
		
		//表单验证
		var buyPlants =$page.find(":input[name='list_buyPlants_gl']").val();
		if(buyPlants.length < 3){
			bc.msg.alert("承保险种不能为空,请添加承保险种！");
			return false;
		}
		
		return true;
	}
};