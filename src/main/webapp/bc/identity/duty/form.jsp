<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-content" title='<s:text name="duty.title"/>'
	data-type='form'
	data-action='<s:url value="/bc/duty/save" />'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"minWidth":400,"minHeight":250,"modal":false
	}'>
	<div class="bc-toolbar ui-widget-content">
		<button
			class="bc-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary {}"
			data-action="save">
			<span class="ui-button-icon-primary ui-icon ui-icon-locked"></span><span
				class="ui-button-text">保存</span>
		</button>
	</div>
	<s:form name="dutyForm" theme="simple">
		<table class="formTable" cellspacing="2">
			<tbody>
				<tr>
					<td class="label"><s:text name="duty.name"/>:</td>
					<td class="value"><s:textfield name="e.name" data-validate="required"/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="duty.code"/>:</td>
					<td class="value"><s:textfield name="e.code" data-validate="required"/></td>
				</tr>
			</tbody>
		</table>
		<s:hidden name="e.status" />
		<s:hidden name="e.inner" />
		<s:hidden name="e.id" />
	</s:form>
</div>