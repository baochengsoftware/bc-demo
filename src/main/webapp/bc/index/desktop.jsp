<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title><s:text name="app.title" />
</title>
<link rel="stylesheet" type="text/css"
	href="<s:url value='/ui-libs/jquery-ui/1.8.11/themes/smoothness/jquery-ui.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/core.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/desktop.css' />" />
<link rel="stylesheet" type="text/css"
	href="<s:url value='/bc/libs/themes/default/shortcuts.css' />" />
<style type="text/css">
.toggler { width: 500px; height: 200px; position: relative; }
#m01 { width: 240px; height: 135px; padding: 0.4em; position: relative; }
#m01 h3 { margin: 0; padding: 0.4em; text-align: center; }
.ui-effects-transfer { border: 2px dotted gray; } 
</style>
</head>
<body>
	<noscript>
		<div>请设置浏览器开启 JavaScript功能，然后重试。</div>
	</noscript>
	<div id="loader">正在加载......</div>
	<div id="layout">
		<div id="desktop">
			<a id="poweredBy" href="http://www.google.com.hk" target="_blank"><span></span></a>
			<dl id="shortcuts">
	            <dt class="shortcut" id="shortcut-m01" data-mid="m01" data-url="/user/edit">
	                <a href="#">
		                <span class="icon m01"></span>
		                <span class="subject">组织管理</span>
	                </a>
	            </dt>
	            <dt class="shortcut" id="shortcut-m02" data-mid="m02">
	                <a href="#">
	                	<span class="icon m02"></span>
	                	<span class="subject">联系沟通</span>
	                </a>
	            </dt>
	            <dt class="shortcut" id="shortcut-m03" data-mid="m03">
	                <a href="#">
	                	<span class="icon m03"></span>
	                	<span class="subject">动态报表</span>
	                </a>
	            </dt>
	        </dl>
		</div>
		<div id="quickbar">
			<div id="quickStart">开始</div>
			<ul id="quickButtons">
				<li id="quickButton-m01" class="quickButton ui-state-default ui-corner-all" data-mid="m01"><a href="#">组织管理</a>
				</li>
				<li id="quickButton-m02" class="quickButton ui-state-default ui-corner-all" data-mid="m02"><a href="#">联系沟通</a>
				</li>
				<li id="quickButton-m03" class="quickButton ui-state-default ui-corner-all" data-mid="m03"><a href="#">动态报表</a>
				</li>
			</ul>
		</div>
	</div>
	
	<s:if test='{getText("app.debug") == "true"}'>
		<div id="heavyControl">
		<h1>重型控件测试</h1>
		<form>
			<p><input value="普通文本" style="width:90%;"/></p>
			<p><input type="checkbox"/>多选框1<input type="checkbox"/>多选框2</p>
			<p><input type="radio" name="radio"/>单选框1<input type="radio" name="radio"/>单选框2</p>
			<p><select>
				<option>选择1</option>
				<option>选择2</option>
				<option>选择选择选择选择3</option>
			</select></p>
			<p><textarea style="width:90%;">多行文本框</textarea></p>
		</form>
		</div>
	</s:if>

	<script type="text/javascript"
		src="<s:url value='/ui-libs/jquery/1.5.1/jquery.min.js' />"></script>
	<script type="text/javascript"
		src="<s:url value='/ui-libs/jquery-ui/1.8.11/i18n/jquery-ui-i18n.js' />"></script>
	<script type="text/javascript"
		src="<s:url value='/ui-libs/jquery-ui/1.8.11/jquery-ui.min.js' />"></script>
	<script type="text/javascript" src="<s:url value='/bc/libs/core.js' />"></script>
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
		if(bc.debug){
			jQuery(function(){
				logger.toggle();
				logger.enable("debug");
			});
		}
	</script>
</body>
</html>