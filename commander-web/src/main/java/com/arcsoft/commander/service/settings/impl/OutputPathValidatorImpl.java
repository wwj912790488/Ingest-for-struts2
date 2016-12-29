package com.arcsoft.commander.service.settings.impl;

import com.arcsoft.web4transcoder.service.setting.OutputPathValidator;

/**
 * Output path validator for checking path is valid or not.
 * 
 * @author fjli
 */
public class OutputPathValidatorImpl implements OutputPathValidator {

	@Override
	public boolean isValidOutputPath(String path) {
		// TODO: verify the path is valid or not.
		return true;
	}

}
