/**
 * 
 */
package cn.bc.index;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import cn.bc.web.ui.html.menu.Menu;
import cn.bc.web.ui.html.menu.MenuItem;

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

		// 找到顶层模块
		Map<Module, List<Module>> parentChildren = new LinkedHashMap<Module, List<Module>>();
		List<Module> topModules = this.findTopModules(modules, parentChildren);

		// 循环顶层模块生成菜单
		Menu menu = this.buildMenu4Modules(topModules, parentChildren);
		menu.addClazz("startMenu");

		this.startMenu = menu.toString();
		return SUCCESS;
	}

	private List<Module> findTopModules(Set<Module> modules,
			Map<Module, List<Module>> parentChildren) {
		List<Module> topModules = new ArrayList<Module>();
		for (Module m : modules) {
			this.dealParentChildren(m, parentChildren, topModules);
		}
		return topModules;
	}

	private void dealParentChildren(Module m,
			Map<Module, List<Module>> parentChildren, List<Module> topModules) {
		Module parent = m.getBelong();
		if (parent != null) {// 有隶属的父模块
			List<Module> childModules = parentChildren.get(parent);
			if (childModules == null) {
				childModules = new ArrayList<Module>();
				parentChildren.put(parent, childModules);
			}
			childModules.add(m);

			this.dealParentChildren(parent, parentChildren, topModules);
		} else {// 顶层模块
			topModules.add(m);
		}
	}

	private Menu buildMenu4Modules(List<Module> modules,
			Map<Module, List<Module>> parentChildren) {
		Menu menu = new Menu();
		MenuItem menuItem;
		for (Module m : modules) {
			menuItem = buildMenuItem4Module(m, parentChildren);
			menu.addMenuItem(menuItem);
		}
		return menu;
	}

	private MenuItem buildMenuItem4Module(Module m,
			Map<Module, List<Module>> parentChildren) {
		MenuItem menuItem;
		A a;
		menuItem = new MenuItem();
		menuItem.setAttr("data-type", String.valueOf(m.getType()));
		a = new A();
		if (m.getUrl() != null && m.getUrl().length() > 0)
			a.setAttr("href", m.getUrl());
		else
			a.setAttr("href", "#");
		menuItem.setA(a);
		if (m.getType() == Module.TYPE_FOLDER) {// 文件夹
			List<Module> childModules = parentChildren.get(m);// 模块下的子模块
			if (childModules != null && !childModules.isEmpty()) {
				menuItem.setChildMenu(buildMenu4Modules(childModules,
						parentChildren));
			}
		}
		return menuItem;
	}
}
