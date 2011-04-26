/**
 * 表单及表格常用函数
 * 
 * @author rongjihuang@gmail.com
 * @date 2011-04-24
 */
bc.page = {
	/**创建窗口
	 * @param url 窗口包含的html内容
	 */
	newWin: function(url,data) {
		logger.info("newWin:loading html from url=" + url);
		bc.ajax({
			url : url, data: data || null,
			dataType : "text",
			success : function(html) {
				logger.info("success loaded html");
				var $dom = $(html);
				function _init(){
					//从dom构建并显示桌面组件
					var option = jQuery.parseJSON($dom.attr("data-option"));	
					option.dialogClass=option.dialogClass || "bc-ui-dialog";
					$dom.dialog(bc.page._rebuildWinOption.call($dom,option))
					.bind("dialogclose",function(event,ui){
						logger.debug("dialogclose");
						$(this).dialog("destroy").remove();//彻底删除所有相关的dom元素
					}).attr("data-src",url);
					
					//插入最大化|还原按钮、最小化按钮
					if(option.maximize !== false){
						//$dom.dialog(
					}
					
					//执行组件指定的额外初始化方法，上下文为$dom
					var method = $dom.attr("data-initMethod");
					logger.debug("initMethod="+method);
					if(method){
						method = bc.getNested(method);
						logger.debug("initMethodType=" + (typeof method));
						if(typeof method == "function"){
							method.call($dom, option);
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
	/**重新加载窗口
	 * @param url 窗口包含的html内容
	 */
	reloadWin: function(url,data) {
		logger.info("reloadWin:loading html from url=" + url);
		bc.ajax({
			url : url, data: data || null,
			dataType : "text",
			success : function(html) {
				logger.info("reloadWin:success loaded html");
				var $dom = $(html);
				//TODO
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
		var data = $form.serialize();
		bc.ajax({
			url: url, data: data, dataType: "json",
			success: function(json) {
				if(logger.debugEnabled)logger.debug("save success.json=" + jQuery.param(json));
				if(json.id){
					$form.find("input[name='b.id']").val(json.id);
				}
				bc.msg.alert(json.msg);
			}
		});
		
	},
	/**删除*/
	delete_: function() {
		var url=$(this).attr("data-action-delete");
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
			bc.msg.alert("请先选择要删除的条目！");
			return;
		}
		bc.ajax({
			url: url, data: data, dataType: "json",
			success: function(json) {
				if(logger.debugEnabled)logger.debug("delete success.json=" + jQuery.param(json));
				bc.msg.alert(json.msg || "must defined msg.");
				//重新加载列表
				bc.page.reload();
			}
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
		bc.page.newWin( $(this).attr("data-action-create"));
	},
	/**编辑*/
	edit: function(){
		logger.info("bc.page.edit");
		var url=$(this).attr("data-action-edit");
		logger.info("bc.page.edit: url=" + url);
		var $tds = $("table.list>tbody>tr.ui-state-focus>td.id",this);
		if($tds.length == 1){
			var data = "id=" + $tds.attr("data-id");
			if(logger.infoEnabled) logger.info("bc.page.edit: data=" + data);
			bc.page.newWin(url,data);
		}else if($tds.length > 1){
			bc.msg.alert("一次只可以编辑一条信息，请确认您只选择了一条信息！");
		}else{
			bc.msg.alert("请先选择要编辑的条目！");
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

//测试用的函数
function testFN(){
	logger.info("testFN");
}