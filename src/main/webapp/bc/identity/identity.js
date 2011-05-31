bc.identity = {
	/**
	 * 单选单位信息
	 * @param {Object} option 配置参数
	 * @option {String} selected 当前应选中的项的值，多个值用逗号连接
	 * @option {String} exclude 要排除显示的项的值，多个值用逗号连接
	 * @option {Function} onOk 选择完毕后的回调函数，函数第一个参数为选中的单位信息
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
	 * 单选单位或部门信息
	 * @param {Object} option 配置参数
	 * @option {String} selected 当前应选中的项的值，多个值用逗号连接
	 * @option {String} exclude 要排除显示的项的值，多个值用逗号连接
	 * @option {Function} onOk 选择完毕后的回调函数，函数第一个参数为选中的单位信息
	 */
	selectUnitOrDepartment : function(option) {
		option = jQuery.extend({
			url: bc.root + "/bc/actor/selectUnitOrDepartment",
			name: "选择单位或部门信息",
			mid: "selectUnitOrDepartment",
			afterClose: function(status){
				if(status && typeof(option.onOk) == "function"){
					option.onOk(status);
				}
			}
		},option);
		
		bc.page.newWin(option);
	}
}