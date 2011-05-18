bc.personal={
	init:function(){
		var $form = this;
		var $slider = this.find("#fontSlider");
		var curValue = parseInt($slider.attr("data-value"));	
		$form.find("#fontSize").html(bc.personal.getFontSizeDesc(curValue));
		logger.info("curValue=" + curValue);
		$slider.slider({
			value:curValue,min: 12,max: 20,step: 2,
			slide: function( event, ui ) {
				$form.find("[name='entity.font']").val(ui.value);
				$form.find("#fontSize").html(bc.personal.getFontSizeDesc(ui.value));
				$("body").css("fontSize",ui.value + 'px');
				logger.info(ui.value);
			}
		});
	},
	getFontSizeDesc:function(fontSize){
		switch (fontSize + ""){
			case "12":
			return "标准";
			case "14":
			return "中";
			case "16":
			return "大";
			case "18":
			return "很大";
			case "20":
			return "超大";
			default:
			return "未知";
		}
	}
};