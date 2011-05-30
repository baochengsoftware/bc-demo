<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="department.title"/>' data-type='form'
	data-action='<s:url value="/bc/department/save" />'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"minWidth":270,"minHeight":250,"modal":false
	}'>
	<s:form name="departmentForm" theme="simple">
		<table class="formTable" cellspacing="2">
			<tbody>
				<tr>
					<td class="label"><s:text name="unit.belong"/>:</td>
					<td class="value"><s:textfield name="belong.name" cssClass='{"field":"belong.id","required":false}' 
					cssStyle="float:left;width:14em;"/><span id="selectUnit" class="clickToSelect ui-icon ui-icon-search" 
					title='<s:text name="title.select"/>'></span></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.name"/>:</td>
					<td class="value"><s:textfield name="entity.name" data-validate="required"/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.code"/>:</td>
					<td class="value"><s:textfield name="entity.code" data-validate="required"/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.phone"/>:</td>
					<td class="value"><s:textfield name="entity.phone" data-validate='{"type":"phone","required":false}'/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.email"/>:</td>
					<td class="value"><s:textfield name="entity.email" data-validate='{"type":"email","required":false}'/></td>
				</tr>
				<tr>
					<td class="label"><s:text name="label.order"/>:</td>
					<td class="value"><s:textfield name="entity.order"/></td>
				</tr>
			</tbody>
		</table>
		<s:hidden name="entity.type"/>
		<s:hidden name="entity.status" />
		<s:hidden name="entity.inner" />
		<s:hidden name="entity.uid" />
		<s:hidden name="entity.id" />
		<s:hidden name="belong.id" />
	</s:form>
</div>