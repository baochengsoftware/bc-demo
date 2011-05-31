<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="module.title"/>' data-type='form'
	data-saveUrl='<s:url value="/bc/module/save" />'
	data-js='<s:url value="/bc/security/module/form.js" />,<s:url value="/bc/identity/identity.js" />'
	data-initMethod='bc.moduleForm.init'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"width":310,"minWidth":300,"minHeight":300,"modal":false
	}'>
	<s:form name="moduleForm" theme="simple">
		<table class="formTable" cellspacing="2">
			<tbody>
				<tr>
					<td class="label">* <s:text name="module.belong"/>:</td>
					<td class="value"><s:textfield name="e.belong.name" data-validate="required" 
					cssStyle="float:left;width:14em;" readonly="true"/><span id="selectBelong" class="clickToSelect ui-icon ui-icon-search" 
					title='<s:text name="title.select"/>'></span></td>
				</tr>
				<tr>
					<td class="label"><s:text name="module.type"/>:</td>
					<td class="value"><s:radio name="e.type" list="#{'1':'模块','2':'内部链接','3':'外部链接'}" 
						value="e.type" cssStyle="width:auto;"/></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="label.name"/>:</td>
					<td class="value"><s:textfield name="e.name" data-validate="required"/></td>
				</tr>
				<tr id="urlRow">
					<td class="label">* <s:text name="module.url"/>:</td>
					<td class="value"><s:textfield name="e.url"/></td>
				</tr>
				<tr>
					<td class="label">* <s:text name="label.order"/>:</td>
					<td class="value"><s:textfield name="e.code" data-validate="required"/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="module.iconClass"/>:</td>
					<td class="value"><s:textfield name="e.iconClass"/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="module.option"/>:</td>
					<td class="value"><s:textfield name="e.option"/></td>
				</tr>
			</tbody>
		</table>
		<s:hidden name="e.status" />
		<s:hidden name="e.inner" />
		<s:hidden name="e.uid" />
		<s:hidden name="e.id" />
		<s:hidden name="e.belong.id" />
	</s:form>
</div>