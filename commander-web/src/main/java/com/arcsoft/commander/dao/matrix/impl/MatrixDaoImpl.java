package com.arcsoft.commander.dao.matrix.impl;

import java.util.List;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.commander.dao.matrix.MatrixDao;
import com.arcsoft.commander.domain.matrix.Matrix;


/**
 * 
 * @author ybzhang
 */
public class MatrixDaoImpl extends DatabaseDaoHibernateSupport<Matrix, Integer> implements MatrixDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<Matrix> list(Integer groupId) {
		// TODO Auto-generated method stub
		if(groupId != null)
			return getHibernateTemplate().find("from Matrix m where m.serverGroup.id = ?",new Object[]{groupId});
		return null;
	}

}
