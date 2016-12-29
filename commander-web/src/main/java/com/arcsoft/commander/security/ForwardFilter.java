package com.arcsoft.commander.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;


/**
 * 
 * @author hxiang
 */
public class ForwardFilter extends OncePerRequestFilter {

	private Map<String, String> forwardMap = new HashMap<String,String>();
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String uri = request.getServletPath();
		if (forwardMap.containsKey(uri)){
			RequestDispatcher dispatcher = request.getRequestDispatcher(forwardMap.get(uri));
			dispatcher.forward(request, response);
			return;
		}
		filterChain.doFilter(request, response);
	}
	
	public Map<String, String> getForwardMap() {
		return forwardMap;
	}
	
	public void setForwardMap(Map<String, String> forwardMap) {
		this.forwardMap = forwardMap;
	}

}
