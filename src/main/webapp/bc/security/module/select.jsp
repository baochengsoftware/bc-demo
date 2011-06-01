<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-page" title='<s:text name="module.title.select"/>'
	data-type='dialog' data-initMethod='bc.selectModule.init'
	data-js='<s:url value="/bc/security/module/select.js" />'
	data-option='{
		"buttons":[{"text":"<s:text name="label.ok"/>","click":"bc.selectModule.clickOk"}],
		"width":200,"height":250,"modal":true
	}'>
	<s:select list="es" listKey="id" listValue="name" theme="simple"
		size="10" cssStyle="width:100%;height:100%;" value="selected"
		multiple="multiple"></s:select>
</div>