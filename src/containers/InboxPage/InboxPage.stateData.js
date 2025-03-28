import { bool, shape, string } from 'prop-types';
import {
  BOOKING_PROCESS_NAME,
  INQUIRY_PROCESS_NAME,
  PURCHASE_PROCESS_NAME,
  resolveLatestProcessName,
  getProcess,
  TOKEN_PROCESS_NAME,
} from '../../transactions/transaction';

import { getStateDataForBookingProcess } from './InboxPage.stateDataBooking.js';
import { getStateDataForInquiryProcess } from './InboxPage.stateDataInquiry.js';
import { getStateDataForPurchaseProcess } from './InboxPage.stateDataPurchase.js';
import { getInboxDataForTokenProcess } from './InboxPage.stateDataToken.js';


export const stateDataShape = shape({
  processName: string.isRequired,
  processState: string.isRequired,
  actionNeeded: bool,
  isFinal: bool,
  isSaleNotification: bool,
});

// Translated name of the state of the given transaction
export const getStateData = params => {
  const { transaction } = params;
  const processName = resolveLatestProcessName(transaction?.attributes?.processName);
  const process = getProcess(processName);

  const processInfo = () => {
    const { getState, states } = process;
    const processState = getState(transaction);
    return {
      processName,
      processState,
      states,
    };
  };

  if (processName === PURCHASE_PROCESS_NAME) {
    return getStateDataForPurchaseProcess(params, processInfo());
  } else if (processName === BOOKING_PROCESS_NAME) {
    return getStateDataForBookingProcess(params, processInfo());
  } else if (processName === INQUIRY_PROCESS_NAME) {
    return getStateDataForInquiryProcess(params, processInfo());
  } else if (processName === TOKEN_PROCESS_NAME) {
    return getInboxDataForTokenProcess(params,processInfo())
  } else {
    return {};
  }
};
