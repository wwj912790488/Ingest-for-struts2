package com.arcsoft.commander.action;

import com.arcsoft.arcvideo.orm.query.Pager;

/**
 * Page control.
 * 
 * @author fjli
 */
public interface PageControl {

	Pager getPager();

	void setPager(Pager pager);

}
