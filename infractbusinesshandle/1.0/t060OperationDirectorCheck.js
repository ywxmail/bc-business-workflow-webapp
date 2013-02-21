bc.namespace("bswf.infractBusinessInfo");
bswf.infractBusinessInfo.operationDirectorCheckForm = {
	init : function(option,readonly){
		var $form = $(this);
		
		$form.find(":input[name='rsend']").change(function(){
			switch($(this).val()){
				case "1":
					handing_hide();
					break;
				case "2":
					handing_show();
					break;
				case "3":
					handing_hide();
					break;
				default :"other";
			}	
		});
		
		//下一步处理方式自定义显示函数
		function handing_show(){
			var $div=$form.find("#co4department");
			
			$div.show();
			//css:bswf-ignore
			var $ignore=$div.find(".bswf-ignore");
			$ignore.each(function(){
				if($(this).hasClass("ignore")){
					$(this).removeClass("ignore");
				}
			});
			
		}
		//下一步处理方式自定义隐藏函数
		function handing_hide(){
			var $div=$form.find("#co4department");
			$div.hide();
			
			//css:bswf-ignore
			var $ignore=$div.find(".bswf-ignore");
			$ignore.each(function(){
				if(!$(this).hasClass("ignore")){
					$(this).addClass("ignore");
				}
			});
			
			var $departmentsTRs = $div.find("#co4departmentTable tr:gt(0)");
			$departmentsTRs.remove();
			
			var $lis=$div.find("li:not(.inputIcon)");
			$lis.remove();
		}
		
		//------------添加行-------------------
		var tableEl=$form.find("#co4departmentTable")[0];
		$form.find("#addLine").click(function() {
			var $departmentsTRs = $form.find("#co4departmentTable tr:gt(0)");
			var ids='';
			$departmentsTRs.each(function(){
				var $tr = $(this);
				var $inputs = $tr.find(":input");
				if(ids==''){
					ids=$inputs[0].value;
				}else{
					ids+=','+$inputs[0].value;
				}
			});
		
			bc.identity.selectUnitOrDepartment({
				data:{status:0,multiple:true},
				onOk : function(uArr) {
					//检测添加相同部门
					var addflag=true;
					var departStr='';
					if(ids.length>0){
						for(var i=0;i<uArr.length;i++){
							var u=uArr[i];
							var idsArr=ids.split(",");
							for(var i=0;i<idsArr.length;i++){
								if(idsArr[i]==u.id){
									addflag=false;
									if(departStr == ''){
										departStr=u.cname;
									}else{
										departStr+='、'+u.cname;
									}
								}
							}
						}
					}
					
					if(!addflag){
						bc.msg.alert(departStr+"已添加！");
						return;
					}
				
					for(var i=0;i<uArr.length;i++){
						var u=uArr[i];
						//插入行
						var newRow=tableEl.insertRow(tableEl.rows.length);
						newRow.setAttribute("class","ui-widget-content row");

						//插入列
						var cell=newRow.insertCell(0);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","id first");
						cell.innerHTML='<span class="ui-icon"></span>'
							+'<input type="hidden" class="ignore"	value="'+u.id+'"/><input type="hidden" class="ignore"	value="'+u.code+'"/>';
						
						cell=newRow.insertCell(1);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<input type="text" class="ignore" style="width:100%;height:100%;background:none;border:none;padding:0 0 0 2px;"  value="'
							+u.cname+'" readonly="readonly">';
						
						cell=newRow.insertCell(2);
						cell.style.padding="0";
						cell.style.textAlign="left";
						cell.setAttribute("class","middle");
						cell.innerHTML='<div style="position:relative;margin: 0;padding: 1px 0;min-height:19px;margin: 0;font-weight: normal;width: 98%;" >'
							+'<span class="selectTransactor selectButton verticalMiddle ui-icon ui-icon-circle-plus"  title="点击添加协办人"></span>'
							+'<ul class="horizontal" style="padding: 0;overflow:hidden;"></ul>'
							+'</div>';
						
						cell=newRow.insertCell(3);
						cell.style.padding="0";
						cell.style.borderWidth="1px 1px 0 1px";
						cell.setAttribute("class","last");
					}
				}
			});
		});
		//点击选中行
		$form.find("#co4departmentTable").delegate("tr.ui-widget-content.row>td.id","click",function(){
			$(this).parent().toggleClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").toggleClass("ui-icon-check");
		});
		$form.find("#co4departmentTable").delegate("tr.ui-widget-content.row input","focus",function(){
			$(this).closest("tr.row").removeClass("ui-state-highlight").find("td:eq(0)>span.ui-icon").removeClass("ui-icon-check");
		});
		//删除表中选中的
		$form.find("#deleteLine").click(function() {
			var $trs = $form.find("#co4departmentTable tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要删除的信息！");
				return;
			}
			bc.msg.confirm("确定要删除选定的 <b>"+$trs.length+"</b>条信息吗？",function(){
				for(var i=0;i<$trs.length;i++){
					$($trs[i]).remove();
				}
			});
			
		});
		
		//上移表中选中的
		$form.find("#upLine").click(function() {
			var $trs = $form.find("#co4departmentTable tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要上移的！");
				return;
			}else{
				$trs.each(function(){
					var $tr = $(this);
					if($tr[0].rowIndex < 2){
						bc.msg.slide("不能再上移！");					
					}else{
						var $beroreTr=$tr.prev();
						$beroreTr.insertAfter($tr);
					}
				});
			}

		});
		//下移表中选中的
		$form.find("#downLine").click(function() {
			var $trs = $form.find("#co4departmentTable tr.ui-state-highlight");
			if($trs.length == 0){
				bc.msg.slide("请先选择要下移的！");
				return;
			}else{
				
				for(var i=$trs.length;i>0;i--){
					var $tr=$($trs[i-1]);
					var $beroreTr=$tr.next();
					if($beroreTr.length==0){
						bc.msg.slide("不能再下移！");					
					}else{
						$beroreTr.insertBefore($tr);
					}
				}
			}
		});
		
		//声明li
		var liTpl = '<li class="horizontal  ui-widget-content ui-corner-all ui-state-highlight" data-id="{0}"'+
		" data-hidden='{1}'"+
		' style="position: relative;margin:0 2px;float: left;padding: 0;border-width: 0;">'+
		'<span class="text">{2}</span>'+
		'<span class="click2remove verticalMiddle ui-icon ui-icon-close" style="margin: -8px -2px;" title={3}></span></li>';
		
		//绑定添加办理人事件
		$form.delegate(".selectTransactor","click",function(){
				var $row = $(this).closest(".row");
				var $inputs = $row.find(":input");
				var $ul = $row.find("ul");
				var $lis = $ul.find("li");
				var selecteds="";
				$lis.each(function(i){
					selecteds+=(i > 0 ? "," : "") + ($(this).attr("data-id"));//
				});
				bc.identity.selectUser({
					multiple: true,//可多选
					status:'0',
					selecteds: selecteds,
					group:$inputs[1].value,
					onOk: function(users){
						$.each(users,function(i,user){
							if($lis.filter("[data-id='" + user.id + "']").size() > 0){//已存在
								logger.info("duplicate select: id=" + user.id + ",name=" + user.name);
							}else{//新添加的
								var data={
									id:user.id,
									code:user.account,
									name:user.name
								}
								$(liTpl.format(user.id,$.toJSON(data),user.name,'点击移除'))
								.appendTo($ul).find("span.click2remove")
								.click(function(){
									$(this).parent().remove();
								});
							}
						});
					}
				});
		});
	},
	buildFormData : function(){
		var $form = $(this);
		
		var send=$form.find(":input[name='rsend']:checked").val();
		$form.find(":input[name='send']").val(send);
		
		if(send=="1"){
			$form.find(":input[name='isReturn']").val(false);
			$form.find(":input[name='isDcFlow']").val(false);
		}else if(send=="2"){
			$form.find(":input[name='isReturn']").val(false);
			$form.find(":input[name='isDcFlow']").val(true);
		
			var $departmentsTRs = $form.find("#co4departmentTable tr:gt(0)");
			//用户显示的部门信息
			var co4departments = [];
			
			//多实例集合变量
			var list_departmentAndAssignee = [];
			
			$departmentsTRs.each(function(){
					var $inputs=$(this).find(":input");
					var $lis=$(this).find("ul>li");
					var transactorNames='';
					var transactorIds='';
					$lis.each(function(){
						var temp=$(this).attr("data-hidden");
						var obj_transactor=eval("("+temp+")");
						if(transactorNames==''){
							transactorNames=obj_transactor.name;
							transactorIds=obj_transactor.id;
						}else{
							transactorNames+= ","+obj_transactor.name;
							transactorIds+= ","+obj_transactor.id;
						}
						
						//实例变量
						var instance={
							mcode:$inputs[1].value,
							mname:$inputs[2].value,
							assignee:obj_transactor.code,
							assigneeId:obj_transactor.id,
							subject:'相关部门协办（'+$inputs[2].value+'）'
						}
						
						list_departmentAndAssignee.push(instance);
					});
					
					var co4department={
						co4departmentId:$inputs[0].value,
						co4departmentCode:$inputs[1].value,
						co4departmentName:$inputs[2].value,
						transactorNames:transactorNames,
						transactorIds:transactorIds
					}
					co4departments.push(co4department);
			});
			
			$form.find(":input[name='list_mc_co4department']").val($.toJSON(co4departments));
			$form.find(":input[name='list_co4departmentAndAssignee']").val($.toJSON(list_departmentAndAssignee));
		
		}else{
			$form.find(":input[name='isReturn']").val(true);
			$form.find(":input[name='isDcFlow']").val(false);
		}
		
	},
	
	/** 表单验证方法 */
	validateForm: function(){
		if(!bc.validator.validate(this))
			return false;
		
		var $form = $(this);
		
		var send=$form.find(":input[name='rsend']:checked").val();
		
		if(send!="4"){
			if(send=="2"){
				//先检测部门
				var $departmentsTRs = $form.find("#co4departmentTable tr");
				if($departmentsTRs.size()<2){
					bc.msg.alert("请添加协办部门！");
					return false;
				}
				
				//检测部门中的协办人
				var check=false;
				var deprt='';
				$departmentsTRs.each(function(index){
					if(index>0){
						$inputs=$(this).find(":input");
						$lis=$(this).find("ul>li");
						if($lis.size()<1){
							check=true;
							deprt=$inputs[2].value;
						}
					}
				});
				if(check){
					bc.msg.alert("请为协办部门"+deprt+"添加协办人！");
					return false;
				}
			}
		}else{
			bc.msg.alert("请确认下一步相关操作！");
			return false;
		}
		
		bswf.infractBusinessInfo.operationDirectorCheckForm.buildFormData.call(this);
		
		return true;
	}
};