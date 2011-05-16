<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="unit.title"/>' data-type='form'
	data-action='<s:url value="/bc/unit/save" />'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"minWidth":270,"width":270,"minHeight":250,"modal":false
	}'>
	<s:form name="unitForm">
		<s:textfield name="entity.name" key="label.name" />
		<s:textfield name="entity.code" key="label.code" />
		<s:textfield name="entity.phone" key="label.phone" />
		<s:textfield name="entity.email" key="label.email" />
		<s:textfield name="entity.order" key="label.order" />

		<s:hidden name="entity.type" value="2"/>
		<s:hidden name="entity.status" />
		<s:hidden name="entity.inner" />
		<s:hidden name="entity.uid" />
		<s:hidden name="entity.id" />
	</s:form>
</div>