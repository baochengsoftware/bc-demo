<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-content" title='<s:text name="duty.title"/>'
	data-type='list'
	data-action-delete='<s:url value="/bc/duty/delete" />'
	data-action-edit='<s:url value="/bc/duty/edit" />'
	data-action-create='<s:url value="/bc/duty/create" />'
	data-option='{
		"buttons":[
			{"text":"<s:text name="label.delete"/>","action":"delete"},
			{"text":"<s:text name="label.edit"/>","action":"edit"},
			{"text":"<s:text name="label.create"/>","action":"create"}
		],
		"minWidth":500,"minHeight":250,"height":400,"modal":false
	}'>
	<table class="list" cellspacing="0">
		<thead class="ui-widget-header">
			<tr class='row'>
				<td class="first id"><span class="ui-icon ui-icon-info"></span>
				</td>
				<td class="middle" style="width:80px"><s:text name="duty.code" />
				</td>
				<td class="last"><s:text name="duty.name" />
				</td>
			</tr>
		</thead>
		<tbody>
			<s:iterator value="bs" status="stuts">
				<tr class='ui-state-default row <s:if test="#stuts.odd == true"> odd</s:if>'>
					<td class="first id" data-id='<s:property value="id" />' data-name='<s:text name="duty" /> - <s:property value="name" />'><span class="ui-icon"></span><s:property value="#stuts.index+1" /></td>
					<td class="middle"><s:property value="code" /></td>
					<td class="last"><s:property value="name" /></td>
				</tr>
			</s:iterator>
		</tbody>
	</table>
</div>