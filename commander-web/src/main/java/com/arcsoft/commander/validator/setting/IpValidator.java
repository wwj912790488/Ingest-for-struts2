package com.arcsoft.commander.validator.setting;

import java.util.regex.Pattern;

import  java.util.regex.Matcher;

import com.opensymphony.xwork2.validator.ValidationException;
import com.opensymphony.xwork2.validator.validators.FieldValidatorSupport;

/**
 * Validate ip.
 *
 * @author hxiang
 */
public class IpValidator extends FieldValidatorSupport {

	@Override
	public void validate(Object object) throws ValidationException {
        String fieldName = getFieldName();
        String value = getFieldValue(fieldName, object).toString();
        
        if (value == null || value.length() <= 0)
            return;
        
        Pattern pattern = Pattern.compile("^(?:(?:\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])$");
        Matcher matcher = pattern.matcher(value);
        if (!matcher.matches()){
        	addFieldError(fieldName, object);
        }
	}

}
