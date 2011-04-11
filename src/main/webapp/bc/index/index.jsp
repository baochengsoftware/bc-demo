<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
	<title><s:text name="app.title" /></title>
	<link rel="stylesheet" type="text/css" href="<s:url value='/ui-libs/jquery-ui/1.8.11/themes/smoothness/jquery-ui.css' />" />
	<link rel="stylesheet" type="text/css" href="<s:url value='/bc/common/base.css' />" />
	<style type="text/css"></style>
	<script type="text/javascript" src="<s:url value='/ui-libs/nbl/2.0/nbl.plus.js' />"></script>
</head>
<body>
	<div id="bcdebug">这里显示的是调试信息!<br/></div>
	<noscript>请先开启浏览器的Script功能！</noscript>
	<h1>${msg} (debug=<s:text name="app.debug" />)
	</h1>

	<div>
	<a id="openDlg1" href="#">Open Dialog</a>
	<button id="btnTest">Loader重复测试</button>
	</div>

	<script type="text/javascript" src="<s:url value='/ui-libs/jquery/1.5.1/jquery.min.js' />"></script>
	<script type="text/javascript" src="<s:url value='/ui-libs/jquery-ui/1.8.11/i18n/jquery-ui-i18n.js' />"></script>
	<script type="text/javascript" src="<s:url value='/ui-libs/jquery-ui/1.8.11/jquery-ui.min.js' />"></script>
	<script type="text/javascript" src="<s:url value='/bc/index/index.js' />"></script>
	<script type="text/javascript">
		var contextPath = '<s:url value="/"/>';
		<s:if test='{getText("app.debug") == "true"}'>
		nbl.l(["<s:url value='/bc/index/debug.js' />",function(){
			$("#bcdebug").prepend(new Date()+" debug.js加载完毕！<br/>");
		}]);
		</s:if>
		
		var i=1;
		$("#btnTest").click(function(){
			nbl.l(["<s:url value='/bc/common/base.css?v=2' />",function(){
				$("#bcdebug").prepend("Loader重复测试" + (i++) + "<br/>");
			}]);
		});
	</script>
</body>
</html>