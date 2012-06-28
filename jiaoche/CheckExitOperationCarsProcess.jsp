<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='交车确认流程' data-type='form' class="bc-page"
	data-js='<s:url value="/bc-business-workflow-webapp/jiaoche/CheckExitOperationCarsProcess.js" />,<s:url value="/bc/identity/identity.js" />,<s:url value="/bc-business/bs.js" />'
	data-initMethod='bs.CheckExitOperationCarsProcessForm.init'
	data-option="{'minWidth':300
	,'minHeight':300
	,'modal':false
	,'print':'default.form'
	,'readonly':false
	,'buttons':[{'text':'确认','click':'bs.CheckExitOperationCarsProcessForm.clickOk','id':'CheckExitOperationCarsProcessClickOk'}]
	,'width':960,'height':350}" 
	style="overflow:auto;">
		<div class="formFields ui-widget-content"  style="width:950px;">
			<table class="formFields" cellspacing="2" cellpadding="0">
				<tbody>
					<tr class="widthMarker">
						<td style="width: 80px;"></td>
						<td style="width: 280px;">&nbsp;</td>
						<td style="width: 80px;">&nbsp;</td>
						<td >&nbsp;</td>
					</tr>
					<tr >
						<td colspan="4">
						<center>
						<input type="text" name="jiaocheYear" class="ui-widget-content" style="width:4em"
							data-validate="{'required':true,'type':'number','min':'1990','max':'9999'}"/>
						年
						<input type="text" name="jiaocheMonth" class="ui-widget-content" style="width:2em"
							data-validate="{'required':true,'type':'number','min':'1','max':'12'}"/>
						月份交车确认
						</center>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="ui-widget-content" style="border-width:1px 0 0 0;margin-bottom:8px;">
				<div class="ui-widget-header" style="position:relative;border-width: 0;padding: 0.25em;">
					<span class="text">车辆信息:</span>
					<ul class="inputIcons">
						<li id="upLine" class="inputIcon ui-icon ui-icon-circle-arrow-n" title='上移选中'></li>
						<li id="downLine" class="inputIcon ui-icon ui-icon-circle-arrow-s" title='下移选中'></li>
						<li id="addLine" class="inputIcon ui-icon ui-icon-circle-plus" title='选择车辆'></li>
						<li id="deleteLine" class="inputIcon ui-icon ui-icon-circle-close" title='删除车辆"'></li>
					</ul>
				</div>
		    	<div class="bc-grid header">
				<table class="table" id="jiaocheDetailTables" cellspacing="0" cellpadding="0" style="width: 100%;">
					<tr class="ui-state-default header row">
						<td class="first" style="width: 15px;">&nbsp;</td>
						<td class="middle" style="width: 5em;">分公司</td>
						<td class="middle" style="width: 4.5em;">车号</td>
						<td class="middle" style="width: 5em;">营运性质</td>
						<td class="middle" style="width: 8em;">登记日期</td>
						<td class="middle" style="width: 8em;">合同期限</td>
						<td class="middle" style="width: 8em;">商业结束日期</td>
						<td class="middle" style="width: 8em;">强险结束日期</td>
						<td class="middle" style="width: 8em;">预计交车日期</td>
						<td class="middle" style="width: 8em;">是否已续保险</td>
						<td class="last" style="min-width: 8em;">确认交车日期</td>
					</tr>
					<%-- <s:iterator var="b" value="e.invoice4SellDetail">
					<tr class="ui-widget-content row" data-id='<s:property value="id"/>'>
						<td class="first" style="padding:0;text-align:left;"><span class="ui-icon"></span>
						</td>
						<!-- 分公司 -->
						<td class="middle" style="padding:0;text-align:left;">
							<input type="text" name="unitCompany" />
						</td>
						<!-- 车号 -->
						<td class="middle" style="padding:0;text-align:left;">
							<input type="text" name="plate" />
						</td>
						<!-- 营运性质 -->
						<td class="middle" style="padding:0;text-align:left;">
							<input type="text" name="businessType" />
						</td>
						<!-- 登记日期 -->
						<td class="middle" style="padding:0;text-align:left;">	
							<input type="text" name="registerDate" />
						</td>
						<!-- 合同期限 -->
						<td class="middle" style="padding:0;text-align:left;">
							<input type="text" name="ccEndDate" />
						</td>
						<!-- 商业结束日期 -->
						<td class="middle" style="padding:0;text-align:left;">
							<input type="text" name="commerialEndDate" />
						</td>
						<!-- 强险结束日期 -->
						<td class="middle" style="padding:0;text-align:left;">
							<input type="text" name="greenslipEndDate" />
						</td>
						<!-- 预计交车日期 -->
						<td class="middle" style="padding:0;text-align:left;">
							<input type="text" name="returnDate" />
						</td>
						<!-- 是否已续保 -->
						<td class="middle" style="padding:0;text-align:left;">
							<s:radio name="isClaim" list="#{'1':'已续','2':'未续'}" cssStyle="width:auto;"/>
						</td>
						<!-- 确认交车日期 -->
						<td class="last" style="padding:0;text-align:left;">
							<input type="text" name="sureReturnDate" />
						</td>
					</tr>
					</s:iterator> --%>
				</table>
			</div>
			</div>
			<table class="formFields" cellspacing="2" cellpadding="0">
				<tbody>
					<tr class="widthMarker">
						<td style="width: 80px;"></td>
						<td style="width: 80px;">&nbsp;</td>
						<td style="width: 80px;">&nbsp;</td>
						<td >&nbsp;</td>
					</tr>
					<tr >
						<td class="label">
							选择确认人:
						</td>
						<td colspan="3" class="value relative">
							<input type="text" name="confirmor" class="ui-widget-content" style="width:6em" data-validate="required"/>
							<ul class="inputIcons">
								<li id="selectConfirmor" class="inputIcon ui-icon ui-icon-circle-plus" title='点击选择'></li>
							</ul>
							<input type="hidden" name="confirmorAccount" class="ui-widget-content"  />
							<input type="hidden" name="confirmorId" class="ui-widget-content"  />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
</div>