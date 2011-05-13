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
		
		//开始菜单
		var positionOpts = jQuery.extend({
			posX: 'left', 
			posY: 'bottom',
			offsetX: 0,
			offsetY: 0,
			directionH: 'right',
			directionV: 'down', 
			detectH: true, // do horizontal collision detection  
			detectV: true, // do vertical collision detection
			linkToFront: false
		},{directionH: 'left'});
		$('#quickStart').menu({ 
			content: $('#quickStartMenu').html(), 
			flyOut: true,
			positionOpts:positionOpts,
			clickMenuItem:function(name, href){
				logger.info("click:" + $(this).text() + ";name=" + name + ";href=" + href);
			}
		});
		
		//对ie，所有没有定义href属性的a，自动设置该属性为"#"，避免css中的:hover等没有效果
		if(true || $.browser.msie){
			$("a[href=''],a:not([href])").each(function(){
				this.setAttribute("href","#");
			});
		}

		// 双击打开桌面快捷方式
		var shortcuts = $("#desktop > a.shortcut");
		shortcuts.live("dblclick",bc.desktop.openModule);
		
		// 禁用桌面快捷方式的默认链接打开功能
		shortcuts.live("click",function(){logger.debug("a:click");return false;});
		
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
		var option = $this.attr("data-option");
		if(!option || option.length == 0) option="{}";
		option = eval("("+option+")");
		option.mid=$this.attr("data-mid");
		option.iconClass=$this.attr("data-iconClass");
		option.name=$this.attr("data-name");
		option.order=$this.attr("data-order");
		option.type=$this.attr("data-type");
		option.url=$this.attr("data-url");
		option.standalone=$this.attr("data-standalone")=="true";
		if(logger.debugEnabled)
			logger.debug("a:dblclick,type=" + type);
		bc.page.newWin(option);
		//if(type == "2"){//打开内部链接
		//}
	}
};
jQuery(function($) {
	bc.desktop.init();
	
	//字体设置:初始化为14px=0.87em(浏览器默认为1em=16px)
	var curSize = $("body").css("fontSize");
	curSize= parseInt(curSize.replace("px","")) || 16;
	$("#fontSize").html(curSize+"");
	//$("body").css("fontSize", 14/16 + 'em');
	$( "#fontSlider" ).slider({
		value:curSize,min: 12,max: 20,step: 2,
		slide: function( event, ui ) {
			$("#fontSize").html(ui.value);
			$("body").css("fontSize",ui.value + 'px');
			logger.info(ui.value);
		}
	});
	
	//主题设置
	$('#themeSwitcher').themeswitcher({closeOnSelect:false,height:340,root:bc.root});
	
	//显示设置
	//$("#setting").show();
});