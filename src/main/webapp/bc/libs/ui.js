/**
 * 表单及表格常用函数
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-04-24
 */
bc.ui = {
	/** 初始化 */
	init : function() {
		//选择单位的事件初始化
		jQuery("#selectUnit").live("click",function(){
			$this=$(this);
			logger.info("tag=" + this.tagName + ",name=" + this.getAttribute("name"));
			var curLabel = $this.val();
			var field = $this.metadata().field;
			var curValue = (field ? $this.parents($this.metadata().context || "form").find("[name='"+field+"']") : curLabel);
			logger.info("curValue=" + curValue + ",curLabel=" + curLabel);
			bc.page.newWin({
				mid: "selectUnit",
				url: bc.root+"/bc/unit/select",
				data: {value:curValue,label:curLabel},
				modal: true
			});
		});
	}
}
/** 选择单位 */
bc.ui.selectUnit = function() {
	logger.info("selectUnit");
};

// 注册ui事件
jQuery(function($) {
	//bc.ui.init();
});