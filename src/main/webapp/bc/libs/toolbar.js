/**
 * 工具条的全局处理
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-05-26
 * @depend jquery-ui-1.8,bc.core
 */
(function($) {

//顶部工具条按钮控制
$(".bc-toolbar .bc-button").live("mouseover", function() {
	$(this).addClass("ui-state-hover");
}).live("mouseout", function() {
	$(this).removeClass("ui-state-hover");
}).live("click", function() {
	var $this = $(this);
	var cfg = $this.metadata();
	var callback = cfg.callback ? bc.getNested(cfg.callback) : undefined;
	var pageEl = $this.parents(".bc-page")[0];
	switch (cfg.action){
	case "create"://新建--视图中
		bc.page.create.call(pageEl,callback);
		break;
	case "edit"://编辑----视图
		bc.page.edit.call(pageEl,callback);
		break;
	case "delete"://删除----视图
		bc.page.delete_.call(pageEl,callback);
		break;
	case "save"://保存----表单
		bc.page.save.call(pageEl,callback);
		break;
	case "cancel"://关闭对话框
		bc.page.cancel.call(pageEl,callback);
		break;
	default ://调用自定义的函数
		if(typeof cfg.click == "string")
			cfg.click = bc.getNested(cfg.click);//将函数名称转换为函数
		if(typeof cfg.click == "function")
			cfg.click.call(pageEl,callback);
		break;
	}
});


//右侧的搜索框处理：回车执行搜索（TODO alt+enter执行本地搜索）
$(".bc-toolbar #searchText").live("keyup", function(e) {
	var $this = $(this);
	if(e.which == 13){//按下回车键
		//logger.info("e:which="+e.which + ",ctrlKey=" + e.ctrlKey);
		
		var $page = $this.parents(".bc-page");
		
		//重设置为第一页
		$page.find("ul.pager #pageNo").text(1);
		
		//重新加载列表数据
		bc.grid.reloadData($page);
	}
});
$(".bc-toolbar #searchBtn").live("click", function(e) {
	var $page = $(this).parents(".bc-page");
	
	//重设置为第一页
	$page.find("ul.pager #pageNo").text(1);
	
	//重新加载列表数据
	bc.grid.reloadData($page);
	
	return false;
});

})(jQuery);