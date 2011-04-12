/**
 * desktop桌面
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-04-11
 * @ref http://dev.sencha.com/deploy/ext-4.0-beta1/examples/sandbox/sandbox.html,http://web2.qq.com/
 */

if (!window['bc'])
	window['bc'] = {};
bc.desktop = {
	init : function() {
		// 执行桌面布局
		bc.desktop.doResize();
		$(window).resize(function() {
			bc.desktop.doResize();
		});

		// 桌面快捷方式处理
		$("#shortcuts > .shortcut > a").live(
				"click",
				function() {
					$this = $(this);
					var murl = $this.parent().attr("data-url");
					logger.info(murl);
					$.ajax({
						url : murl,
						dataType : "text",
						context : this,
						success : function(data) {
							var $dom = $(data);
							var dataJs = $dom.attr("data-js");
							if(dataJs){
								bc.load([dataJs,function(){
									logger.debug("loaded "+ dataJs);
									var method = $dom.attr("data-method");
									logger.info("method="+method);
									if(method){
										method = bc.getNested(method);
										logger.info("method type=" + (typeof method));
										if(typeof method == "function"){
											method.call($dom,eval("("+$dom.attr("data-option")+")"));
										}
									}
								}]);
							}
						},
						error : function(request, textStatus, errorThrown) {
							logger.error("textStatus=" + textStatus
									+ ";errorThrown=" + errorThrown);
						}
					});

					/*
					 * var mid=$this.attr("data-mid");//模块的标识 if(!$("#" +
					 * mid).length) $("body").append("<div id='" + mid + "'
					 * class='hide'></div>");//没有就先创建隐藏元素
					 * 
					 * var $m = $("#" + mid); var mcfg =
					 * $this.attr("data-cfg");//模块的配置参数 if(mcfg && mcfg.length)
					 * mcfg=eval("(" + $this.attr("data-cfg") + ")"); else
					 * mcfg={};
					 * 
					 * if(!mcfg.type || mcfg.type=="dialog"){//默认为创建对话框
					 * logger.info("create a dialog"); $m.dialog(); }else{ }
					 */

					return false;
				});

		// 快速工具条中条目的鼠标控制
		$("#quickButtons .quickButton").live(
				"click",
				function() {
					$this = $(this);
					var mid = $this.attr("data-mid");
					if ($this.hasClass("ui-state-active")) {
						$this.removeClass("ui-state-active");
						var options = {
							to : "#quickButton_" + mid
						};
						$("#m01").effect("transfer", options, 1000, function() {
							logger.info("transfer");
							$("#" + mid).hide();
						});
					} else {
						$this.addClass("ui-state-active");
						var options = {
							to : "#" + mid
						};
						$("#quickButton_" + mid).effect("transfer", options,
								1000, function() {
									logger.info("transfer");
									$("#" + mid).show();
								});
					}
					// $this.toggleClass("ui-state-active")
					return false;
				}).live("mouseover", function() {
			$(this).addClass("ui-state-hover")
		}).live("mouseout", function() {
			$(this).removeClass("ui-state-hover")
		});
	},
	doResize : function() {
		$("#desktop").height($("#layout").height() - $("#quickbar").height())
	}
};
jQuery(function($) {
	bc.desktop.init();
	logger.toggle();
	logger.info("loaded desktop.js");
	logger.info(!$("#ttttt").length);
});