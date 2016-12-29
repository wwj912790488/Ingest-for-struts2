package com.arcsoft.commander.service.upgrade;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

/**
 * Package upgrade handler loader.
 * 
 * @author fjli
 */
public class PackageUpgradeHanderLoader implements UpgradeHandlerLoader {

	private String packageName;

	/**
	 * Set the package name of upgrade handlers;
	 * 
	 * @param packageName - the package name to set
	 */
	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	@Override
	public Map<Integer, UpgradeHandler> loadHandlers() {
		HashMap<Integer, UpgradeHandler> handlers = new HashMap<>();
		ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		try {
			ClassLoader loader = getClass().getClassLoader();
			Pattern pattern = Pattern.compile(".+/(([^/]+[^0-9])([0-9]+))\\.class$");
			if (packageName == null) {
				packageName = getClass().getName().replaceAll("\\.[^\\.]+$", "");
			}
			String path = "classpath:" + packageName.replace('.', '/') + "/*.class";
			Resource[] resources = resolver.getResources(path);
			for (int j = 0; j < resources.length; j++) {
				String filepath = resources[j].getURL().toExternalForm();
				Matcher m = pattern.matcher(filepath);
				if (m.matches()) {
					String name = packageName + "." + m.group(1);
					Class<?> clazz = loader.loadClass(name);
					if (UpgradeHandler.class.isAssignableFrom(clazz)) {
						Integer version = Integer.parseInt(m.group(3));
						handlers.put(version, (UpgradeHandler) clazz.newInstance());
					}
				}
			}
			return handlers;
		} catch (Exception e) {
			throw new RuntimeException("load upgrade handler failed.", e);
		}
	}

}
