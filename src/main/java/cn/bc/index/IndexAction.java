/**
 * 
 */
package cn.bc.index;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author dragon
 * 
 */
public class IndexAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private static Log logger = LogFactory.getLog(IndexAction.class);
	private String msg;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String execute() throws Exception {
		logger.debug("IndexAction.execute");
		msg = "Hello World in BC!";
		return SUCCESS;
	}
}
