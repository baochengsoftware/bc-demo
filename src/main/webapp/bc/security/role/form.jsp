<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="role.title"/>' data-type='form'
	data-saveUrl='<s:url value="/bc/role/save" />'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"width":300,"minWidth":300,"minHeight":160,"modal":false
	}'>
	<s:form name="roleForm" theme="simple">
		<table class="formTable" cellspacing="2">
			<tbody>
				<tr>
					<td class="label">* <s:text name="label.name"/>:</td>
					<td class="value"><s:textfield name="e.name" data-validate="required"/></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="label.code"/>:</td>
					<td class="value"><s:textfield name="e.code" data-validate="required"/></td>
				</tr>
			</tbody>
		</table>
		<s:hidden name="e.status" />
		<s:hidden name="e.inner" />
		<s:hidden name="e.uid" />
		<s:hidden name="e.id" />
		<s:hidden name="e.type" />
	</s:form>
</div>