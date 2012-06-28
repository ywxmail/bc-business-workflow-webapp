if(!window['bs'])window['bs']={};
bs.CheckExitOperationCarsProcessForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		//加载年和月份
		var d = new Date();
		$form.find(":input[name='jiaocheYear']").val(d.getFullYear());
		$form.find(":input[name='jiaocheMonth']").val(d.getMonth() + 1);
		
		//------------添加行-------------------
		var tableEl=$form.find("#jiaocheDetailTables")[0];
		$form.find("#addLine").click(function() {
			bs.selectCar({
				status: '0',
				data:{multiple: true,loadLevel:'1'},
				onOk : function(cars) {
					for(var i=0;i <cars.length;i++){
						//插入行
						var newRow=tableEl.insertRow(tableEl.rows.length);
						newRow.setAttribute("class","ui-widget-content row");
						//插入列
						var cell=newRow.insertCell(0);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","id first");
						cell.innerHTML='<span class="ui-icon"></span>';//空白头列
						
						//插入公司
						var unitCompany='';
						if(!(cars[i].unitCompany==null))
							unitCompany=cars[i].unitCompany;
						cell=newRow.insertCell(1);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input name="unitCompany" style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;"'
							+'value="'
							+unitCompany+'"'
							+'type="text" class="ui-widget-content"  data-validate="required">';
						
						//插入车号
						cell=newRow.insertCell(2);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input name="plateNo" style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;"'
							+'value="'+cars[i].plateNo+'"'
							+'type="text" class="ui-widget-content"  data-validate="required">';
						
						//插入营运性质
						cell=newRow.insertCell(3);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input name="businessType" style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;"'
							+'value="'+cars[i].bsType+'"'
							+'type="text" class="ui-widget-content"  data-validate="required">';
						
						//插入登记日期
						cell=newRow.insertCell(4);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<div class="relative">'
							+'	<input type="text" name="registerDate" data-validate=\'{"type":"date","required":true}\' value="'+cars[i].registerDate+'"'
							+'  style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" class="bc-date ui-widget-content" >'
							+'	<ul class="inputIcons">'
							+'		<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
							+'	</ul>'
							+'</div>';
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
						cell.innerHTML='<div class="relative">'
							+'	<input type="text" name="ccEndDate" data-validate=\'{"type":"date","required":false}\' value="'
							+ccEndDate+'"'
							+'  style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" class="bc-date ui-widget-content" >'
							+'	<ul class="inputIcons">'
							+'		<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
							+'	</ul>'
							+'</div>';
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
						cell.innerHTML='<div class="relative">'
							+'	<input type="text" name="commerialEndDate" data-validate=\'{"type":"date","required":false}\' value="'
							+commerialEndDate+'"'
							+'  style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" class="bc-date ui-widget-content" >'
							+'	<ul class="inputIcons">'
							+'		<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
							+'	</ul>'
							+'</div>';
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
						cell.innerHTML='<div class="relative">'
							+'	<input type="text" name="greenslipEndDate" data-validate=\'{"type":"date","required":false}\' value="'
							+greenslipEndDate+'"'
							+'  style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" class="bc-date ui-widget-content" >'
							+'	<ul class="inputIcons">'
							+'		<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
							+'	</ul>'
							+'</div>';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
												
						//插入预计交车日期
						var returnDate='';
						if(!(cars[i].returnDate==null))
							returnDate=cars[i].returnDate.substring(0,10);
						cell=newRow.insertCell(8);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<div class="relative">'
							+'	<input type="text" name="returnDate" data-validate=\'{"type":"date","required":false}\' value="'
							+returnDate+'"'
							+'  style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" class="bc-date ui-widget-content" >'
							+'	<ul class="inputIcons">'
							+'		<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
							+'	</ul>'
							+'</div>';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
						
						//是否已续保
						cell=newRow.insertCell(9);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<select name="code" class="ui-widget-content bs-i4sell-detail-code" style="width:100%;height:100%;border:none;margin:0;padding:0 10px 0 2px"'
							+'	>'
							+'  <option value></option> '
							+'  <option value="0">未续</option> '
							+'  <option value="1">已续</option> '
							+'</select>';
						
						//插入确认交车日期
						cell=newRow.insertCell(10);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<div class="relative">'
							+'	<input type="text" name="" data-validate=\'{"type":"date","required":false}\''
							+'  style="width:100%;height:100%;border:none;margin:0;padding:0 0 0 2px;background:none;" class="bc-date ui-widget-content" >'
							+'	<ul class="inputIcons">'
							+'		<li class="selectCalendar inputIcon ui-icon ui-icon-calendar"></li>'
							+'	</ul>'
							+'</div>';
						//绑定日期选择
						bc.form.initCalendarSelect($(cell));
					}		
				}
			});
		});
		//点击选中行
		$form.find("#jiaocheDetailTables").delegate("tr.ui-widget-content.row>td.id","click",function(){
			$(this).parent().toggleClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").toggleClass("ui-icon-check");
		});
		$form.find("#jiaocheDetailTables").delegate("tr.ui-widget-content.row input","focus",function(){
			$(this).closest("tr.row").removeClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").removeClass("ui-icon-check");
		});
		//删除表中选中的
		$form.find("#deleteLine").click(function() {
			var $trs = $form.find("#jiaocheDetailTables tr.ui-state-highlight");
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
			var $trs = $form.find("#jiaocheDetailTables tr.ui-state-highlight");
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
			var $trs = $form.find("#jiaocheDetailTables tr.ui-state-highlight");
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
		
		//确认人
		$form.find("#selectConfirmor").click(function(){
			bc.identity.selectUser({
				onOk : function(user) {
					$form.find(":input[name='confirmorId']").val(user.id);
					$form.find(":input[name='confirmor']").val(user.name);
					$form.find(":input[name='confirmorAccount']").val(user.account);
				}
			});
		});
				
	},
	clickOk : function(){
		$form = $(this);
		//表单先验证
		if(!bc.validator.validate($form))
			return;
		$jiaocheDetailTables=$form.find("#jiaocheDetailTables tr");
		if(!bc.validator.validate($jiaocheDetailTables))
			return;
		
		var jiaocheDetails=[];
		$form.find("#jiaocheDetailTables tr:gt(0)").each(function(){
			var $inputs = $(this).find("td>input");
			var $selects= $(this).find("td>select");
			var $divInputs= $(this).find("td>div>input");
			
			var json = {
				isCliam: $selects[0].value,
				unitCompany: $inputs[0].value,
				plateNo: $inputs[1].value,
				businessType: $inputs[2].value,
				registerDate: $divInputs[0].value,
				ccEndDate: $divInputs[1].value,
				commerialEndDate: $divInputs[2].value,
				greenslipEndDate: $divInputs[3].value,
				returnDate: $divInputs[4].value,
				sureReturnDate: $divInputs[5].value
			};
			var id = $(this).attr("data-id");
			if(id && id.length > 0)
				json.id = id;
			jiaocheDetails.push(json);
		});
		var str=$.toJSON(jiaocheDetails);
		if(str=='[]'){
			bc.msg.alert("车辆信息至少需要一条明细！");
			return;
		}
		
		//交车确认日期
		var jsonDate={
				year:$form.find(":input[name='jiaocheYear']").val(),
				month:$form.find(":input[name='jiaocheMonth']").val()
		};
		var jiaocheDate=[];
		jiaocheDate.push(jsonDate);
		
		//交车确认人信息
		var jsonConfirmor={
				name:$form.find(":input[name='confirmor']").val(),
				id:$form.find(":input[name='confirmorId']").val(),
				account:$form.find(":input[name='confirmorAccount']").val()
		}
		var jiaocheConfirmor=[];
		jiaocheConfirmor.push(jsonConfirmor);
		
		//表单所有信息集合
		var jiaocheInfo={
			confimor:jiaocheConfirmor,
			date:jiaocheDate,
			jiaocheDetails:jiaocheDetails
		};
		
		bc.msg.confirm("确认提交车辆信息？",function(){
			alert($.toJSON(jiaocheInfo));
		});
	}
};