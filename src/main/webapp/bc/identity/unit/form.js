bc.unitForm = {
	init : function() {
		var $form = $(this);
		//绑定选择单位的按钮事件处理
		$form.find("#selectUnit").click(function(){
			var data = {};
			var selected = $form.find(":input[name='belong.id']").val();
			var myId = $form.find(":input[name='e.id']").val();
			if(selected && selected.length > 0)
				data.selected = selected;
			if(myId && myId.length > 0)
				data.exclude = myId;
			
			bc.identity.selectUnit({
				url: bc.root + "/bc/selectUnit",
				data: data,
				onOk: function(actor){
					if(myId != actor.id){
						$form.find(":input[name='belong.name']").val(actor.name);
						$form.find(":input[name='belong.id']").val(actor.id);
					}else{
						alert("不能选择自己作为自己的上级！");
					}
				}
			});
		});
	},
	//用户选中单位信息后
	afterSelected : function() {
		// 获取选中的值
	}
};