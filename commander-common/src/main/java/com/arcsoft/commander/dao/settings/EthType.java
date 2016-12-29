package com.arcsoft.commander.dao.settings;

public interface EthType {

	public static final int NOT_SET = 0;

	public static final int PRIMARY_INPUT = 1;
	public static final int SECONDARY_INPUT = 2;
	public static final int ALL_INPUT = PRIMARY_INPUT | SECONDARY_INPUT;

	public static final int PRIMARY_OUTPUT = 4;
	public static final int SECONDARY_OUTPUT = 8;
	public static final int ALL_OUTPUT = PRIMARY_OUTPUT | SECONDARY_OUTPUT;

}
