bc.selectIconClass={
	init:function(){
		var $icons = $(this).find("a.shortcut");
		$icons.click(function(){
			$icons.toggleClass("selectedIcon",false);
			var $this = $(this);
			$(this).toggleClass("selectedIcon",true);
		});
	},
	clickOk:function(){
		var $page = $(this);
		var select = $page.find("a.selectedIcon").attr("title");
		if(!select || select.length == 0){
			alert("必须先选择一个图标！");
			return false;
		}
		$page.data("data-status",select);
		$page.dialog("close");
	}
};