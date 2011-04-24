/**
 * desktop桌面
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-04-11
 * @ref ext桌面 http://dev.sencha.com/deploy/ext-4.0-beta1/examples/sandbox/sandbox.html,http://web2.qq.com/
 * @ref jquery桌面 http://desktop.sonspring.com/
 */

if (!window['bc'])
	window['bc'] = {};
bc.desktop = {
	/**桌面布局的初始化*/
	init : function(option) {
		// 执行桌面布局
		bc.desktop.doResize();
		$(window).resize(function() {
			bc.desktop.doResize();
		});
		
		//对ie，所有没有定义href属性的a，自动设置该属性为"#"，避免css中的:hover等没有效果
		if($.browser.msie){
			$("a[href=''],a:not([href])").each(function(){
				this.setAttribute("href","");
			});
		}

		// 双击打开桌面快捷方式
		var shortcuts = $("#desktop > a.shortcut");
		shortcuts.live("dblclick",bc.desktop.openModule);
		
		// 禁用桌面快捷方式的默认链接打开功能
		shortcuts.live("click",function(){logger.debug("a:click");return false;});

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
		
		//允许图标拖动
		$("a.shortcut").draggable({containment: '#desktop',grid: [20, 20]});
		//$("#shortcuts" ).selectable();
	},
	/**重新调整桌面的布局*/
	doResize : function() {
		$("#desktop").height($("#layout").height() - $("#quickbar").height())
	},
	/**双击打开桌面快捷方式*/
	openModule: function(option) {
		$this = $(this);
		var type = $this.attr("data-type");
		if(logger.debugEnabled)
			logger.debug("a:dblclick,type=" + type);
		if(type == "2"){//打开内部链接
			var url = $this.attr("data-url");
			logger.info("loading html from url:" + url);
			$.ajax({
				url : url,
				dataType : "text",
				context : this,
				success : function(html) {
					logger.info("success loaded html");
					var $dom = $(html);
					function _init(){
						//从dom构建并显示桌面组件
						var option = eval("("+$dom.attr("data-option")+")");
						option = option || {};
						option.modal=true;
						$dom.dialog(option)
						.bind("dialogclose",function(event,ui){
							logger.debug("dialogclose");
							$(this).dialog("destroy").remove();
						});
						
						//执行组件指定的额外初始化方法，上下文为$dom
						var method = $dom.attr("data-initMethod");
						logger.debug("initMethod="+method);
						if(method){
							method = bc.getNested(method);
							logger.debug("initMethodType=" + (typeof method));
							if(typeof method == "function"){
								method.call($dom, option);
							}
						}
					}
					//alert(html);
					var dataJs = $dom.attr("data-js");
					if(dataJs){
						//先加载js文件后执行模块指定的初始化方法
						bc.load([dataJs,_init]);
					}else{
						//执行模块指定的初始化方法
						_init();
					}
					
					
				},
				error : function(request, textStatus, errorThrown) {
					logger.debug("desktop: textStatus=" + textStatus + ";errorThrown=" + errorThrown);
				}
			});
		}
	},
	widget: function(){
		var $dom = this;
	}
};
jQuery(function($) {
	bc.desktop.init();
});