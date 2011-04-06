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
	href="<s:url value='/bc/common/base.css' />" />
<style type="text/css">
</style>
<noscript>
	<strong>请先开启浏览器的Script功能！</strong>
</noscript>
</head>
<body>
	<h1>${msg} (debug=<s:text name="app.debug" />)
	</h1>

	<a id="openDlg1" href="#">Open Dialog</a>

	<div id="info" style="border: 1px solid black;">info</div>
	<script type="text/javascript"
		src="<s:url value='/ui-libs/nbl/2.0/nbl.plus.min.js' />"></script>
	<script type="text/javascript">
		var contextPath = '<s:url value="/"/>';
		var config=["<s:url value='/ui-libs/jquery/1.5.1/jquery.min.js' />"
			       ,"<s:url value='/ui-libs/jquery-ui/1.8.11/jquery-ui.min.js' />"
			       ,"<s:url value='/ui-libs/jquery-ui/1.8.11/i18n/jquery-ui-i18n.js' />"
			       ,"<s:url value='/bc/index/index.js' />"];
		<s:if test='{getText("app.debug") == "true"}'>
		config.push("<s:url value='/bc/index/debug.js' />");
		</s:if>
		config.push(function(){alert('test');});
		nbl.l(config);
	</script>
</body>
</html>