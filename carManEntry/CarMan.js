bc.namespace("bswf.carManEntry");
bswf.carManEntry.CarManForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		$form.find(".oldCar").hide();
		$form.find(".pairNameTd").hide();
		$form.find(".crimeRecodeDescTr").hide();
		
		//点击身份证input的灯泡自动生成籍贯
		$form.find("#loadCarManOrigin").click(function(){
			if(!bc.validator.validate($form.find(":input[name='cert4Identity']").parent())){
				return;
			}
			var identityId=$form.find(":input[name='cert4Identity']").val();
			var url=bc.root + "/bc-business/carMan/autoLoadCarManIdentityInfo?identityId="+identityId;
			$.ajax({
				url:url,
				dataType:"json",
				success:function(json){
					$form.find(":input[name='origin']").val(json.origin);
				}
			});
		});
		
		//选择司机
		$form.find("#selectCarMan").click(function(){
			bs.selectCarMan({
				status: '0,1,-1',
				onOk:function(carman){
					$form.find(":input[name='name']").val(carman.name);
					$form.find(":input[name='tempName']").val(carman.name);
					$form.find(":input[name='carManId']").val(carman.id);
					$form.find(":input[name='cert4FWZG']").val(carman.cert4FWZG);
					$form.find(":input[name='sex']").val(carman.sex=='1'?'男':'女');
					$form.find(":input[name='origin']").val(carman.origin);
					$form.find(":input[name='address']").val(carman.address1);
					$form.find(":input[name='originAddress']").val(carman.address);
					$form.find(":input[name='phone']").val(carman.phone);
					$form.find(":input[name='cert4Identity']").val(carman.cert_identity);
					$form.find(":input[name='cert4CYZG']").val(carman.cert_cyzg);
					var cdfd=carman.cert_driving_first_date;
					$form.find(":input[name='cert4DrivingFirstDate']").val(cdfd!=''&&cdfd.length>0?cdfd.substring(0,10):cdfd);
				}
			});
		});
		
		function OpenToTaxiNet(type,v){
			if(v=='')
				return;

			// 打开查询窗口
			bc.page.newWin({
				mid: "gztaxixhDriverInfo" + v,
				name: "出租协会" + (v ? " - " + v : ""),
				url: bc.root + "/bc-business/gztaxixh/driverInfo",
				data: {value: (v ? v : ""),type:type}
			});		
		}
		
		//使用姓名查出租车协会司机信息
		$form.find("#selectCarManToTaxiNet4Name").click(function(){
			OpenToTaxiNet("姓名",$form.find(":input[name='name']").val());
		});
		
		//使用从业资格证查出租车协会司机信息
		$form.find("#selectCarManToTaxiNet4CYZG").click(function(){
			OpenToTaxiNet("从业人员资格证",$form.find(":input[name='cert4CYZG']").val());
		});
		
		//使用资格证查出租车协会司机信息
		$form.find("#selectCarManToTaxiNet4FWZG").click(function(){
			OpenToTaxiNet("服务资格证",$form.find(":input[name='cert4FWZG']").val());
		});
		
		//绑定是否成对报名栏事件
		$form.find(":input[name='isPair']").change(function(){
			var flag=$(this).val();
			if(flag == 'true'){
				$form.find(".pairNameTd").show();
				$form.find(":input[name='pairName']").attr("data-validate","required");
			}else{
				$form.find(".pairNameTd").hide();
				$form.find(":input[name='pairName']").val('');
				$form.find(":input[name='pairCarManId']").val('');
				$form.find(":input[name='pairName']").removeAttr("data-validate");
			}
		});
		
		//查对班司机在查协会网信息
		$form.find("#selectPairCarManToTaxiNet4Name").click(function(){
			OpenToTaxiNet("姓名",$form.find(":input[name='pairName']").val());
		});
		
		//查对班司机信息
		$form.find("#selectPairCarMan").click(function(){
			bs.selectCarMan({
				status: '0,1,-1',
				onOk:function(carman){
					$form.find(":input[name='pairName']").val(carman.name);
					$form.find(":input[name='pairTempName']").val(carman.name);
					$form.find(":input[name='pairCarManId']").val(carman.id);
				}
			});
		});
		
		//绑定车辆需求事件
		$form.find(":input[name='is2NeedOldCar']").change(function(){
			var flag=$(this).val();
			if(flag == 'true'){
				$form.find(":input[name='oldCarPlate']").attr("data-validate","required");
				$form.find(".oldCar").show();
			}else{
				$form.find(".oldCar").hide();
				$form.find(":input[name='oldCarPlate']").val('');
				$form.find(":input[name='oldCarId']").val('');
				$form.find(":input[name='oldCarUnitCompanyId']").val('');
				$form.find(":input[name='oldCarPlate']").removeAttr("data-validate");
			}
		});
		
		//绑定车辆选择按钮
		$form.find("#selectCar").click(function(){
			bs.selectCar({
				status: '0',
				data:{multiple: false,loadLevel:'1'},
				onOk:function(car){
					$form.find(":input[name='oldCarPlate']").val(car.plate);
					$form.find(":input[name='oldCarId']").val(car.id);
					$form.find(":input[name='oldCarUnitCompanyId']").val(car.unitCompanyId);
				}
			});
		});
		
		//绑定犯罪记录情况事件
		$form.find(":input[name='crimeRecode']").change(function(){
			var flag=$(this).val();
			if(flag == '有犯罪记录'){
				$form.find(":input[name='crimeRecodeDesc']").attr("data-validate","required");
				$form.find(".crimeRecodeDescTr").show();
			}else{
				$form.find(".crimeRecodeDescTr").hide();
				$form.find(":input[name='crimeRecodeDesc']").val('');
				$form.find(":input[name='crimeRecodeDesc']").removeAttr("data-validate");
			}
		});
		
		//----工作经历表格事件---开始---
		var tableEl_we=$form.find("#wes")[0];
		$form.find("#addLine_we").click(function(){
			var newRow=tableEl_we.insertRow(tableEl_we.rows.length);
			newRow.setAttribute("class","ui-widget-content row");
			var cell=newRow.insertCell(0);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","id first");
			cell.innerHTML='<span class="ui-icon"></span>';
			
			cell=newRow.insertCell(1);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML=
				'<div class="relative" style="display:inline;">'
					+'<input type="text" data-validate=\'{"type":"date","required":true}\' '
						+'style="width:7em;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" '
						+'class="ignore bc-date ui-widget-content"/>'
					+'<ul class="inputIcons">'
						+'<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
					+'</ul>'
				+'</div>'
				+'<div style="width:1em;display:inline;">'
					+'~'
				+'</div>'
				+'<div class="relative" style="display:inline;">'
					+'<input type="text" data-validate=\'{"type":"date","required":true}\' '
						+'style="width:7em;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" '
						+'class="ignore bc-date ui-widget-content"/>'
					+'<ul class="inputIcons">'
						+'<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
					+'</ul>'
				+'</div>';
			//绑定日期选择
			bc.form.initCalendarSelect($(cell));
			
			cell=newRow.insertCell(2);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" style="width:100%;height:100%;border:none;padding:0 0 0 2px;background:none;" class="ignore ui-widget-content" data-validate="required"  />';
			
			cell=newRow.insertCell(3);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" style="width:100%;height:100%;border:none;padding:0 0 0 2px;background:none;" class="ignore ui-widget-content"/>';
					
			cell=newRow.insertCell(4);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" style="width:100%;height:100%;border:none;padding:0 0 0 2px;background:none;" class="ignore ui-widget-content" data-validate=\'{"type":"phone"}\' />';
		
			//插入空白列
			cell=newRow.insertCell(5);
			cell.style.minWidth="0.001em";
			cell.style.borderRight="1px solid #CCC";
			cell.setAttribute("class","last");
		
		});
		
		//点击选中行
		$form.find("#wes").delegate("tr.ui-widget-content.row>td.id","click",function(){
			$(this).parent().toggleClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").toggleClass("ui-icon-check");
		});
		$form.find("#wes").delegate("tr.ui-widget-content.row input","focus",function(){
			$(this).closest("tr.row").removeClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").removeClass("ui-icon-check");
		});
		
		//删除表中选中的
		$form.find("#deleteLine_we").click(function() {
			var $trs = $form.find("#wes tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要删除的工作经历！");
				return;
			}
			bc.msg.confirm("确定要删除选定的 <b>"+$trs.length+"</b>条工作经历吗？",function(){
				for(var i=0;i<$trs.length;i++){
					$($trs[i]).remove();
				}
			});
			
		});
		
		//上移表中选中的明细项目
		$form.find("#upLine_we").click(function() {
			var $trs = $form.find("#wes tr.ui-state-highlight");
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
		$form.find("#downLine_we").click(function() {
			var $trs = $form.find("#wes tr.ui-state-highlight");
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
		//----工作经历表格事件---结束---
		
		//----家庭成员表格事件---开始---
		var tableEl_fm=$form.find("#fms")[0];
		$form.find("#addLine_fm").click(function(){
			var newRow=tableEl_fm.insertRow(tableEl_fm.rows.length);
			newRow.setAttribute("class","ui-widget-content row");
			var cell=newRow.insertCell(0);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","id first");
			cell.innerHTML='<span class="ui-icon"></span>';
			
			cell=newRow.insertCell(1);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" style="width:100%;height:100%;border:none;padding:0 0 0 2px;background:none;" class="ignore ui-widget-content" data-validate="required" />';
			
			cell=newRow.insertCell(2);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" style="width:100%;height:100%;border:none;padding:0 0 0 2px;background:none;" class="ignore ui-widget-content" data-validate="required" />';
					
			cell=newRow.insertCell(3);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" style="width:100%;height:100%;border:none;padding:0 0 0 2px;background:none;" class="ignore ui-widget-content" data-validate=\'{"type":"phone"}\' />';
		
			//插入空白列
			cell=newRow.insertCell(4);
			cell.style.minWidth="0.001em";
			cell.style.borderRight="1px solid #CCC";
			cell.setAttribute("class","last");
		
		});
		
		//点击选中行
		$form.find("#fms").delegate("tr.ui-widget-content.row>td.id","click",function(){
			$(this).parent().toggleClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").toggleClass("ui-icon-check");
		});
		$form.find("#fms").delegate("tr.ui-widget-content.row input","focus",function(){
			$(this).closest("tr.row").removeClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").removeClass("ui-icon-check");
		});
		
		//删除表中选中的
		$form.find("#deleteLine_fm").click(function() {
			var $trs = $form.find("#fms tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要删除的家庭成员信息！");
				return;
			}
			bc.msg.confirm("确定要删除选定的 <b>"+$trs.length+"</b>条家庭成员信息吗？",function(){
				for(var i=0;i<$trs.length;i++){
					$($trs[i]).remove();
				}
			});
			
		});
		
		//上移表中选中的明细项目
		$form.find("#upLine_fm").click(function() {
			var $trs = $form.find("#fms tr.ui-state-highlight");
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
		$form.find("#downLine_fm").click(function() {
			var $trs = $form.find("#fms tr.ui-state-highlight");
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
		//----家庭成员表格事件---结束---
		
	},
	
	buildFormData : function(){
		$form = $(this);
		var name=$form.find(":input[name='name']").val();
		//生成主题
		$form.find(":input[name='subject']").val('驾驶员入职审批('+name+')');
		
		var tempName=$form.find(":input[name='tempName']").val();
		
		//去除选择效果
		if(name != tempName)
			$form.find(":input[name='carManId']").val('');
		
		var pairName=$form.find(":input[name='pairName']").val();
		
		var tempPairName=$form.find(":input[name='tempPairName']").val();
		
		//去除选择效果
		if(pairName != tempPairName)
			$form.find(":input[name='pairCarManId']").val('');
		
		//工作经历明细
		var $weTRs = $form.find("#wes tr:gt(0)");
		var wes = [];
		$weTRs.each(function(){
			$tr = $(this);
			var $inputs = $tr.find(":input");
			var we = {
				startDate: $inputs[0].value,
				endDate: $inputs[1].value,
				unit: $inputs[2].value,
				certifier: $inputs[3].value,
				phone: $inputs[4].value
			};
			wes.push(we);
		});
		$form.find(":input[name='list_carman_workExperience']").val($.toJSON(wes));
		
		//家庭成员明细
		var $fmTRs = $form.find("#fms tr:gt(0)");
		var fms = [];
		$fmTRs.each(function(){
			$tr = $(this);
			var $inputs = $tr.find(":input");
			var fm = {
				name: $inputs[0].value,
				relation: $inputs[1].value,
				phone: $inputs[2].value
			};
			fms.push(fm);
		});
		$form.find(":input[name='list_carman_family']").val($.toJSON(fms));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.carManEntry.CarManForm.buildFormData.call(this);
		
		return true;
	},
	/** 身份证验证方法:上下文为validate对象 */
	validateIndentity: function(element, $form){
		return /^(\d{15}|(\d{17}\w{1}))$/.test(element.value);
	},
};