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
		
		//在单独的浏览器窗口中打开
		if(option.standalone){
			logger.info("newWin:option.standalone=" + option.standalone);
			window.open(option.url,"_blank");
			return;
		}
		
		// 任务栏显示正在加载的信息
		if(bc.page.quickbar.has(option.mid)){
			logger.info("newWin:active=" + option.mid);
			bc.page.quickbar.active(option.mid);//仅显示现有的窗口
			return;
		}else{
			logger.info("newWin:create=" + option.mid);
			bc.page.quickbar.loading(option);
		}
		
		//内部处理
		logger.info("newWin:loading html from url=" + option.url);
		bc.ajax({
			url : option.url, data: option.data || null,
			dataType : "html",
			success : function(html) {
				logger.info("success loaded html");
				var tc = document.getElementById("tempContainer");
				if(!tc){
					tc=$('<div id="tempContainer"></div>').appendTo("body")[0];
				}
				//tc.innerHTML=html;
				var $dom = $(html);
				if($dom.size() > 1){
					//logger.error("error page. try set theme='simple' for struts2 tag");
					alert("error page dom. try set theme='simple' for struts2 tag: size=" + $dom.size());
				}
				function _init(){
					//从dom构建并显示桌面组件
					var cfg = jQuery.parseJSON($dom.attr("data-option"));
					cfg.dialogClass=cfg.dialogClass || "bc-ui-dialog ui-widget-header";
					//cfg.callback=option.callback || null;//传入该窗口关闭后的回调函数
					$dom.dialog(bc.page._rebuildWinOption.call($dom,cfg));
					$dom.bind("dialogclose",function(event,ui){
						//logger.debug("dialogclose");
						//调用回调函数
						if(option.callback) option.callback($dom.attr("data-status"));
						
						//彻底删除所有相关的dom元素
						$(this).dialog("destroy").remove();
						$(bc.page.quickbar.id).find(">a.quickButton[data-mid='" + option.mid + "']").unbind().remove();
					}).attr("data-src",option.url).attr("data-mid",option.mid)
					.bind("dialogfocus", function(event, ui) {
						//logger.debug("dialogfocus");
						$(bc.page.quickbar.id).find(">a.quickButton[data-mid='" + option.mid + "']")
						.toggleClass("ui-state-active",true).siblings().toggleClass("ui-state-active",false);
					})
					.bind("dialogresize", function(event, ui) {
						//logger.debug("dialogresize");
						bc.page.resizeWinContent.call($dom);
					});
					//.disableSelection();这个会导致表单中输入框部分浏览器无法获取输入焦点
					
					var $grid = $dom.find(".bc-grid");
					if($grid.size()){//表格的额外处理
						//滚动条处理
						$grid.find(".data .right").scroll(function(){
							//logger.info("scroll");
							$dom.find(".data .left").scrollTop($(this).scrollTop());
							$dom.find(".header .right").scrollLeft($(this).scrollLeft());
						});
						//记录表格的原始宽度
						var $data_table = $grid.find(".data .right .table");
						var originWidth = $data_table.width();
						$data_table.data("originWidth", originWidth);
						
						//触发一下对话框的resize事件
						$dom.trigger("dialogresize");
						
						//禁止选择文字
						$grid.disableSelection();
					}
					
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
						if(typeof method == "function"){
							method.call($dom, cfg);
						}
					}
					
					//通知任务栏模块加载完毕
					bc.page.quickbar.loaded(option.mid);
				}
				//alert(html);
				var dataJs = $dom.attr("data-js");
				if(dataJs && dataJs.length > 0){
					//先加载js文件后执行模块指定的初始化方法
					dataJs = dataJs.split(",");//逗号分隔多个文件
					dataJs.push(_init);
					bc.load(dataJs);
				}else{
					//执行模块指定的初始化方法
					_init();
				}
			}
		});
	},
	/**
	 * 改变对话框大小时的处理，上下文为当前对话框内容的jquery对象
	 */
	resizeWinContent: function() {
		var $grid = this.find(".bc-grid");
		if($grid.size()){//表格的额外处理
			//data宽度
			var $data_right = $grid.find(".data .right");
			var $header_right = $grid.find(".header .right");
			var sw = 0, sh = 0 ;
			if($.support.boxModel){
				sw = $grid.outerWidth()-$grid.width();
				sh = $grid.outerHeight()-$grid.height();
			}
			$data_right.width(this.width()-$grid.find(".data .left").width()-sw);
			var $data_table = $data_right.find(".table");
			var originWidth = $data_table.data("originWidth");//原始宽度
			var newTableWidth = Math.max(originWidth,$data_right[0].clientWidth);
			$data_table.width(newTableWidth);
			$header_right.find(".table").width(newTableWidth);
			
			//header宽度(要减去data区的垂直滚动条宽度)
			$header_right.width($data_right[0].clientWidth);
			
			//其他元素高度累计
			var otherHeight = 0;
			$grid.siblings().each(function(){
				otherHeight += $(this).outerHeight(true);//累计表格兄弟的高度
			});
			$grid.height(this.height()-otherHeight-sh);//重设表格的高度
			$data_right.parent().siblings().each(function(){
				otherHeight += $(this).outerHeight(true);//再累计表格头和分页条的高度
			});
			
			//data高度(id列要减去data区的水平滚动条高度)
			$data_right.height(this.height()-otherHeight - sh);
			$grid.find(".data .left").height($data_right[0].clientHeight);
		}
	},
	/**
	 * 初始化表单或列表中的元数据信息：表单验证、列表的行操作处理
	 * 上下文为插入到对话框中的元素
	 */
	innerInit: function() {
		//单击行切换样式
		jQuery(".bc-grid>.data>.right tr.row").live("click",function(){
			var $this = $(this);
			var index = $this.toggleClass("ui-state-focus").index();
			$this.parents(".right").prev()
				.find("tr.row:eq("+index+")").toggleClass("ui-state-focus")
				.find("td.id>span.ui-icon").toggleClass("ui-icon-check");
		});
		
		//双击行执行编辑
		jQuery(".bc-grid>.data>.right tr.row").live("dblclick",function(){
			var $this = $(this);
			var index = $this.toggleClass("ui-state-focus",true).index();
			var $row = $this.parents(".right").prev()
				.find("tr.row:eq("+index+")").add(this);
			$row.toggleClass("ui-state-focus",true)
				.siblings().removeClass("ui-state-focus")
				.find("td.id>span.ui-icon").removeClass("ui-icon-check");
			$row.find("td.id>span.ui-icon").toggleClass("ui-icon-check",true);

			var $content = $this.parents(".ui-dialog-content");
			//alert($content.html());
			bc.page.edit.call($content);
		});
		
		//全选与反选
		jQuery(".bc-grid>.header td.id>span.ui-icon").live("click",function(){
			var $this = $(this).toggleClass("ui-icon-notice ui-icon-check");
			var check = $this.hasClass("ui-icon-check");
			$this.parents(".header").next().find("tr.row")
			.toggleClass("ui-state-focus",check)
			.find("td.id>span.ui-icon").toggleClass("ui-icon-check",check);
		});
		
		//列表的排序
		jQuery("table.list>thead>tr.row>td.sortable").live("click",function(){
			//标记当前列出与排序状态
			var $this = $(this).toggleClass("current",true);
			
			//将其他列的排序去除
			$this.siblings(".current").removeClass("current")
			.find("span.ui-icon").addClass("hide");
			
			var $icon = $this.find("span.ui-icon");
			//切换排序图标
			var dir = 0;
			if($icon.hasClass("ui-icon-triangle-1-n")){//正序
				$icon.removeClass("hide ui-icon-triangle-1-n").addClass("ui-icon-triangle-1-s");
				dir = -1;
			}else if($icon.hasClass("ui-icon-triangle-1-s")){//逆序
				$icon.removeClass("hide ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-n");
				dir = 1;
			}else{
				$icon.removeClass("hide").addClass("ui-icon-triangle-1-s");//逆序
			}
			
			//排序列表中的行
			var $table = $this.parents("table.list").find(">tbody");//要排序的表格
			var tdIndex = this.cellIndex;//要排序的列索引
			var remoteSort = $table.attr("remoteSort") === "true";//是否远程排序，默认本地排序
			if(remoteSort){//远程排序
				logger.profile("do remote sort");
				//TODO
				
				logger.profile("do remote sort");
			}else{//本地排序
				logger.profile("do local sort");
				var tbody = $table[0];
				var rows = tbody.rows;
				var trs = new Array(rows.length);
				for(var i=0;i<trs.length;i++){
					trs[i]=rows[i];//rows(i)
				}
				//数组排序
				trs.sort(function(tr1,tr2){
					var v1 = tr1.cells[tdIndex].innerHTML;
					var v2 = tr2.cells[tdIndex].innerHTML;
					//logger.info(v1.localeCompare(v2) + ";" + v1 + ";" + v2);
					return dir * v1.localeCompare(v2);
				});
				//交换表格的行到新的顺序
				var t = [];
				for(var i=0;i<trs.length;i++){
					t.push(trs[i].outerHTML);
				}
				$table.html(t.join(""));
				
				//logger.info(typeof tbody.moveRow);
				//logger.info(typeof $this.parents("table.list")[0].moveRow);
				logger.profile("do local sort");
			}
		});
		
		//工具条按钮控制
		$("button.bc-button").live("mouseover", function() {
			$(this).addClass("ui-state-hover");
		}).live("mouseout", function() {
			$(this).removeClass("ui-state-hover");
		}).live("click", function() {
			logger.info("click bc-button");
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
			delete _option.buttons;
		}
		return _option;
	},
	/**保存表单数据，上下文为dialog的原始dom元素*/
	save: function(callback) {
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
					$form.find("input[name='entity.id']").val(json.id);
				}
				bc.msg.slide(json.msg);
				//记录已保存状态
				$this.attr("data-status","saved");
				
				//调用回调函数
				if(typeof callback == "function")
					callback.call($this[0],json);
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
			url: $this.attr("data-action-create"),
			mid: $this.attr("data-mid") + ".0",
			name: "新建" + ($this.attr("data-name") || "未定义"),
			callback: function(data){
				bc.page.reloadWin.call($this);
			}
		});
	},
	/**编辑*/
	edit: function(){
		//logger.info("bc.page.edit");
		var $this = $(this);
		var url = $this.attr("data-action-edit");
		logger.info("bc.page.edit: url=" + url);
		var $tds = $this.find(".bc-grid>.data>.left tr.ui-state-focus>td.id");
		if($tds.length == 1){
			var data = "id=" + $tds.attr("data-id");
			if(logger.infoEnabled) logger.info("bc.page.edit: data=" + data);
			logger.info("bc.page.edit: name=" + $tds.attr("data-name"));
			bc.page.newWin({
				url:url, data: data || null,
				mid: $this.attr("data-mid") + "." + $tds.attr("data-id"),
				name: $tds.attr("data-name") || "未定义",
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
	 * 9) phone 电话号码
	 * min的值控制数字的最小值
	 * max的值控制数字的最大值
	 * minLen的值控制字符串的最小长度(中文按两个字符长度计算)
	 * maxLen的值控制字符串的最大长度(中文按两个字符长度计算)
	 * 如果无需配置其他属性，type的值可以直接配置为validate的值，如<input ... data-validate="number"/>
	 * required的值控制是否必须填写true|false
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
				if(!/^\{/.test(validate)){//不是以字符{开头
					validate = '{"required":true,"type":"' + validate + '"}';//默认必填
				}
				logger.info("-01--"+validate.type);
				validate = jQuery.parseJSON(validate);
				logger.info("-02--"+validate.type);
				var method = bc.validator.methods[validate.type];
				if(method){
					logger.info("-1--"+validate.type);
					var value = $(this).val();
					logger.info("-2--"+validate.type);
					if(validate.required || (value && value.length > 0)){//必填或有值时
						logger.info("-3--"+validate.type);
						ok = method.call(validate, this, $form);
						if(!ok){//验证不通过，增加界面的提示
							bc.validator.remind(this,validate.type);
						}
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
		/**电话号码与手机号码同时验证
		 * 匹配格式：11位手机号码;3-4位区号、7-8位直播号码、1－4位分机号
		 */
		phone: function(element) {
			return /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(element.value);
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
		},
		/**email*/
		email: function(element) {
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(element.value);
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
		number: "这里必须填写数字哦！<br>如 12、1.2。",
		digits: "这里必须填写整数哦！<br>如 12。",
		email: "请输入正确格式的电子邮件！<br>如 bc@163.com。",
		phone: "请输入正确格式的电话号码！<br>如 13011112222、88887777、88887777-800、020-88887777-800。",
		url: "请输入正确格式的网址！<br>如 http://www.google.com。",
		date: "请输入正确格式的日期！<br>如 2011-01-01。",
		datetime: "请输入正确格式的日期时间！<br>如 2011-01-01 13:30。",
		time: "请输入正确格式的时间！<br>如 13:30。",
		maxLen: "这里至少需要输入 {0}个字符！",
		minLen: "这里最多只能输入 {0}个字符！",
		max: "这个值不能小于 {0}！",
		min: "这个值不能大于 {0}！"
	}
};
bc.page.quickbar={
	id:"#quickButtons",
	/**  
	 * 判断指定的模块当前是否已经加载
	 * @param mid 模块的id
	 */
	has: function(mid){
		return $(bc.page.quickbar.id).find(">a.quickButton[data-mid='" + mid + "']").length > 0;
	},
	/**  
	 * 激活已经加载的现有模块
	 * @param mid 模块的id
	 */
	active: function(mid){
		$(".ui-dialog>.ui-dialog-content[data-mid='" + mid + "']").parent().show()
		.end().siblings().toggleClass("ui-state-active",false)
		.end().dialog("moveToTop");
	},
	/**  
	 * 设置指定的模块开始加载中
	 * @param option 模块的配置
	 */
	loading: function(option){
		$(bc.page.quickbar.id).append('<a id="quickButton-'+option.mid
				+'" class="quickButton ui-corner-all ui-state-default" data-mid="'+option.mid
				+'" data-name="'+option.name+'">'
				+'<span class="ui-icon loading"></span>'
				+'<span class="text">正在加载：'+option.name+'</span></a>');
	},
	/**  
	 * 设置指定的模块加载完毕
	 * @param mid 模块的id
	 */
	loaded: function(mid){
		var $item = $(bc.page.quickbar.id).find(">a.quickButton[data-mid='" + mid + "']");
		$item.find(">span.text").text($item.attr("data-name"));
		$item.find(">span.ui-icon").removeClass("loading").addClass("ui-icon-folder-open");
		$item.toggleClass("ui-state-active",true).siblings().toggleClass("ui-state-active",false);
	}
};