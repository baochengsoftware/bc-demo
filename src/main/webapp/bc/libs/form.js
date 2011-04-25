/**
 * 表单常用函数
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-04-24
 */
bc.form = {
	/**保存表单数据，上下文为dialog的原始dom元素*/
	save: function(option) {
		$this = $(this);
		if(logger.debugEnabled)logger.debug("bc.form.save");
		var url=$this.attr("data-action");
		logger.info("save url=" + url);
		var $form = $("form",this);
		var data = $form.serialize();
		$.ajax({
			url: url,
			dataType: "json",
			data: data,
			success: function(json) {
				if(logger.debugEnabled)logger.debug("save success.json=" + jQuery.param(json));
				if(json.id){
					$form.find("input[name='b.id']").val(json.id);
				}
				bc.msg.alert(json.msg);
			},
			error: function(request, textStatus, errorThrown) {
				logger.error("bc.form.save: textStatus=" + textStatus + ";errorThrown=" + errorThrown);
			}
		});
		
	},
	/**关闭表单对话框，上下文为dialog的原始dom元素*/
	cancel: function(option){
		logger.info("bc.form.cancel");
		$(this).dialog("destroy").remove();
	}
};

//测试用的函数
function testFN(){
	logger.info("testFN");
}