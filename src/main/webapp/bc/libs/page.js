/**
 * 表单及表格常用函数
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-04-24
 */
bc.page = {
	/**创建窗口
	 * @param option url,data,callback
	 */
	newWin: function(option) {
		option = option || {};
		logger.info("newWin:loading html from url=" + option.url);
		bc.ajax({
			url : option.url, data: option.data || null,
			dataType : "text",
			success : function(html) {
				logger.info("success loaded html");
				var $dom = $(html);
				function _init(){
					//从dom构建并显示桌面组件
					var cfg = jQuery.parseJSON($dom.attr("data-option"));	
					cfg.dialogClass=cfg.dialogClass || "bc-ui-dialog";
					//cfg.callback=option.callback || null;//传入该窗口关闭后的回调函数
					$dom.dialog(bc.page._rebuildWinOption.call($dom,cfg))
					.bind("dialogclose",function(event,ui){
						logger.debug("dialogclose");
						//调用回调函数
						if(option.callback) option.callback($dom.attr("data-status"));
						
						//彻底删除所有相关的dom元素
						$(this).dialog("destroy").remove();
					}).attr("data-src",option.url);//.disableSelection();这个会导致表单中输入框部分浏览器无法获取输入焦点
					
					//初始化表单或列表中的元数据信息：表单验证、列表的行操作处理
					//bc.page.innerInit.call($dom[0]);
					
					//插入最大化|还原按钮、最小化按钮
					if(cfg.maximize !== false){
						//$dom.dialog(
					}
					
					//执行组件指定的额外初始化方法，上下文为$dom
					var method = $dom.attr("data-initMethod");
					logger.debug("initMethod="+method);
					if(method){
						method = bc.getNested(method);
						logger.debug("initMethodType=" + (typeof method));
						if(typeof method == "function"){
							method.call($dom, cfg);
						}
					}
				}
				//alert(html);
				var dataJs = $dom.attr("data-js");
				if(dataJs){
					//先加载js文件后执行模块指定的初始化方法
					bc.load([dataJs,_init]);
				}else{
					//执行模块指定的初始化方法
					_init();
				}
			}
		});
	},
	/**
	 * 初始化表单或列表中的元数据信息：表单验证、列表的行操作处理
	 * 上下文为插入到对话框中的元素
	 */
	innerInit: function() {
		//单击行切换样式
		jQuery("table.list>tbody>tr.row").live("click",function(){
			$(this).toggleClass("ui-state-focus").find("td.id>span.ui-icon").toggleClass("ui-icon-check");
		});
		
		//双击行执行编辑
		jQuery("table.list>tbody>tr.row").live("dblclick",function(){
			var $this = $(this).toggleClass("ui-state-focus",true);
			$this.find("td.id>span.ui-icon").toggleClass("ui-icon-check",true);
			$this.siblings().removeClass("ui-state-focus").find("td.id>span.ui-icon").removeClass("ui-icon-check");
			var $content = $this.parents(".bc-content");
			//alert($content.html());
			bc.page.edit.call($content);
		});
		
		//全选与反选
		jQuery("table.list>thead>tr.row>td.id>span.ui-icon").live("click",function(){
			var $this = $(this).toggleClass("ui-icon-info ui-icon-circle-check");
			var check = $this.hasClass("ui-icon-circle-check");
			$this.parents("table.list").find(">tbody>tr.row")
			.toggleClass("ui-state-focus",check)
			.find("td.id>span.ui-icon").toggleClass("ui-icon-check",check);
		});
	},
	/**重新加载窗口的内容部分
	 * @param option url,data,callback
	 */
	reloadWin: function(option) {
		option = option || {};
		var $this = $(this);
		var url=option.url || $this.attr("data-src");
		logger.info("reloadWin:loading html from url=" + url);
		bc.ajax({
			url : url, data: option.data || null,
			dataType : "text",
			success : function(html) {
				logger.info("reloadWin:success loaded html");
				var $html = $(html);
				$this.empty().append($html.children());
				$html.empty().remove();
				
				//TODO 调用初始化方法
			}
		});
	},
	_rebuildWinOption: function(option){
		var _option = option || {};
		if(_option.buttons){
			var btn;
			for(var i in _option.buttons){
				btn = _option.buttons[i];
				if(btn.action == "save"){//内部的表单保存
					btn.click = bc.page.save;
				}else if(btn.action == "cancel"){//关闭对话框
					btn.click = bc.page.cancel;
				}else if(btn.action == "create"){//新建
					btn.click = bc.page.create;
				}else if(btn.action == "delete"){//删除
					btn.click = bc.page.delete_;
				}else if(btn.action == "edit"){//编辑
					btn.click = bc.page.edit;
				}else if(btn.fn){//调用自定义函数
					btn.click = bc.getNested(btn.fn);
				}
				
				//如果click为字符串，当成是函数名称处理
				if(typeof btn.click == "string")
					btn.click = bc.getNested(btn.click);
			}
		}
		return _option;
	},
	/**保存表单数据，上下文为dialog的原始dom元素*/
	save: function(option) {
		$this = $(this);
		if(logger.debugEnabled)logger.debug("bc.page.save");
		var url=$this.attr("data-action");
		logger.info("save url=" + url);
		var $form = $("form",this);
		
		//表单验证
		if(!bc.validator.validate($form))
			return;
		
		//使用ajax保存数据
		var data = $form.serialize();
		bc.ajax({
			url: url, data: data, dataType: "json",
			success: function(json) {
				if(logger.debugEnabled)logger.debug("save success.json=" + jQuery.param(json));
				if(json.id){
					$form.find("input[name='b.id']").val(json.id);
				}
				bc.msg.slide(json.msg);
				//记录已保存状态
				$this.attr("data-status","saved");
			}
		});
	},
	/**删除*/
	delete_: function() {
		var $this = $(this);
		var url=$this.attr("data-action-delete");
		logger.info("bc.page.delete_: url=" + url);
		var data=null;
		var $tds = $("table.list>tbody>tr.ui-state-focus>td.id",this);
		if($tds.length == 1){
			data = "id=" + $tds.attr("data-id");
		}else if($tds.length > 1){
			data = "ids=";
			$tds.each(function(i){
				data += $(this).attr("data-id") + (i == $tds.length-1 ? "" : ",");
			});
		}
		if(logger.infoEnabled) logger.info("bc.page.delete_: data=" + data);
		if(data == null){
			bc.msg.slide("请先选择要删除的条目！");
			return;
		}
		bc.msg.confirm("确定要删除选定的 <b>"+$tds.length+"</b> 项吗？",function(){
			bc.ajax({
				url: url, data: data, dataType: "json",
				success: function(json) {
					if(logger.debugEnabled)logger.debug("delete success.json=" + jQuery.param(json));
					bc.msg.slide(json.msg);
					//重新加载列表
					bc.page.reloadWin.call($this);
				}
			});
		});
	},
	/**关闭表单对话框，上下文为dialog的原始dom元素*/
	cancel: function(option){
		logger.info("bc.page.cancel");
		$(this).dialog("destroy").remove();
	},
	/**新建表单*/
	create: function(){
		logger.info("bc.page.create");
		var $this = $(this);
		bc.page.newWin({
			url:$(this).attr("data-action-create"),
			callback: function(data){
				bc.page.reloadWin.call($this);
			}
		});
	},
	/**编辑*/
	edit: function(){
		logger.info("bc.page.edit");
		var $this = $(this);
		var url = $this.attr("data-action-edit");
		logger.info("bc.page.edit: url=" + url);
		var $tds = $("table.list>tbody>tr.ui-state-focus>td.id",$this);
		if($tds.length == 1){
			var data = "id=" + $tds.attr("data-id");
			if(logger.infoEnabled) logger.info("bc.page.edit: data=" + data);
			bc.page.newWin({
				url:url, data: data || null,
				callback: function(status){
					logger.info("bc.page.edit: status=" + status);
					if(status == "saved")
						bc.page.reloadWin.call($this);
				}
			});
		}else if($tds.length > 1){
			bc.msg.slide("一次只可以编辑一条信息，请确认您只选择了一条信息！");
			return;
		}else{
			bc.msg.slide("请先选择要编辑的条目！");
			return;
		}
	}
};

/**对$.ajax的通用封装*/
bc.ajax = function(option){
	option = option || {};
	$.extend(option,{
		error: function(request, textStatus, errorThrown) {
			var msg = "bc.ajax: textStatus=" + textStatus + ";errorThrown=" + errorThrown;
			logger.error(msg);
			alert(msg);
		}
	});
	jQuery.ajax(option);
};

jQuery(function($) {
	bc.page.innerInit();
});

//测试用的函数
function testFN(){
	logger.info("testFN");
}

bc.validator = {
	/**
	 * 表单验证
	 * <input ... data-validate='{required:true,type:"number",max:10,min:5}'/>
	 * type的值控制各种不同的验证方式：
	 * 1) undefined或required 最简单的必填域验证，值不为空即可
	 * 2) number 数字(正数、负数、小数)
	 * 3) digits 整数
	 * 4) email 电子邮件 TODO
	 * 5) url 网址 TODO
	 * 6) date 日期 TODO
	 * 7) datetime 日期时间 TODO
	 * 8) time 时间 TODO
	 * min的值控制数字的最小值
	 * max的值控制数字的最大值
	 * minLen的值控制字符串的最小长度(中文按两个字符长度计算)
	 * maxLen的值控制字符串的最大长度(中文按两个字符长度计算)
	 * 如果无需配置其他属性，type的值可以直接配置为validate的值，如<input ... data-validate="number"/>
	 * @$form 表单form的jquery对象
	 */
	validate: function($form) {
		var ok = true;
		$form.find(":input:enabled:not(:hidden):not(:button)")
		.each(function(i, n){
			var validate = $(this).attr("data-validate");
			if(logger.infoEnabled)
				logger.info(this.nodeName + "," + this.name + "," + this.value + "," + validate);
			if(validate && $.trim(validate).length > 0){
				if(!/^\{/.test(validate)){
					validate = "{type:'" + validate + "'}";
				}
				validate = eval("(" + validate + ")");
				var method = bc.validator.methods[validate.type];
				if(method){
					ok = method.call(validate, this, $form);
					if(!ok){//验证不通过，增加界面的提示
						bc.validator.remind(this,validate.type);
					}
					return ok;
				}else{
					logger.error("undefined method: bc.validator.methods['" + validate.type + "']");
				}
			}
		});
		return ok;
	},
	/**各种验证方法，可以自行扩展新的验证方法，方法的上下文为对象的验证配置*/
	methods:{
		/**必填*/
		required: function(element, $form) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if(/radio|checkbox/i.test(element.type)){//多选和单选框
					return $form.find("input:checked[name='" + element.name + "']").length > 0;
				}
			default:
				return $.trim($(element).val()).length > 0;
			}
		},
		/**数字*/
		number: function(element) {
			return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(element.value);
		},
		/**正数*/
		digits: function(element) {
			return /^\d+$/.test(element.value);
		},
		/**字符串最小长度*/
		minLen: function(element) {
			return bc.getStringActualLen(element.value) >= this.minLen;
		},
		/**字符串最大长度*/
		maxLen: function(element) {
			return bc.getStringActualLen(element.value) <= this.maxLen;
		},
		/**最小值*/
		min: function(element) {
			return element.value >= this.minValue;
		},
		/**最大值*/
		max: function(element) {
			return element.value <= this.maxValue;
		}
	},
	/**
	 * 显示验证不通过的提示信息
	 * @element 验证不通过的dom元素
	 * @validateType 验证的类型
	 */
	remind: function(element,validateType){
		bc.boxPointer.show({of:element,content:bc.validator.messages[validateType]});
	},
	messages:{
		required:"这里必须填写哦！",
		number: "这里必须填写数字哦！",
		digits: "这里必须填写整数哦！",
		email: "请输入正确格式的电子邮件",
		url: "请输入正确格式的网址",
		date: "请输入正确格式的日期",
		maxLen: "这里至少需要输入 {0}个字符！",
		minLen: "这里最多只能输入 {0}个字符！",
		max: "这个值不能小于 {0}！",
		min: "这个值不能大于 {0}！"
	}
};
