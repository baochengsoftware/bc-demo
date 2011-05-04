/**
 * BoxPointer控件
 *
 * @author rongjihuang@gmail.com
 * @date 2011-05-04
 * @dep jquery
 */
bc.boxPointer = {
	id:0,
	
	/** 默认的 */
	TPL: '<div class="boxPointer"><div class="content">undefined content!</div><s class="pointerBorder"><i class="pointerColor"></i></s></div>',
	OK: "确定",
	CANCEL: "取消",
	CSS_TOP:{},
	
    /** 提示框 
     * @param {Object} option 配置对象
     * @param {option} target 要指向的dom对象
     * @param {option} dir 箭头的指向，默认为auto,可强制top、bottom、left、right 4个方向
     */
    show: function(option){
    	option.dir = "top";
		var target = $(option.target);
		
		//计算定位
		var p = target.offset();
		if(logger.debugEnabled)logger.debug("0-left=" + p.left + ";top=" + p.top + "," + target.height());
		p.left=p.left;
		p.top=p.top;//+target.height();
		if(logger.debugEnabled)logger.debug("1-left=" + p.left + ";top=" + p.top);

		var boxPointer = $(bc.boxPointer.TPL).appendTo("body");
		//.css({left:p.left,top:p.top});
		//内容
		boxPointer.find(".content").html(option.content || "undefined content!");
		
		//定位
		boxPointer.show().position({
			my: "left top",
			at: "left bottom",
			of: target,
			offset: "0 4"
		});
		
		//显示
		//boxPointer;
    }
};