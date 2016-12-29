package com.arcsoft.commander.validator.setting;

import com.opensymphony.xwork2.validator.ValidationException;
import com.opensymphony.xwork2.validator.validators.FieldValidatorSupport;

/**
 * Validate dport of firewall rule.
 * 
 * @author hxiang
 */
public class PortRangeValidator extends FieldValidatorSupport {

	private String separators = "";

	public String getSeparators() {
		return separators;
	}

	public void setSeparators(String separators) {
		this.separators = separators;
	}

	@Override
	public void validate(Object object) throws ValidationException {
		String fieldName = getFieldName();
		String value = getFieldValue(fieldName, object).toString();
		try{
			
			if (value == null || value.length() <= 0){
				addFieldError(fieldName, object);
				return;
			}
			// check the range of port
			String separator = findSeparator(value);
			if (!separator.isEmpty()) {
				String[] strPorts = value.split("\\" + separator);
				int port_start = new Integer(strPorts[0]);
				int port_end = new Integer(strPorts[1]);

				if (port_start < 0 || port_start > 65535) {
					addFieldError(fieldName, object);
					return;
				}

				if (port_end < 0 || port_end > 65535) {
					addFieldError(fieldName, object);
					return;
				}
			} else {// just port
				int port = new Integer(value);
				if (port < 0 || port > 65535) {
					addFieldError(fieldName, object);
					return;
				}
			}
		}catch(NumberFormatException e){
			addFieldError(fieldName, object);
			return;
		}
	}

	private String findSeparator(String text) {
		String ret = ""; 
		for (String each : separators.split(",")) {
			each = each.replace("\"", "");
			if (text.contains(each)) {
				ret = each;
				break;
			}
		}
		return ret;
	}
}
