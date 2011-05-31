<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="group.title"/>' data-type='form'
	data-saveUrl='<s:url value="/bc/group/save" />'
	data-js='<s:url value="/bc/identity/group/form.js" />,<s:url value="/bc/identity/identity.js" />'
	data-initMethod='bc.groupForm.init'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"minWidth":270,"minHeight":250,"modal":false
	}'>
	<s:form name="groupForm" theme="simple">
		<table class="formTable" cellspacing="2">
			<tbody>
				<tr>
					<td class="label">* <s:text name="group.belong"/>:</td>
					<td class="value"><s:textfield name="belong.name" data-validate="required"
					cssStyle="float:left;width:14em;" readonly="true"/><span id="selectBelong" class="clickToSelect ui-icon ui-icon-search" 
					title='<s:text name="title.select"/>'></span></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="label.name"/>:</td>
					<td class="value"><s:textfield name="e.name" data-validate="required"/></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="label.code"/>:</td>
					<td class="value"><s:textfield name="e.code" data-validate="required"/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.phone"/>:</td>
					<td class="value"><s:textfield name="e.phone" data-validate='{"type":"phone","required":false}'/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.email"/>:</td>
					<td class="value"><s:textfield name="e.email" data-validate='{"type":"email","required":false}'/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.order"/>:</td>
					<td class="value"><s:textfield name="e.order"/></td>
				</tr>
			</tbody>
		</table>
		<s:hidden name="e.type"/>
		<s:hidden name="e.status" />
		<s:hidden name="e.inner" />
		<s:hidden name="e.uid" />
		<s:hidden name="e.id" />
		<s:hidden name="belong.id" />
	</s:form>
</div>