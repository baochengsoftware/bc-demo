/** 主页上的一些调试代码，只在app.debug=true情况下调用 */
jQuery(function() {
	// alert("app.debug=true");

	$("#openDlg1").click(function() {
		$.ajax({
			dataType: "html",type: "POST",
			url : contextPath + "bc/example/list",
			success: function(result){
				var config = $(result);
				config.appendTo("body");
				config = eval("("+config.attr("data-cfg")+")");
				if(config.jses){
					//加载指定的js文件
				}
				if(config.csses){
					//加载指定的css文件
				}
				$("#info").html(result);
			},
			error: function(){
				alert("error");
			}
		});
		return false;
	});
});

var f="/bc/index.js/index.js?v=1";
//alert(t);
//alert(t+"|"+t.index+"|"+t.lastIndex+"|"+t.input);
var t=f.replace(/.+\/|.+\.|\?.+/gi,"");
$("#bcdebug").prepend(t + "<br/>");
var t = f.match(/\.(js|css)\?{0,1}.+$/i);
$("#bcdebug").prepend(t + "<br/>");
