package com.arcsoft.commander.security;

import java.io.IOException;
import java.util.Locale;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.LocaleResolver;

/**
 * This is used to set locale
 * 
 * @author hxiang
 */
public class I18NFilter extends OncePerRequestFilter {

	private LocaleResolver localeResolver;

	public LocaleResolver getLocaleResolver() {
		return localeResolver;
	}

	public void setLocaleResolver(LocaleResolver localeResolver) {
		this.localeResolver = localeResolver;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
	
		Locale newLocale = localeResolver.resolveLocale(request);

		if (newLocale != null)
			LocaleContextHolder.setLocale(newLocale);

		try {
			filterChain.doFilter(request, response);
		} finally {
			LocaleContextHolder.resetLocaleContext();
		}
	}
}
