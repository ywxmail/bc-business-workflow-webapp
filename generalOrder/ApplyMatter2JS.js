bc.namespace("bswf.generalOrder");
bswf.generalOrder.ApplyMatterForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		
		
		//------------添加行-------------------
		var tableEl=$form.find("#applyMatters")[0];
		$form.find("#addLine").click(function() {
			//插入行
			var newRow=tableEl.insertRow(tableEl.rows.length);
			newRow.setAttribute("class","ui-widget-content row");

			//插入列
			var cell=newRow.insertCell(0);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.style.width="1.1em";
			cell.setAttribute("class","id first");
			cell.innerHTML='<span class="ui-icon"></span>';
			
			cell=newRow.insertCell(1);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" class="ignore" style="width:100%;height:100%;border:none;background:none;padding:0 0 0 2px;"  data-validate="required" placeholder="这里输入事项">';
			
			cell=newRow.insertCell(2);
			cell.style.padding="0";
			cell.style.textAlign="left";
			cell.setAttribute("class","middle");
			cell.innerHTML='<input type="text" class="ignore" style="width:100%;height:100%;border:none;background:none;padding:0 0 0 2px;" placeholder="这里输入备注">';
			
			cell=newRow.insertCell(3);
			cell.style.padding="0";
			cell.style.borderWidth="1px 1px 0 1px";
			cell.setAttribute("class","last");
		});
		//点击选中行
		$form.find("#applyMatters").delegate("tr.ui-widget-content.row>td.id","click",function(){
			$(this).parent().toggleClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").toggleClass("ui-icon-check");
		});
		$form.find("#applyMatters").delegate("tr.ui-widget-content.row input","focus",function(){
			$(this).closest("tr.row").removeClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").removeClass("ui-icon-check");
		});
		//删除表中选中的
		$form.find("#deleteLine").click(function() {
			var $trs = $form.find("#applyMatters tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要删除的事项信息！");
				return;
			}
			bc.msg.confirm("确定要删除选定的 <b>"+$trs.length+"</b>条事项信息吗？",function(){
				for(var i=0;i<$trs.length;i++){
					$($trs[i]).remove();
				}
			});
			
		});
		
		//上移表中选中的明细项目
		$form.find("#upLine").click(function() {
			var $trs = $form.find("#applyMatters tr.ui-state-highlight");
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
			var $trs = $form.find("#applyMatters tr.ui-state-highlight");
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
		$form.find("#selectUnit").click(function(){
			bc.identity.selectUnit({
				onOk : function(unit) {
					$form.find(":input[name='verifyUnitId']").val(unit.id);
					$form.find(":input[name='verifyUnitName']").val(unit.name);
				}
			});
		});
		
		//选择经理
		$form.find("#selectUnitManager").click(function(){
			bc.identity.selectUser({
				onOk : function(user) {
					$form.find(":input[name='unitManagerName']").val(user.name);
					$form.find(":input[name='unitManager']").val(user.account);
				}
			});
		});
	},
	buildFormData : function(){
		$form = $(this);
		var $applyMattersTRs = $form.find("#applyMatters tr:gt(0)");
		var applyMatters = [];
		var i=1;
		$applyMattersTRs.each(function(){
			$tr = $(this);
			var $inputs = $tr.find(":input");
			var applyMatter = {
				id: i++,
				matter: $inputs[0].value,
				desc: $inputs[1].value
			};
			applyMatters.push(applyMatter);
		});
		
		$form.find(":input[name='list_am_applyMatters']").val($.toJSON(applyMatters));
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		bswf.generalOrder.ApplyMatterForm.buildFormData.call(this);
		var applyMatters = $form.find(":input[name='list_am_applyMatters']").val();
		if(applyMatters.length < 3){
			bc.msg.alert("请添加事项！");
			return false;
		}
		
		return true;
	}
};