/**
 * 列表视图插件：导出为Excel
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-06-01
 * @depend list.js
 */
(function($) {

/**
 * 显示导出视图数据的配置界面-->用户选择-->导出excel
 * @param $grid 表格的jquery对象
 * @param el 导出按钮对应的dom元素
 */
bc.grid.export2Excel = function($grid,el) {
	//获取要导出的列名
	
	var html=[];
	html.push('<form name="exporter" method="post" style="margin:8px;">');
	
	//分页时添加“确认导出范围”
	if($grid.find("li.pagerIconGroup.seek")){//分页
		html.push('<div style="height:22px;line-height:22px;font-size:14px;font-weight:bold;color:#333;">确认导出范围</div>'
			+'<ul style="list-style:none;margin:0;padding:0;">'
			+'<li style="margin:2px;_margin:0;"><label for="exportScope1"><input style="margin:2px 0;_margin:0;" type="radio" id="exportScope1" name="exportScope" value="1" checked><span style="margin:0 4px;_margin:0 2px;">当前页</span></label>'
			+'&nbsp;&nbsp;<label for="exportScope2"><input style="margin:2px 0;_margin:0;" type="radio" id="exportScope2" name="exportScope" value="2"><span style="margin:0 4px;_margin:0 2px;">全部</span></label></li>'
			+'</ul>');
	}
	
	//添加剩余的模板内容
	html.push('<div style="margin-top:8px;height:22px;line-height:22px;font-size:14px;font-weight:bold;color:#333;">选择导出字段</div>'
		+'<ul style="list-style:none;margin:0;padding:0;">{0}</ul>'
		+'<div style="padding:0 4px;text-align:right;">'
		+'<a id="continue" style="text-decoration:underline;cursor:pointer;">继续</a>&nbsp;&nbsp;'
		+'<a id="cancel" style="text-decoration:underline;cursor:pointer;">取消</a></div>'
		+'<input type="hidden" name="title">'
		+'<input type="hidden" name="exportFileName">'
		+'<input type="hidden" name="headerIds">'
		+'<input type="hidden" name="headerNames">'
		+'</form>');
	
	//获取列的定义信息
	var headerIds=[],headerNames=[];
	var fields = []
	var columns = $grid.find("div.header>div.right>table.table td");
	columns.each(function(i){
		var $this = $(this);
		headerIds.push($this.attr("data-id"));
		headerNames.push($this.attr("data-label"));
		fields.push('<li style="margin:2px;_margin:0;">'
			+'<label for="field'+i+'">'
			+'<input style="margin:2px 0;_margin:0;" type="checkbox" id="field'+i+'" name="field" value="'+headerIds[i]+'" checked>'
			+'<span style="margin:0 4px;_margin:0 2px;">'+headerNames[i]+'</span></label></li>');
	});
	html = html.join("").format(fields.join(""));
	
	//显示“确认导出”窗口
	var boxPointer = bc.boxPointer.show({
		of:el,dir:"top",close:"click",
		offset:"-8 -4",
		iconClass:null,
		content:html
	});
	
	//取消按钮
	boxPointer.find("#cancel").click(function(){
		boxPointer.remove();
		return false;
	});
	
	//继续按钮
	boxPointer.find("#continue").click(function(){
		alert("TODO");
		return false;
	});
};

})(jQuery);