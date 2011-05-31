bc.identity = {
	/**
	 * 单选单位信息
	 * @param {Object} option 配置参数
	 * @option onOk 选择完毕后的回调函数，函数第一个参数为选中的单位信息
	 */
	selectUnit : function(option) {
		option = jQuery.extend({
			url: bc.root + "/bc/actor/selectUnit",
			name: "选择单位信息",
			mid: "selectUnit",
			afterClose: function(status){
				if(status && typeof(option.onOk) == "function"){
					option.onOk(status);
				}
			}
		},option);
		
		bc.page.newWin(option);
	},
	/**
	 * 单选Actor信息
	 * @param {Object} option 配置参数
	 * @option onOk 选择完毕后的回调函数，函数第一个参数为选中的actor信息
	 * @option method action方法
	 */
	selectActor : function(option) {
		option = jQuery.extend({
			url: bc.root + "/bc/identity/select"
		},option);
	},
	//用户选中单位信息后
	afterSelected : function() {
		// 获取选中的值
	}
}