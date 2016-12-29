package com.arcsoft.commander.action.matrix;

import com.arcsoft.commander.action.BaseAction;


/**
 * 
 * @author ybzhang
 */
public class SelectPortAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6223241918445166607L;

	private int portCount;
	private int colCount;
	private int rowCount;
	
	
	/**
	 * @return the colCount
	 */
	public int getColCount() {
		return colCount;
	}
	
	
	/**
	 * @return the rowCount
	 */
	public int getRowCount() {
		return rowCount;
	}
	
	/**
	 * @param portCount the portCount to set
	 */
	public void setPortCount(int portCount) {
		this.portCount = portCount;
	}
	
	/**
	 * @return the portCount
	 */
	public int getPortCount() {
		return portCount;
	}
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		colCount =  (int)(Math.sqrt(portCount) + 0.99999999999D);
		rowCount = (int)((portCount * 1.0 / colCount) + 0.99999999999D);
		return SUCCESS;
	}
	
	
}
