<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-content" title='<s:text name="duty.list.title"/>'
	data-type='list'
	data-action-delete='<s:url value="/duty/delete" />'
	data-action-edit='<s:url value="/duty/edit" />'
	data-action-create='<s:url value="/duty/create" />'
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
				<td class="first id"><s:text name="label.id" />
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
					<td class="first id" data-id='<s:property value="id" />'><s:property value="#stuts.index" /></td>
					<td class="middle"><s:property value="code" /></td>
					<td class="last"><s:property value="name" /></td>
				</tr>
			</s:iterator>
			<tr class='empty' height="*">
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
</div>