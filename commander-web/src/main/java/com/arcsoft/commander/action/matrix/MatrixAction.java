package com.arcsoft.commander.action.matrix;

import java.util.List;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.matrix.Matrix;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.matrix.MatrixService;


/**
 * 
 * @author ybzhang
 */
public class MatrixAction extends BaseAction {

	private ServerGroup group;
	private MatrixService matrixService;
	private Matrix matrix;
	private String description;
	private int code;
	
	
	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	
	
	/**
	 * @return the code
	 */
	public int getCode() {
		return code;
	}
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	/**
	 * @param matrix the matrix to set
	 */
	public void setMatrix(Matrix matrix) {
		this.matrix = matrix;
	}
	
	
	/**
	 * @return the matrix
	 */
	public Matrix getMatrix() {
		return matrix;
	}
	
	/**
	 * @param matrixService the matrixService to set
	 */
	public void setMatrixService(MatrixService matrixService) {
		this.matrixService = matrixService;
	}

	public String init(){
		if(group != null){
			List<Matrix> list = matrixService.list(group.getId());
			if(list != null && !list.isEmpty())
				matrix = list.get(0);
		}
		
		if(matrix == null)
			matrix = new Matrix();
		return SUCCESS;
	}

	public String save(){
		if(matrix != null){
			matrix.setServerGroup(group);
			if(matrix.getId() == null)
				matrixService.save(matrix);
			else {
				matrixService.update(matrix);
			}
			this.description = getText("msg.success.save");
			code = 0;
		}
		return SUCCESS;
	}
	
	/**
	 * @return the group
	 */
	public ServerGroup getGroup() {
		return group;
	}


	
	/**
	 * @param group the group to set
	 */
	public void setGroup(ServerGroup group) {
		this.group = group;
	}
}
