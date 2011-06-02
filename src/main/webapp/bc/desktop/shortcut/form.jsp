<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="shortcut.form..title"/>' class='bc-page'
	data-js='<s:url value="/bc/desktop/shortcut/form.js" />'
	data-saveUrl='<s:url value="/bc/shortcut/save" />'
	data-initMethod='bc.shortcutForm.init' data-type='form'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"width":310,"minWidth":300,"minHeight":200
	}'>
<s:form name="shortcutForm" theme="simple" cssClass="bc-form">
	<table class="formTable" cellspacing="2">
		<tbody>
			<tr>
				<td class="label">* <s:text name="shortcut.name" />:</td>
				<td class="value"><s:textfield name="e.name" data-validate="required"/></td>
			</tr>
			<tr>
				<td class="label">* <s:text name="shortcut.url" />:</td>
				<td class="value"><s:textfield name="e.url" data-validate="required"/></td>
			</tr>
			<tr>
				<td class="label">* <s:text name="shortcut.iconClass" />:</td>
				<td class="value"><s:textfield name="e.iconClass"
					data-validate="required" cssStyle="float:left;width:14em;"
					readonly="true" /><span id="selectIconClass"
					class="clickToSelect ui-icon ui-icon-search"
					title='<s:text name="title.select"/>'></span></td>
			</tr>
			<tr>
				<td class="label"><s:text name="shortcut.standalone" />:</td>
				<td class="value"><s:radio name="e.standalone"
					list="#{'true':'在新浏览器窗口打开','false':'内部链接'}" value="e.standalone"
					cssStyle="width:auto;" /></td>
			</tr>
			<tr>
				<td class="label">* <s:text name="label.order" />:</td>
				<td class="value"><s:textfield name="e.order" data-validate="required"/></td>
			</tr>
			<tr>
				<td class="label">&nbsp;</td>
				<td class="value">&nbsp;</td>
			</tr>
		</tbody>
	</table>
	<s:hidden name="e.status" />
	<s:hidden name="e.inner" />
	<s:hidden name="e.uid" />
	<s:hidden name="e.id" />
	<s:hidden name="e.actor.id" />
</s:form></div>