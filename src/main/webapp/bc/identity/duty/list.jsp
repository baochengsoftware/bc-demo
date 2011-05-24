<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-content" title='<s:text name="duty.title"/>'
	data-type='list' data-action-delete='<s:url value="/bc/duty/delete" />'
	data-action-edit='<s:url value="/bc/duty/edit" />'
	data-action-create='<s:url value="/bc/duty/create" />'
	data-option='{
		"buttons":[
			{"text":"<s:text name="label.delete"/>","action":"delete"},
			{"text":"<s:text name="label.edit"/>","action":"edit"},
			{"text":"<s:text name="label.create"/>","action":"create"}
		],"minWidth":350,"width":500,"minHeight":200,"height":400,"modal":false
	}'>
	<div class="ui-widget-content bc-toolbar">
		<button
			class="bc-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary {}"
			data-action="create">
			<span class="ui-button-icon-primary ui-icon ui-icon-locked"></span><span
				class="ui-button-text">新建</span>
		</button>
		<button
			class="bc-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {}"
			data-action="edit">
			<span class="ui-button-text">编辑</span>
		</button>
		<span class="bc-separatorButton ui-icon ui-icon-grip-dotted-vertical"></span>
		<button
			class="bc-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary {}"
			data-action="delete">
			<span class="ui-button-icon-primary ui-icon ui-icon-unlocked"></span><span
				class="ui-button-text">删除</span>
		</button>
		<span class="bc-searchButton"><a href="#"
			class="ui-icon ui-icon-search"></a><input type="text">
		</span>
	</div>
	<div class="ui-widget-content bc-grid multipleSelect" name="单位" data-dblclickrow="bc.page.edit">
		<div class="ui-state-default header">
			<div class="left">
				<table class="table" cellspacing="0" cellpadding="0">
					<tbody>
						<tr class='ui-state-default row'>
							<td class="id"><span class="ui-icon ui-icon-info"></span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="right">
				<table class="table" cellspacing="0" cellpadding="0">
					<tbody>
						<tr class='ui-state-default row'>
							<td class="first" style="width: 60px"><s:text name="duty.code" />
							</td>
							<td class="middle" style="width: 60px"><s:text name="duty.code" />
							</td>
							<td class="last" style="width: 100px"><s:text name="duty.name" /></td>
							<td class="empty">&nbsp;</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="data">
			<div class="left">
				<table class="table" cellspacing="0" cellpadding="0">
					<tbody>
						<s:iterator value="bs" status="stuts">
							<tr
								class='ui-state-default row <s:if test="#stuts.odd == true">odd</s:if>'>
								<td class="id" data-id='<s:property value="id" />'
									data-name='<s:text name="duty" /> - <s:property value="name" />'><span
									class="ui-icon"></span>
								<s:property value="#stuts.index+1" />
								</td>
							</tr>
						</s:iterator>
					</tbody>
				</table>
			</div>
			<div class="right">
				<table class="table" cellspacing="0" cellpadding="0">
					<tbody>
						<s:iterator value="bs" status="stuts">
							<tr
								class='ui-state-default row <s:if test="#stuts.odd == true">odd</s:if>'>
								<td class="first" style="width: 60px"><s:property value="code" />
								</td>
								<td class="middle" style="width: 60px"><s:property value="code" />
								</td>
								<td class="last" style="width: 100px"><s:property value="name" />
								</td>
								<td class="empty">&nbsp;</td>
							</tr>
						</s:iterator>
					</tbody>
				</table>
			</div>
			<div class="pager">pager</div>
		</div>
	</div>
</div>