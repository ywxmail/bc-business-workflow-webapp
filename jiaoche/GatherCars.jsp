<form class="bc-page" data-type='form' style="overflow: auto;"
	data-namespace="bs.GatherCarsForm"
	data-js='js:bc_identity,bc-business/bs.js,bc-business-workflow/jiaoche/GatherCars.js'
	data-readonly="<#if readonly??>${readonly}<#else>false</#if>">
	<table cellspacing="4" cellpadding="0" style="width:100%;min-width: 400px;">
		<tr>
			<td class="label" style="min-width: 3.5em;width: 3.5em;">标题：</td>
			<td class="value"><input type="text" name="subject" class="ui-widget-content" data-scope="global"
			data-validate="required" value="${year}年${month}月份交车确认"/></td>
			<td class="label" style="min-width: 6.5em;width: 6.5em;">经办分公司：</td>
			<td class="value" style="width: 10em;">
				<div class="relative" style="width:10em;">
					<input type="text" name="verifyUnitName" class="ui-widget-content" data-validate="required" data-scope="global"/>
					<ul class="inputIcons">
						<li id="selectConfirmor" class="inputIcon ui-icon ui-icon-circle-plus" title='选择分公司'></li>
					</ul>
					<input type="hidden" name="verifyUnitId" data-scope="global" data-type="long"/>
				</div>
			</td>
		</tr>
	</table>
	<div class="ui-widget-header" style="position:relative;border-width: 0;padding: 0.25em;">
		<span class="text">车辆信息:</span>
		<ul class="inputIcons">
			<li id="upLine" class="inputIcon ui-icon ui-icon-circle-arrow-n" title='上移选中项'></li>
			<li id="downLine" class="inputIcon ui-icon ui-icon-circle-arrow-s" title='下移选中项'></li>
			<li id="addLine" class="inputIcon ui-icon ui-icon-circle-plus" title='选择车辆'></li>
			<li id="deleteLine" class="inputIcon ui-icon ui-icon-circle-close" title='删除车辆"'></li>
		</ul>
	</div>
	<input type="hidden" name="list_cars" data-scope="global"/>
	<table class="bc-grid" id="cars" cellspacing="0" cellpadding="0" style="margin-bottom:4px;width:100%">
		<tr class="ui-state-default header row">
			<td class="first" style="width: 15px;">&nbsp;</td>
			<td class="middle" style="min-width: 5em;">分公司</td>
			<td class="middle" style="width: 4.5em;">车号</td>
			<td class="middle" style="width: 5em;">营运性质</td>
			<td class="middle" style="width: 8em;">登记日期</td>
			<td class="middle" style="width: 8em;">合同期限</td>
			<td class="middle" style="width: 8em;">商业结束日期</td>
			<td class="middle" style="width: 8em;">强险结束日期</td>
			<td class="middle" style="width: 8em;">预计交车日期</td>
		</tr>
		<#if list_cars??>
		<#list list_cars as car>
		<tr class="ui-widget-content row" data-id='${car.id}'>
			<td class="first" style="padding:0;text-align:left;"><span class="ui-icon"></span><input type="hidden" name="id" value="${car.id}"/>
			</td>
			<!-- 分公司 -->
			<td class="middle" style="padding:0;text-align:left;">
				<input type="text" class="ignore" name="unitCompany" value="${car.unitCompany}"/>
			</td>
			<!-- 车号 -->
			<td class="middle" style="padding:0;text-align:left;">
				<input type="text" class="ignore" name="plate" value='${car.plateNo}'/>
			</td>
			<!-- 营运性质 -->
			<td class="middle" style="padding:0;text-align:left;">
				<input type="text" class="ignore" name="businessType" />
			</td>
			<!-- 登记日期 -->
			<td class="middle" style="padding:0;text-align:left;">	
				<input type="text" class="ignore" name="registerDate" />
			</td>
			<!-- 合同期限 -->
			<td class="middle" style="padding:0;text-align:left;">
				<input type="text" class="ignore" name="ccEndDate" />
			</td>
			<!-- 商业结束日期 -->
			<td class="middle" style="padding:0;text-align:left;">
				<input type="text" class="ignore" name="commerialEndDate" />
			</td>
			<!-- 强险结束日期 -->
			<td class="middle" style="padding:0;text-align:left;">
				<input type="text" class="ignore" name="greenslipEndDate" />
			</td>
			<!-- 预计交车日期 -->
			<td class="middle" style="padding:0;text-align:left;">
				<input type="text" class="ignore" name="predictReturnDate" />
			</td>
		</tr>
		</#list>
		</#if>
	</table>
</form>