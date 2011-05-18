<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="personal.title"/>' style="font-size: 16px;"
	data-type='form'
	data-js='<s:url value="/bc/desktop/personal/form.js" />'
	data-action='<s:url value="/bc/personal/save" />'
	data-initMethod='bc.personal.init'
	data-option='{
		"buttons":[{"text":"<s:text name="label.save"/>","action":"save"}],
		"minWidth":400,"minHeight":250,"modal":false
	}'>
	<s:form name="personalForm" cssStyle="text-align:left;">
		<div style="margin:10px;">
			<div style="margin-bottom:8px;float: left;"><s:text name="personal.font"/>：</div>
			<div id="fontSlider" data-value='<s:property value="entity.font" />' style="float: left;width:150px;margin:4px 15px 0 10px;"></div>
			<div style="float: left;"><span id="fontSize"><s:property value="entity.font" /></span></div>
		</div>
		<div style="margin:10px;clear:both;">
			<div><s:text name="personal.theme"/>：</div>
			<div id="themes"></div>
		</div>

		<s:hidden name="entity.id" />
		<s:hidden name="entity.status" />
		<s:hidden name="entity.inner" />
		<s:hidden name="entity.font" />
		<s:hidden name="entity.theme" />
		<s:hidden name="entity.actor.id"/>
	</s:form>
</div>