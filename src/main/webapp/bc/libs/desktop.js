/**
 * desktop桌面
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-04-11
 * @ref http://dev.sencha.com/deploy/ext-4.0-beta1/examples/sandbox/sandbox.html,http://web2.qq.com/
 */

if(!window['bc'])window['bc']={};
bc.desktop={
	init:function(){
		//执行桌面布局
		bc.desktop.doResize();
		$(window).resize(function(){
			bc.desktop.doResize();
		});
		
		//快速工具条中条目的鼠标控制
		$("#quickButtons .quickButton").live("click", function(){
			$this = $(this);
			var mid=$this.attr("data-mid");
			if($this.hasClass("ui-state-active")){
				$this.removeClass("ui-state-active");
				var options = { to: "#quickButton_" + mid };
				$("#m01" ).effect("transfer", options, 1000, function(){
					logger.info("transfer");
					$("#" + mid).hide();
				});
			}else{
				$this.addClass("ui-state-active");
				var options = { to: "#" + mid };
				$("#quickButton_" + mid).effect("transfer", options, 1000, function(){
					logger.info("transfer");
					$("#" + mid).show();
				});
			}
			//$this.toggleClass("ui-state-active")
			return false;
		}).live("mouseover", function(){
			$(this).addClass("ui-state-hover")
		}).live("mouseout", function(){
			$(this).removeClass("ui-state-hover")
		});
	},
	doResize:function(){
		$("#desktop").height($("#layout").height()-$("#quickbar").height())
	}
};
jQuery(function($){
	bc.desktop.init();
	logger.info("loaded desktop.js");
});