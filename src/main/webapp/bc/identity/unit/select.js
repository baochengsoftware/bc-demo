bc.selectUnit = {
	init : function() {
		var $page = $(this);
		//绑定双击事件
		$page.find("select").dblclick(function(){
			bc.selectUnit.clickOk.call($page[0]);
		});
	},
	clickOk : function() {
		var $page = $(this);
		var select = $page.find("select")[0];
		if(select.selectedIndex == -1){
			alert("必须先选择一个单位！");
			return false;
		}
		var unit={
			id: select.value,
			name: select.options[select.selectedIndex].text
		};
		$page.data("data-status",unit);
		$page.dialog("close");
	}
}