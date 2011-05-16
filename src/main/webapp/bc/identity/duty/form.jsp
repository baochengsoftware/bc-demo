<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="duty.form.title"/>'
	data-type='form'
	data-action='<s:url value="/bc/duty/save" />'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"minWidth":400,"minHeight":250,"modal":false
	}'>
	<s:form name="dutyForm">
		<s:textfield name="b.name" key="duty.name" data-validate="required"/>
		<s:textfield name="b.code" key="duty.code" data-validate="required" />
		
		<s:hidden name="b.status" />
		<s:hidden name="b.inner" />
		<s:hidden name="b.id" />
	</s:form>
</div>