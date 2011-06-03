bc.userForm = {
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
		
		//绑定选择岗位的事件处理
		//右到左
		$form.find("#right2left").click(function(){
			bc.select.appendSelected($form.find("#standbyGroups")[0],$form.find("#ownedGroups")[0]);
		});
		$form.find("#standbyGroups").dblclick(function(){
			bc.select.appendSelected($form.find("#standbyGroups")[0],$form.find("#ownedGroups")[0]);
		});
		$form.find("#rightAll2left").click(function(){
			bc.select.appendAll($form.find("#standbyGroups")[0],$form.find("#ownedGroups")[0]);
		});
		//左到右
		$form.find("#left2right").click(function(){
			bc.select.removeSelected($form.find("#ownedGroups")[0]);
		});
		$form.find("#ownedGroups").dblclick(function(){
			bc.select.removeSelected($form.find("#ownedGroups")[0]);
		});
		$form.find("#leftAll2right").click(function(){
			bc.select.removeAll($form.find("#ownedGroups")[0]);
		});
	}
};