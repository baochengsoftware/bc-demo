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
			bc.page.newWin({url:$this.attr("data-url")});
		}
	}
};
jQuery(function($) {
	bc.desktop.init();
	
	//字体设置
	$("body").css("fontSize", 14/16 + 'em');
	$( "#fontSlider" ).slider({
		value:14,min: 12,max: 20,step: 2,
		slide: function( event, ui ) {
			$("#fontSize").html(ui.value);
			$("body").css("fontSize",ui.value / 16 + 'em');
			logger.info(ui.value);
		}
	});
	
	//主题设置
	$('#themeSwitcher').themeswitcher();
	
	//显示设置
	//$("#setting").show();
});