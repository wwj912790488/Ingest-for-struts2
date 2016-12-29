package com.arcsoft.commander.validator.setting;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.opensymphony.xwork2.validator.ValidationException;
import com.opensymphony.xwork2.validator.validators.FieldValidatorSupport;

/**
 * Validate subnet mask.
 *
 * @author hxiang
 */
public class SubnetMaskValidator extends FieldValidatorSupport {

	@Override
	public void validate(Object object) throws ValidationException {
        String fieldName = getFieldName();
        String value = getFieldValue(fieldName, object).toString();
        
        //first submask is a ip.
        if (value == null || value.length() <= 0)
            return;
        
        Pattern pattern = Pattern.compile("^(?:(?:\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])$");
        Matcher matcher = pattern.matcher(value);
        if (!matcher.matches()){
        	addFieldError(fieldName, object);
        	return;
        }
        
        String[] list = value.split("\\.");
        String binaryString = "";
        for (int i = 0; i < list.length; i++){
        	Integer num = Integer.parseInt(list[i]);
        	String str = Integer.toBinaryString(num);
        	if (str.length() < 8){
        		for (int j = 0; j < 8 - str.length(); j++){
        			binaryString += "0";
        		}
        	}
        	binaryString += str;
        }
        if (binaryString.contains("01")){
        	addFieldError(fieldName, object);
        	return;
        }
	}

}
