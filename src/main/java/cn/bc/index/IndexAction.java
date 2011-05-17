/**
 * 
 */
package cn.bc.index;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.bc.core.exception.CoreException;
import cn.bc.desktop.domain.PersonalConfig;
import cn.bc.desktop.domain.Shortcut;
import cn.bc.desktop.service.PersonalConfigService;
import cn.bc.desktop.service.ShortcutService;
import cn.bc.identity.domain.Actor;
import cn.bc.identity.service.ActorService;
import cn.bc.security.domain.Module;
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
	private PersonalConfigService personalConfigService;
	private List<Shortcut> shortcuts;
	private String startMenu;// 开始菜单
	private PersonalConfig personalConfig;//个人配置
	
	@Autowired
	public void setShortcutService(ShortcutService shortcutService) {
		this.shortcutService = shortcutService;
	}

	@Autowired
	public void setActorService(ActorService actorService) {
		this.actorService = actorService;
	}

	@Autowired
	public void setPersonalConfigService(PersonalConfigService personalConfigService) {
		this.personalConfigService = personalConfigService;
	}

	public PersonalConfig getPersonalConfig() {
		return personalConfig;
	}

	public void setPersonalConfig(PersonalConfig personalConfig) {
		this.personalConfig = personalConfig;
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
		
		//个人配置
		this.personalConfig = this.personalConfigService.loadByActor(user.getId(),true);
		if (this.personalConfig == null)
			throw new CoreException("缺少配置信息！");

		//快捷方式
		Set<Module> modules = new LinkedHashSet<Module>();// 有权限使用的模块
		this.shortcuts = this.shortcutService.findByActor(user.getId(), null,
				null, modules);
		if (logger.isDebugEnabled()) {
			logger.debug("shortcuts=" + shortcuts.size());
			int i = 0;
			for (Module m : modules) {
				logger.debug(++i + ") " + m);
			}
		}

		// 找到顶层模块
		Map<Module, Set<Module>> parentChildren = new LinkedHashMap<Module, Set<Module>>();
		Set<Module> topModules = this.findTopModules(modules, parentChildren);
		if (logger.isDebugEnabled()) {
			int i = 0;
			for (Module m : topModules) {
				logger.debug(++i + ") " + m);
			}
			i = 0;
			for (Entry<Module, Set<Module>> m : parentChildren.entrySet()) {
				logger.debug(++i + ") " + m.getKey() + " "
						+ m.getValue().size());
			}
		}

		// 循环顶层模块生成菜单
		Menu menu = this.buildMenu4Modules(topModules, parentChildren);
		menu.addClazz("startMenu");

		this.startMenu = menu.toString();
		if (logger.isDebugEnabled())
			logger.debug("startMenu=" + startMenu);
		return SUCCESS;
	}

	private Set<Module> findTopModules(Set<Module> modules,
			Map<Module, Set<Module>> parentChildren) {
		Set<Module> topModules = new LinkedHashSet<Module>();
		for (Module m : modules) {
			this.dealParentChildren(m, parentChildren, topModules);
		}
		return topModules;
	}

	private void dealParentChildren(Module m,
			Map<Module, Set<Module>> parentChildren, Set<Module> topModules) {
		Module parent = m.getBelong();
		if (parent != null) {// 有隶属的父模块
			Set<Module> childModules = parentChildren.get(parent);
			if (childModules == null) {
				childModules = new LinkedHashSet<Module>();
				parentChildren.put(parent, childModules);
			}
			childModules.add(m);

			this.dealParentChildren(parent, parentChildren, topModules);
		} else {// 顶层模块
			topModules.add(m);
		}
	}

	private Menu buildMenu4Modules(Set<Module> modules,
			Map<Module, Set<Module>> parentChildren) {
		Menu menu = new Menu();
		MenuItem menuItem;
		for (Module m : modules) {
			menuItem = buildMenuItem4Module(m, parentChildren);
			menu.addMenuItem(menuItem);
		}
		return menu;
	}

	private MenuItem buildMenuItem4Module(Module m,
			Map<Module, Set<Module>> parentChildren) {
		MenuItem menuItem;
		menuItem = new MenuItem();
		menuItem.setUrl(m.getUrl()).setLabel(m.getName())
				.setType(String.valueOf(m.getType())).setAction("menuItem")
				.setAttr("data-mid", m.getId().toString());//.addStyle("z-index", "10000");
		if (m.getType() == Module.TYPE_FOLDER) {// 文件夹
			Set<Module> childModules = parentChildren.get(m);// 模块下的子模块
			if (childModules != null && !childModules.isEmpty()) {
				menuItem.setChildMenu(buildMenu4Modules(childModules,
						parentChildren));
			}
		}
		return menuItem;
	}
}
