/**
 * 
 */
package cn.bc.index;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeMap;

import ognl.Node;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.bc.desktop.domain.Shortcut;
import cn.bc.desktop.service.ShortcutService;
import cn.bc.identity.domain.Actor;
import cn.bc.identity.service.ActorService;
import cn.bc.security.domain.Module;
import cn.bc.web.ui.html.A;
import cn.bc.web.ui.html.Li;
import cn.bc.web.ui.html.Text;
import cn.bc.web.ui.html.Ul;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author dragon
 * 
 */
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class IndexAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private static Log logger = LogFactory.getLog(IndexAction.class);
	private String msg;
	private ActorService actorService;
	private ShortcutService shortcutService;
	private List<Shortcut> shortcuts;
	private String startMenu;// 开始菜单

	@Autowired
	public void setShortcutService(ShortcutService shortcutService) {
		this.shortcutService = shortcutService;
	}

	@Autowired
	public void setActorService(ActorService actorService) {
		this.actorService = actorService;
	}

	public String getStartMenu() {
		return startMenu;
	}

	public void setStartMenu(String startMenu) {
		this.startMenu = startMenu;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public List<Shortcut> getShortcuts() {
		return shortcuts;
	}

	public void setShortcuts(List<Shortcut> shortcuts) {
		this.shortcuts = shortcuts;
	}

	public String execute() throws Exception {
		logger.debug("IndexAction.execute");
		msg = "Hello World in BC!";

		String userLoginName = "admin";
		Actor user = this.actorService.loadByCode(userLoginName);

		Set<Module> modules = new LinkedHashSet<Module>();// 有权限使用的模块
		this.shortcuts = this.shortcutService.findByActor(user.getId(), null,
				null, modules);
		logger.debug("shortcuts=" + shortcuts.size());

		// 生成导航菜单
		Ul menu,childMenu;
		Li li;
		menu = new Ul();
		menu.addClazz("startMenu");
		for (Module m : modules) {
			if(m.getType() != Module.TYPE_FOLDER){//链接
				
			}else{//文件夹
				
			}
		}
		
		TreeMap tree;
		Node node;
		this.startMenu = menu.toString();
		return SUCCESS;
	}
	
	private Ul addLi(Module module){
		Li li = new Li();
		
		//添加基本连接
		A a = new A();
		if(module.getUrl() != null && module.getUrl().length() > 0)
			a.setAttr("href", module.getUrl());
		else
			a.setAttr("href", "#");
		a.addChild(new Text(module.getName()));
		li.addChild(a);
		
		//添加子菜单
		Ul ul = null;
		if(module.getBelong() != null){
			//Ul pui = addLi(module.getBelong());
			//ul.addChild(li);
		}else{
			ul = new Ul();
			ul.addChild(li);
		}
		
		return ul;
	}
}
