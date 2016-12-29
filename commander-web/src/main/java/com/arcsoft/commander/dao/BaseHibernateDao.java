package com.arcsoft.commander.dao;

import org.apache.log4j.Logger;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * Base hibernate dao. This class define some common methods or fields.
 * 
 * @author fjli
 */
public class BaseHibernateDao extends HibernateDaoSupport {

	/**
	 * Logger instance for current service.
	 */
	protected Logger LOG = Logger.getLogger(getClass());

}
