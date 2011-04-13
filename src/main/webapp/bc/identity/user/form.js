var userForm = {
	init : function(option) {
		this.dialog(option)
		.bind("dialogclose",function(event,ui){
			logger.debug("dialogclose");
			$(this).dialog("destroy").remove();
		});
		/*
		this.dialog("option","buttons",[
		     {text:"确认",click:function(){logger.info("click 确认");}}
			,{text:"取消",click:function(){logger.info("click 取消");}}
		]);
		*/
	}
};