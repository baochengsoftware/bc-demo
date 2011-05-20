<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-content" title='<s:text name="unit.title.select"/>'
	data-type='dialog'
	data-initMethod='bc_unit_select_init'
	data-js='<s:url value="/bc/identity/unit/select.js" />'
	data-option='{
		"buttons":[{"text":"<s:text name="label.ok"/>","click":"bc.unit.select.ok"}],
		"minWidth":200,"minHeight":250,"height":400,"modal":true
	}'>
	<table class="selectUnit" cellspacing="0">
		<thead class="ui-widget-header">
			<tr class='row'>
				<td class="first id"><span class="ui-icon ui-icon-info"></span>
				</td>
				<td class="middle"><s:text name="unit.name" />
				</td>
				<td class="middle" style="width:80px"><s:text name="unit.phone" />
				</td>
				<td class="last" style="width:80px"><s:text name="unit.email" />
				</td>
			</tr>
		</thead>
		<tbody>
			<s:iterator value="entities" status="stuts">
				<tr class='ui-state-default row <s:if test="#stuts.odd == true"> odd</s:if>'>
					<td class="first id" data-id='<s:property value="id" />'><span class="ui-icon"></span><s:property value="#stuts.index+1" /></td>
					<td class="middle"><s:property value="name" /></td>
					<td class="middle"><s:property value="phone" /></td>
					<td class="last"><s:property value="email" /></td>
				</tr>
			</s:iterator>
		</tbody>
	</table>
</div>