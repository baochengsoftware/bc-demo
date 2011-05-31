bc.groupForm = {
	init : function() {
		var $form = $(this);
		//绑定选择上级的按钮事件处理
		$form.find("#selectBelong").click(function(){
			var data = {};
			var selected = $form.find(":input[name='belong.id']").val();
			if(selected && selected.length > 0)
				data.selected = selected;
			
			bc.identity.selectUnit({
				url: bc.root + "/bc/selectUnitOrDepartment",
				data: data,
				onOk: function(actor){
					$form.find(":input[name='belong.name']").val(actor.name);
					$form.find(":input[name='belong.id']").val(actor.id);
				}
			});
		});
	}
};