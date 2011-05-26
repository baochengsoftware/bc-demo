<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div title='<s:text name="duty.title"/>' data-name='<s:text name="duty"/>' 
	class="bc-page"
	data-type='list' 
	data-deleteUrl='<s:url value="/bc/duty/delete" />'
	data-editUrl='<s:url value="/bc/duty/edit" />'
	data-createUrl='<s:url value="/bc/duty/create" />'
	data-option='{"minWidth":250,"width":500,"minHeight":200,"height":400,"modal":false}'>
	<div class="bc-toolbar ui-widget-content">
		<button
			class='bc-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary 
				{action:"create",callback:"callback4create"}'
			data-action="create">
			<span class="ui-button-icon-primary ui-icon ui-icon-document"></span><span
				class="ui-button-text">新建</span>
		</button>
		<button
			class='bc-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary 
				{action:"edit",callback:"callback4edit"}'
			data-action="edit">
			<span class="ui-button-icon-primary ui-icon ui-icon-pencil"></span>
			<span class="ui-button-text">编辑</span>
		</button>
		<button
			class='bc-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary
				{action:"delete"}'
			data-action="delete">
			<span class="ui-button-icon-primary ui-icon ui-icon-trash"></span><span
				class="ui-button-text">删除</span>
		</button>
		<span class="bc-searchButton"><a href="#"
			class="ui-icon ui-icon-search"></a><input type="text">
		</span>
	</div>
	<div class="bc-grid multipleSelect" name="单位" data-dblclickrow="bc.page.edit">
		<div class="ui-state-default header">
			<div class="left">
				<table class="table" cellspacing="0" cellpadding="0">
					<tbody>
						<tr class='ui-state-default row'>
							<td class="id" title='<s:text name="title.toggleSelect"/>'><span class="ui-icon ui-icon-notice"></span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="right">
				<table class="table" cellspacing="0" cellpadding="0" style="width:300px;">
					<tbody>
						<tr class='ui-state-default row'>
							<td class="first sortable" style="width: 60px">
								<div class="wrapper"><s:text name="duty.code" />
								<span class="sortableIcon ui-icon ui-icon-triangle-1-n"></span></div>
							</td>
							<td class="middle" style="width: 60px"><div class="wrapper"><s:text name="duty.code" /></div>
							</td>
							<td class="last sortable" style="width: 100px"><div class="wrapper"><s:text name="duty.name" />
								<span class="sortableIcon ui-icon hide"></span></div>
							</td>
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
						<s:iterator value="es" status="stuts">
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
				<table class="table" cellspacing="0" cellpadding="0" style="width:300px;">
					<tbody>
						<s:iterator value="es" status="stuts">
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
		</div>
		<ul class="pager ui-widget-content ui-widget ui-helper-clearfix">
			<li id="seek" class="pagerIconGroup seek ui-state-default ui-corner-all">
				<a id="toFirstPage" class="pagerIcon ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-first" title="首页"></span></a>
				<a id="toprevPage" class="pagerIcon ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-prev" title="上一页"></span></a>
				<span id="pageNo" class="pageNo" title="点击选择页码">1/3</span>
				<a id="toNextPage" class="pagerIcon ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-next" title="下一页"></span></a>
				<a id="toLastPage" class="pagerIcon ui-state-default ui-corner-all"><span class="ui-icon ui-icon-seek-end" title="尾页"></span></a>
			</li>
			<li id="size" class="pagerIconGroup size ui-state-default ui-corner-all" title="每页显示的数量">
				<a class="pagerIcon ui-state-default ui-state-active ui-corner-all"><span class="pageSize">25</span></a>
				<a class="pagerIcon ui-state-default ui-corner-all"><span class="pageSize">50</span></a>
				<a class="pagerIcon ui-state-default ui-corner-all"><span class="pageSize">100</span></a>
			</li>
			<li id="export" class='pagerIcon ui-state-default ui-corner-all {action:"export"}' title="导出"><span class="ui-icon ui-icon-transferthick-e-w"></span></li>
			<li id="print" class='pagerIcon ui-state-default ui-corner-all {action:"print"}' title="打印"><span class="ui-icon ui-icon-print"></span></li>
		</ul>
	</div>
</div>