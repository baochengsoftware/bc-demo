<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="userForm_${user.id}" title='<s:text name="user.form.title"/>' 
	data-js='<s:url value="/bc/identity/user/form.js" />'
	data-css='<s:url value="/bc/identity/user/form.css" />'
	data-method='userForm.init' data-option='{mid:"user01",closeOnEscape: false,modal:true,minWidth:400}'>
	<s:form>
		<s:textfield key="user.firstName" />
		<s:textfield key="user.lastName" />
		<s:textfield key="user.email" />
		<s:textfield key="user.phone" />
		<s:textfield key="user.id" readonly="true"/>
		<s:textfield key="user.type" readonly="true" />
	</s:form>
</div>