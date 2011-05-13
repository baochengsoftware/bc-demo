<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<html>
<head>
<title><s:text name="app.title" /></title>
<link rel="stylesheet" type="text/css"
	href="<s:url value='/ui-libs/jquery-ui/1.8.11/themes/base/jquery.ui.all.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/core.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/desktop.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/shortcuts.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/list.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/boxPointer.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/ui-libs/jquery-ui/plugins/menu/3.0/fg.menu.css' />" />
<style type="text/css">
	.fg-button { clear:left; margin:0 4px 40px 20px; padding: .4em 1em; text-decoration:none !important; 
	cursor:pointer; position: absolute; text-align: center; zoom: 1;top: 50%; left: 50%;}
	.fg-button .ui-icon { position: absolute; top: 50%; margin-top: -8px; left: 50%; margin-left: -8px; }
	.fg-button-icon-right { padding-right: 2.1em; }
	.fg-button-icon-right .ui-icon { left: auto; right: .2em; margin-left: 0; }
</style>
</head>
<body class="ui-widget-content desktopBody">
	<noscript>
		<div>请设置浏览器开启 JavaScript功能，然后重试。</div>
	</noscript>
	<div id="loader">正在加载......</div>
	<div id="setting">
		<div id="fontSliderContainer">
			<div style="margin-bottom:8px;">字体：<span id="fontSize">14</span>px</div>
			<div id="fontSlider"></div>
		</div>
		<div id="themeSwitcherContainer">
			<div id="themeSwitcher"></div>
		</div>
	</div>
	<div id="layout">
		<div id="quickbar" class="ui-widget-header">
			<div id="quickStart">
				<a title="开始"></a>
			</div>
			<div id="quickButtons">
				<a id="quickButton-m01" class="quickButton ui-state-default ui-corner-all" data-mid="m01">组织管理</a>
			</div>
			<div id="quickShowHide" title="显示桌面">
				<a></a>
			</div>
		</div>
		<div id="desktop">
			<s:iterator value="shortcuts" status="stuts">
			<s:if test="module == null">
				<a class="shortcut" data-m="false"
					data-id='<s:property value="id" />'
					data-standalone='<s:property value="standalone" />'
					data-type='0' 
	 				data-mid='0'
					data-option='{}' 
					data-order='<s:property value="order" />'
					data-iconClass='<s:property value="iconClass" />'
					data-name='<s:property value="name" />'
					data-url='<s:property value="url" />'>
					<span class='icon <s:property value="iconClass" />'></span>
					<span class="text"><s:property value="name" /></span>
				</a>
            </s:if>
            <s:else>
				<a class="shortcut" data-m="true"
					data-id='<s:property value="id" />'
					data-standalone='<s:property value="standalone" />'
					data-type='<s:property value="module.type" />' 
	 				data-mid='<s:property value="module.id" />'
					data-option='<s:property value="module.option" />' 
					data-order='<s:property value="order" />'
					data-iconClass='<s:property value="module.iconClass" />'
					data-name='<s:property value="module.name" />'
					data-url='<s:property value="module.url" />'>
					<span class='icon <s:property value="module.iconClass" />'></span>
					<span class="text"><s:property value="module.name" /></span>
				</a>
            </s:else>
			</s:iterator>
			<!-- 
			<a class="shortcut" data-mid="m03"
				data-type="2" data-url="/bc/duty/list"> <span class="icon i0001"></span>
				<span class="text">职务配置</span> </a>
			<a class="shortcut" data-mid="m03"
				data-type="2" data-url="/bc/unit/list"> <span class="icon"></span>
				<span class="text">单位配置</span> </a>
			<a class="shortcut" data-mid="m03"
				data-type="2" data-url="/bc/department/list"> <span class="icon"></span>
				<span class="text">部门配置</span> </a>
			<a class="shortcut" data-mid="m02"
				data-type="2" data-url="/bc/user/list"> <span class="icon i0001"></span>
				<span class="text">用户配置</span> </a> 
			<a class="shortcut" data-mid="m01"
				data-type="2" data-url="/bc/module/list"> <span class="icon"></span> <span
				class="text">模块配置配置配置</span> </a> 
			<a id="flyout" tabindex="0" href="#" 
			class="fg-button fg-button-icon-right ui-widget ui-state-default ui-corner-all">
			<span class="ui-icon ui-icon-triangle-1-s"></span>flyout menu</a>
			 -->
		</div>
	</div>
	<div id="copyrightBar">
		<a href="http://www.bctaxi.com.cn" target="_blank">Copyright ©2011 广州市宝城汽车出租有限公司</a>
	</div>

	<s:if test='{getText("app.debug") == "true"}'>
		<div id="heavyControl" style="display: none">
			<h1>重型控件测试</h1>
			<form>
				<p>
					<input value="普通文本" style="width: 90%;" />
				</p>
				<p>
					<input type="checkbox" />多选框1<input type="checkbox" />多选框2
				</p>
				<p>
					<input type="radio" name="radio" />单选框1<input type="radio"
						name="radio" />单选框2
				</p>
				<p>
					<select>
						<option>选择1</option>
						<option>选择2</option>
						<option>选择选择选择选择3</option>
					</select>
				</p>
				<p>
					<textarea style="width: 90%;">多行文本框</textarea>
				</p>
			</form>
		</div>
	</s:if>

	<script type="text/javascript"
		src="<s:url value='/ui-libs/jquery/1.5.1/jquery.min.js' />"></script>
	<script type="text/javascript"
		src="<s:url value='/ui-libs/jquery-ui/1.8.11/i18n/jquery-ui-i18n.js' />"></script>
	<script type="text/javascript"
		src="<s:url value='/ui-libs/jquery-ui/1.8.11/jquery-ui.min.js' />"></script>
	<script type="text/javascript"
		src="<s:url value='/ui-libs/jquery-ui/plugins/menu/3.0/fg.menu.js' />"></script>
	<script type="text/javascript"
		src="<s:url value='/bc/libs/window.js' />"></script>
	<script type="text/javascript" src="<s:url value='/bc/libs/core.js' />"></script>
	<script type="text/javascript" src="<s:url value='/bc/libs/msg.js' />"></script>
	<script type="text/javascript" src="<s:url value='/bc/libs/page.js' />"></script>
	<script type="text/javascript" src="<s:url value='/bc/libs/boxPointer.js' />"></script>
	<script type="text/javascript"
		src="<s:url value='/bc/libs/loader.js' />"></script>
	<s:if test='{getText("app.debug") == "true"}'>
		<link rel="stylesheet" type="text/css"
			href="<s:url value='/bc/libs/themes/default/logger.css' />" />
		<script type="text/javascript"
			src="<s:url value='/bc/libs/logger.js' />"></script>
	</s:if>
	<s:else>
		<script type="text/javascript">
		if(!window['logger']){
			/** JavaScript日志组件的幻象，实际的见logger.js */
			window['logger'] = {
				debugEnabled:false,infoEnabled:false,warnEnabled:false,profileEnabled:false,
				clear:$.noop,debug:$.noop,info:$.noop,warn:$.noop,error:$.noop,
				profile:$.noop,enable:$.noop,disabled:$.noop,show:$.noop,test:true
			};
		}
		</script>
	</s:else>
	<script type="text/javascript"
		src="<s:url value='/bc/libs/desktop.js' />"></script>
	<script type="text/javascript">
		bc.root = "<%=request.getContextPath()%>";
		bc.debug = <s:text name="app.debug" />;
		if (bc.debug) {
			jQuery(function() {
				//logger.toggle();
				logger.enable("debug");
			});
		}
	</script>
	<script type="text/javascript" src="<s:url value='/ui-libs/jquery-ui/themeSwitcher/switcher.js' />"></script>
	<div id="quickStartMenu" class="hide" style="position:absolute; top:0; left:-9999px; width:1px; height:1px; overflow:hidden;">
		<s:property value="startMenu" />
	</div>
</body>
</html>