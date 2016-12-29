package com.arcsoft.commander.agent.service.settings;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.settings.network.BondAndUpdateEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.BondAndUpdateEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.StatEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.StatEthResponse;
import com.arcsoft.commander.dao.settings.EthDao;
import com.arcsoft.commander.dao.settings.impl.EthDaoImplRHEL;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.service.settings.LocalEthService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * This service processes all Ethernet settings requests.
 * 
 * @author xpeng
 * @author fjli
 */
public class EthService implements ActionHandler {
	private Logger log = Logger.getLogger(EthService.class);

	private LocalEthService localEthService;

	public void setLocalEthService(LocalEthService localEthService) {
		this.localEthService = localEthService;
	}

	/**
	 * Returns all Ethernet settings requests.
	 */
	@Override
	public int[] getActions() {
		return new int[] { Actions.NETWORK_LIST, Actions.NETWORK_STAT, Actions.NETWORK_SAVE, Actions.NETWORK_BOND };
	}

	/**
	 * Receive Ethernet settings requests, and dispatch request to process methods.
	 * 
	 * @param request - the task request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof ListEthRequest) {
			return listEths();
		} else if (request instanceof StatEthRequest) {
			return getEthStat((StatEthRequest) request);
		} else if (request instanceof SaveEthRequest) {
			return saveEth((SaveEthRequest) request);
		} else if (request instanceof BondAndUpdateEthRequest) {
			return bondEths((BondAndUpdateEthRequest) request);
		}
		return null;
	}

	/**
	 * Get all Ethernets list.
	 * 
	 * @return returns response including the Ethernets list.
	 */
	private ListEthResponse listEths() {
		ListEthResponse resp = new ListEthResponse();
		try {
			List<Eth> eths = localEthService.findAllEths();
			resp.setEths(eths);
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}

	/**
	 * Get used rate of the specified Ethernet.
	 * 
	 * @param request - the used rate request
	 * @return returns response including the used rate.
	 */
	private StatEthResponse getEthStat(StatEthRequest request) {
		StatEthResponse resp = new StatEthResponse();
		try {
			resp.setUsedRate(localEthService.getEthUsedRate(request.getEthId()));
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}

	/**
	 * Save Ethernet settings.
	 * 
	 * @param request - the save request
	 * @return returns response indicating the action is success or not.
	 */
	private SaveEthResponse saveEth(SaveEthRequest request) {
		SaveEthResponse resp = new SaveEthResponse();
		try {
			localEthService.updateEth(request.getEth());
			List<Eth> eths = new ArrayList<Eth>();
			eths.add(request.getEth());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}

	private Eth getBackupEth(List<Eth> allEths, Eth srcEth) {
		Eth ret = null;
		if (srcEth.getMaster() != null) {
			for (Eth e : allEths) {
				if (srcEth.getId().equals(e.getId()))
					continue;
				if (srcEth.getMaster().equals(e.getMaster())) {
					ret = e;
					break;
				}
			}
		}
		return ret;
	}

	private String getBondId(List<Eth> eths) {
		String ret = null;
		for (int i = 0; i < 16; i++) {
			ret = "bond" + i;
			boolean exist = false;
			for (Eth eth : eths) {
				if (eth.getId().equals(ret)) {
					exist = true;
					break;
				}
			}
			if (!exist)
				break;
		}
		return ret;
	}

	/**
	 * Bond Ethernets.
	 * 
	 * @param request - the bond request
	 * @return returns response indicating the action is success or not.
	 */
	private BondAndUpdateEthResponse bondEths(BondAndUpdateEthRequest request) {
		BondAndUpdateEthResponse resp = new BondAndUpdateEthResponse();

		EthDao ethDao = new EthDaoImplRHEL();
		try {
			Eth eth = request.getEth();
			String slaveId = request.getSlaveId();
			List<Eth> eths = ethDao.findAllEths();
			Eth eth1 = null;
			Eth eth2 = null;
			for (Eth theEth : eths) {
				if (theEth.getId().equals(eth.getId())) {
					eth1 = theEth;
				}
				if (slaveId != null && theEth.getId().equals(slaveId)) {
					eth2 = theEth;
				}
			}
			if (eth1 == null || (slaveId != null && eth2 == null)) {
				log.error("can not find the eth");
				throw new IOException("input parameter is error");
			}

			List<Eth> ethsToSaved = new ArrayList<Eth>();
			if (eth1.getMaster() != null) {
				// the eth is already bonded.
				Eth backEth = getBackupEth(eths, eth1);
				if (slaveId == null) {
					// ubound the already bonded.
					Eth master = new Eth(eth1.getMaster());
					ethDao.bond(master, null);
					ethDao.updateEth(eth);
					ethsToSaved.add(master);
					ethsToSaved.add(eth);
				} else {
					if (slaveId.equals(backEth.getId())) {
						// update the bond's info.
						eth.setId(eth1.getMaster());
						eth.setIsbond(true);
						ethDao.updateEth(eth);
						ethsToSaved.add(eth);
					} else {
						// ubound the already bounded.
						Eth master = new Eth(eth1.getMaster());
						ethDao.bond(master, null);
						// newly bond
						String slaveId1 = eth.getId();
						eth.setId(getBondId(eths));
						ethDao.bond(eth, new String[] { slaveId1, slaveId });

						ethsToSaved.add(master);
						ethsToSaved.add(eth);
						// clean slaves functions
						ethsToSaved.add(new Eth(slaveId1));
						ethsToSaved.add(new Eth(slaveId));
					}
				}
			} else {
				if (slaveId == null) {
					ethDao.updateEth(eth);
				} else {
					String slaveId1 = eth.getId();
					eth.setId(getBondId(eths));
					ethDao.bond(eth, new String[] { slaveId1, slaveId });
					// clean slaves functions
					ethsToSaved.add(new Eth(slaveId1));
					ethsToSaved.add(new Eth(slaveId));
				}
				ethsToSaved.add(eth);
			}
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}
}
