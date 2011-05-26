/**
 * 列表视图的全局处理
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-05-25
 * @depend jquery-ui-1.8,bc.core
 */
(function($) {
bc.grid = {
	/**
	 * 表格型页面的初始化
	 * @param container 对话框内容的jquery对象
	 */
	init: function(container) {
		var $grid = container.find(".bc-grid");
		//滚动条处理
		$grid.find(".data .right").scroll(function(){
			//logger.info("scroll");
			container.find(".data .left").scrollTop($(this).scrollTop());
			container.find(".header .right").scrollLeft($(this).scrollLeft());
		});
		//记录表格的原始宽度
		var $data_table = $grid.find(".data .right .table");
		var originWidth = $data_table.width();
		$data_table.data("originWidth", originWidth);
		
		//绑定并触发一下对话框的resize事件
		//container.trigger("dialogresize");
		bc.grid.resizeGridPage(container);
		container.bind("dialogresize", function(event, ui) {
			bc.grid.resizeGridPage(container);
		})
		
		//禁止选择文字
		$grid.disableSelection();
	},
	/**
	 * 表格型页面改变对话框大小时的处理
	 * @param container 对话框内容的jquery对象
	 */
	resizeGridPage: function(container) {
		var $grid = container.find(".bc-grid");
		if($grid.size()){
			//data宽度
			var $data_right = $grid.find(".data .right");
			var $data_left = $grid.find(".data .left");
			var $header_right = $grid.find(".header .right");
			var sw = 0, sh = 0 ;//边框加补白的值
			if($.support.boxModel){
				sw = $grid.outerWidth()-$grid.width() + ($data_left.outerWidth()-$data_left.width());
				sh = $grid.outerHeight()-$grid.height();
			}
			$data_right.width(container.width()-$data_left.width()-sw);
			var $data_table = $data_right.find(".table");
			var originWidth = $data_table.data("originWidth");//原始宽度
			var newTableWidth = Math.max(originWidth,$data_right[0].clientWidth);
			$data_table.width(newTableWidth);
			$header_right.find(".table").width(newTableWidth);
			
			//header宽度(要减去data区的垂直滚动条宽度)
			$header_right.width($data_right[0].clientWidth);
			
			//其他元素高度累计
			var otherHeight = 0;
			$grid.siblings().each(function(){
				otherHeight += $(this).outerHeight(true);//累计表格兄弟的高度
			});
			$grid.height(container.height()-otherHeight-sh);//重设表格的高度
			$data_right.parent().siblings().each(function(){
				otherHeight += $(this).outerHeight(true);//再累计表格头和分页条的高度
			});
			
			//data高度(id列要减去data区的水平滚动条高度)
			$data_right.height(container.height()-otherHeight - sh);
			$grid.find(".data .left").height($data_right[0].clientHeight);
		}
	},
	/**
	 * 对指定table的tbody的行数据进行排序
	 * @param $tbody table的tbody对应的jquery对象
	 * @param tdIndex 要进行排序的单元格在行中的索引号
	 * @param dir 排序的方向：1--正向，-1--反向
	 */
	sortTable: function($tbody,tdIndex,dir){
		var tbody = $tbody[0];
		var rows = tbody.rows;
		var trs = new Array(rows.length);
		for(var i=0;i<trs.length;i++){
			trs[i]=rows[i];//rows(i)
			trs[i].setAttribute("prevIndex",i);//记录未排序前的顺序
		}
		//数组排序
		trs.sort(function(tr1,tr2){
			var v1 = tr1.cells[tdIndex].innerHTML;
			var v2 = tr2.cells[tdIndex].innerHTML;
			//英文永远在中文前面，子chrome11测试不通过
			return dir * v1.localeCompare(v2);
		});
		//交换表格的行到新的顺序
		var t = [];
		var notFirefox = !$.browser.mozilla;
		for(var i=0;i<trs.length;i++){
			//firefox不支持outerHTML;
			t.push(notFirefox ? trs[i].outerHTML : document.createElement("div").appendChild(trs[i].cloneNode(true)).parentNode.innerHTML);
		}
		$tbody.html(t.join(""));
		//tbody.innerHTML = t.join("");//ie中不支持，tbody的innerHTML为只读
		
		return trs;//返回排好序的tr列表
	}
}

//表格分页条按钮控制
$("ul .pagerIcon").live("mouseover", function() {
	$(this).addClass("ui-state-hover");
}).live("mouseout", function() {
	$(this).removeClass("ui-state-hover");
});
//点击扩展按钮
$("ul li.pagerIcon").live("click", function() {
	logger.info("click li.pagerIcon");
});
//点击分页按钮
$("ul li.pagerIconGroup.seek>.pagerIcon").live("click", function() {
	logger.info("click seek.pagerIcon");
});
//点击pageSize按钮
$("ul li.pagerIconGroup.size>.pagerIcon").live("click", function() {
	logger.info("click size.pagerIcon");
	$(this).addClass("ui-state-active").siblings().removeClass("ui-state-active");
});

//单击行切换样式
$(".bc-grid>.data>.right tr.row").live("click",function(){
	var $this = $(this);
	var index = $this.toggleClass("ui-state-focus").index();
	$this.parents(".right").prev()
		.find("tr.row:eq("+index+")").toggleClass("ui-state-focus")
		.find("td.id>span.ui-icon").toggleClass("ui-icon-check");
});

//双击行执行编辑
$(".bc-grid>.data>.right tr.row").live("dblclick",function(){
	var $this = $(this);
	var index = $this.toggleClass("ui-state-focus",true).index();
	var $row = $this.parents(".right").prev()
		.find("tr.row:eq("+index+")").add(this);
	$row.toggleClass("ui-state-focus",true)
		.siblings().removeClass("ui-state-focus")
		.find("td.id>span.ui-icon").removeClass("ui-icon-check");
	$row.find("td.id>span.ui-icon").toggleClass("ui-icon-check",true);

	var $content = $this.parents(".ui-dialog-content");
	//alert($content.html());
	bc.page.edit.call($content);
});

//全选与反选
$(".bc-grid>.header td.id>span.ui-icon").live("click",function(){
	var $this = $(this).toggleClass("ui-icon-notice ui-icon-check");
	var check = $this.hasClass("ui-icon-check");
	$this.parents(".header").next().find("tr.row")
	.toggleClass("ui-state-focus",check)
	.find("td.id>span.ui-icon").toggleClass("ui-icon-check",check);
});

//列表的本地排序
$(".bc-grid>.header>.right tr.row>td.sortable").live("click",function(){
	logger.info("sortable");
	//标记当前列处于排序状态
	var $this = $(this).toggleClass("current",true);
	
	//将其他列的排序去除
	$this.siblings(".current").removeClass("current")
	.find("span.ui-icon").addClass("hide");
	
	var $icon = $this.find("span.ui-icon");
	//切换排序图标
	var dir = 0;
	if($icon.hasClass("ui-icon-triangle-1-n")){//正序
		$icon.removeClass("hide ui-icon-triangle-1-n").addClass("ui-icon-triangle-1-s");
		dir = -1;
	}else if($icon.hasClass("ui-icon-triangle-1-s")){//逆序
		$icon.removeClass("hide ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-n");
		dir = 1;
	}else{
		$icon.removeClass("hide").addClass("ui-icon-triangle-1-s");//逆序
	}

	//排序列表中的行
	var $grid = $this.parents(".bc-grid");
	var tdIndex = this.cellIndex;//要排序的列索引
	var remoteSort = $grid.attr("remoteSort") === "true";//是否远程排序，默认本地排序
	if(remoteSort){//远程排序
		logger.profile("do remote sort");
		//TODO
		
		logger.profile("do remote sort");
	}else{//本地排序
		logger.profile("do local sort");
		//对数据所在table和id所在table进行排序
		var rightTrs = bc.grid.sortTable($grid.find(">.data>.right>table.table>tbody"), tdIndex, dir);
		
		//根据上述排序结果对id所在table进行排序
		var $tbody = $grid.find(">.data>.left>table.table>tbody");
		var rows = $tbody[0].rows;
		var trs = new Array(rows.length);
		for(var i=0;i<trs.length;i++){
			trs[i]=rows[parseInt(rightTrs[i].getAttribute("prevIndex"))];//rows(i)
		}
		//交换表格的行到新的顺序
		var t = [];
		var notFirefox = !$.browser.mozilla;
		for(var i=0;i<trs.length;i++){
			//firefox不支持outerHTML;
			t.push(notFirefox ? trs[i].outerHTML : document.createElement("div").appendChild(trs[i].cloneNode(true)).parentNode.innerHTML);
		}
		$tbody.html(t.join(""));
		
		logger.profile("do local sort");
	}
});

})(jQuery);