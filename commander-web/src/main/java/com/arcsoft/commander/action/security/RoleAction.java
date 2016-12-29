package com.arcsoft.commander.action.security;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.commander.domain.security.Role;
import com.arcsoft.commander.exception.security.RoleNameExistsException;
import com.arcsoft.commander.service.security.RoleService;


/**
 * 
 * @author ybzhang
 */
public class RoleAction extends BaseAction implements PageControl {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5283356502072326527L;
	
	private RoleService roleService;

	private Role role;
	
	private Integer id;
	
	private List<Role> list;
	private String selectedResources;
	private Pager pager;
	private String keyword;
	
	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the role
	 */
	public Role getRole() {
		return role;
	}
	
	/**
	 * @param role the role to set
	 */
	public void setRole(Role role) {
		this.role = role;
	}

	/**
	 * @param roleService the roleService to set
	 */
	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}
	

	
	/**
	 * @return the list
	 */
	public List<Role> getList() {
		return list;
	}

	public String update(){
		try{
			String[] strReses = selectedResources.split(",");
			List<Integer> operIDList = new ArrayList<Integer>();
			for(int i = 0; i < strReses.length;i++){
				if(!strReses[i].trim().equals(""))
					operIDList.add(Integer.parseInt(strReses[i]));
			}
			roleService.update(role,operIDList.toArray(new Integer[]{}));
		} catch(RoleNameExistsException e) {
			this.addActionError(getText("security.role.error.name.exist"));
		}catch(Exception e){
			this.addActionError(getText("msg.error.edit.fail"));
		}
		
		return SUCCESS;
	}
	
	public String save(){
		try{
			String[] strReses = selectedResources.split(",");
			List<Integer> operIDList = new ArrayList<Integer>();
			for(int i = 0; i < strReses.length;i++){
				if(!strReses[i].trim().equals(""))
					operIDList.add(Integer.parseInt(strReses[i]));
			}
			roleService.save(role,operIDList.toArray(new Integer[]{}));
		} catch(RoleNameExistsException e) {
			this.addActionError(getText("security.role.error.name.exist"));
		}catch(Exception e){
			this.addActionError(getText("msg.error.add.fail"));
		}
		
		return SUCCESS;
	}
	
	public String newRole(){
		this.role = new Role();
		return SUCCESS;
	}
	
	public String delete(){
		roleService.delete(role);
		return SUCCESS;
	}

	public String forward() {
		return SUCCESS;
	}
	
	@SuppressWarnings("unchecked")
	public String list(){
		QueryInfo info = new QueryInfo();
		List<Condition> conditions = new ArrayList<>();
		conditions.add(Condition.ne("id", Integer.valueOf(1)));
		conditions.add(Condition.eq("isEnabled", Boolean.valueOf(true)));
		if (keyword != null && keyword.length() > 0) {
			keyword = keyword.trim();
			String likeKeyword = "%" + keyword + "%";
			conditions.add(Condition.like("name", likeKeyword));
		}
		
		info.setCondition( Condition.and(conditions));
		info.addSortOrder(SortOrder.desc("id"));
		pager = roleService.getRoles(info,getPager().getPageIndex(),getPager().getPageSize());
		list = pager.getResult();
		return SUCCESS;
	}

	
	/**
	 * @param selectedResources the selectedResources to set
	 */
	public void setSelectedResources(String selectedResources) {
		this.selectedResources = selectedResources;
	}

	
	/**
	 * @return the pager
	 */
	@Override
	public Pager getPager() {
		if(pager == null)
			pager = new Pager();
		return pager;
	}

	
	/**
	 * @param pager the pager to set
	 */
	@Override
	public void setPager(Pager pager) {
		this.pager = pager;
	}

	
	/**
	 * @return the keyword
	 */
	public String getKeyword() {
		return keyword;
	}

	
	/**
	 * @param keyword the keyword to set
	 */
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

}
