bc.moduleForm = {
	init : function() {
		var $form = $(this);
		//绑定选择隶属模块的按钮事件处理
		$form.find("#selectBelong").click(function(){
			var data = {};
			var selected = $form.find(":input[name='e.belong.id']").val();
			var myId = $form.find(":input[name='e.id']").val();
			if(selected && selected.length > 0)
				data.selected = selected;
			if(myId && myId.length > 0)
				data.exclude = myId;
			
			bc.identity.selectUnit({
				url: bc.root + "/bc/selectModule",
				data: data,
				onOk: function(actor){
					if(myId != actor.id){
						$form.find(":input[name='e.belong.name']").val(actor.name);
						$form.find(":input[name='e.belong.id']").val(actor.id);
					}else{
						alert("不能选择自己作为自己的所属模块！");
					}
				}
			});
		});
		
		//绑定模块类型选择变动事件
//		$form.find(":radio").change(function(){
//			var $this = $(this);
//			var type = $this.val()
//			logger.info("select:" + this.id + "," + type);
//			if(type == "1"){//模块
//				$form.find("#urlRow").hide();
//			}else{//链接
//				$form.find("#urlRow").show();
//			}
//		});
	}
};