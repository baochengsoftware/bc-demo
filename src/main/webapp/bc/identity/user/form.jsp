<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="user.title"/>' data-type='form'
	data-saveUrl='<s:url value="/bc/user/save" />'
	data-js='<s:url value="/bc/libs/select.js" />,<s:url value="/bc/identity/identity.js" />,<s:url value="/bc/identity/user/form.css" />,<s:url value="/bc/identity/user/form.js" />'
	data-initMethod='bc.userForm.init'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"width":618,"minWidth":250,"minHeight":250,"modal":false
	}'>
	<s:form name="userForm" theme="simple">
		<table class="userFormTable ui-widget-content" cellspacing="2" cellpadding="0">
			<tbody>
				<tr>
					<td class="label">* <s:text name="user.name"/>:</td>
					<td class="value w200"><s:textfield name="e.name" data-validate="required"/></td>
					<td class="label">* <s:text name="user.belong"/>:</td>
					<td class="value"><s:textfield name="belong.name" data-validate="required"
					cssStyle="float:left;width:200px;" readonly="true"/><span id="selectBelong" class="clickToSelect ui-icon ui-icon-search" 
					title='<s:text name="title.select"/>'></span></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="user.code"/>:</td>
					<td class="value"><s:textfield name="e.code" data-validate="required"/></td>
					<td class="label"><s:text name="user.duty"/>:</td>
					<td class="value">
						<s:select list="duties" listKey="id" listValue="name" value="e.detail.duty.id"></s:select>
					</td>
				</tr>
				<tr>
					<td class="label">* <s:text name="label.order"/>:</td>
					<td class="value"><s:textfield name="e.order" data-validate='required'/></td>
					<td class="label"><s:text name="user.phone"/>:</td>
					<td class="value"><s:textfield name="e.phone" data-validate='{"type":"phone","required":false}'/></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="user.card"/>:</td>
					<td class="value"><s:textfield name="e.card" data-validate="required"/></td>
					<td class="label"><s:text name="user.email"/>:</td>
					<td class="value"><s:textfield name="e.email" data-validate='{"type":"email","required":false}'/></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="user.workDate"/>:</td>
					<td class="value"><s:textfield name="e.detail.workDate" data-validate="required"/></td>
					<td class="label"><s:text name="user.gender"/>:</td>
					<td class="value"><s:radio name="e.detail.sex" list="#{'1':'男','2':'女','0':'不设置'}" 
						value="e.detail.sex" cssStyle="width:auto;"/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="user.comment"/>:</td>
					<td class="value"><s:textfield name="e.detail.comment"/></td>
					<td class="label"><s:text name="label.status"/>:</td>
					<td class="value"><s:radio name="e.status" list="#{'1':'启用','0':'禁用','2':'已删除'}" 
						value="e.phone" cssStyle="width:auto;"/></td>
				</tr>
			</tbody>
		</table>
		<table class="userFormTable ui-widget-content" cellspacing="0" cellpadding="2">
			<tbody>
				<tr>
					<td class="ownedGroups">
						<label><s:text name="user.ownedGroups"/>:</label>
						<s:select list="ownedGroups" listKey="id" listValue="name" 
							multiple="true" size="10" id="ownedGroups" name="ownedGroups">
						</s:select>
					</td>
					<td class="leftRightBtns">
						<input type="button" id="right2left" value="<-"/>
						<input type="button" id="left2right" value="->"/>
						<input type="button" id="rightAll2left" value="<<--"/>
						<input type="button" id="leftAll2right" value="-->>"/>
					</td>
					<td class="standbyGroups">
						<label><s:text name="user.standbyGroups"/>:</label>
						<s:select list="standbyGroups" listKey="id" listValue="name" 
							multiple="true" size="10" id="standbyGroups" name="standbyGroups">
						</s:select>
					</td>
					<td class="userPortrait">
						<input type="button" id="upPortrait" value="<s:text name="user.portrait"/>"/><br/>
						<img src='<s:url value="/bc/libs/themes/default/images/help.png" />' align="middle" 
							width="64" height="64"/>
					</td>
				</tr>
			</tbody>
		</table>
		<s:hidden name="e.type"/>
		<s:hidden name="e.status" />
		<s:hidden name="e.inner" />
		<s:hidden name="e.uid" />
		<s:hidden name="e.id" />
		<s:hidden name="e.detail.id" />
		<s:hidden name="belong.id" />
	</s:form>
</div>