import {
  TX_TRANSITION_ACTOR_CUSTOMER as CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER as PROVIDER,
  CONDITIONAL_RESOLVER_WILDCARD,
  ConditionalResolver,
} from '../../transactions/transaction';

export const getStateDataForTokenProcess = (txInfo, processInfo) => {
  const { transaction, transactionRole, nextTransitions } = txInfo;
  const isProviderBanned = transaction?.provider?.attributes?.banned;
  const isCustomerBanned = transaction?.customer?.attributes?.banned;
  const _ = CONDITIONAL_RESOLVER_WILDCARD;

  const {
    processName,
    processState,
    states,
    transitions,
    isCustomer,
    actionButtonProps,
  } = processInfo;

  return new ConditionalResolver([processState, transactionRole])
    .cond([states.INQUIRY, CUSTOMER], () => {
      return { processName, processState, showInquiryDetails: true };
    })
    .cond([states.INQUIRY, PROVIDER], () => {
      return { processName, processState, showProviderDetails: true };
    })
    .cond([states.PREAUTHORIZED, CUSTOMER], () => {
      return { processName, processState, showPaymentDetails: true };
    })
    .cond([states.PREAUTHORIZED, PROVIDER], () => {
      const primary = isCustomerBanned ? null : actionButtonProps(transitions.ACCEPT, PROVIDER);
      const secondary = isCustomerBanned ? null : actionButtonProps(transitions.DECLINE, PROVIDER);
      return {
        processName,
        processState,
        showActionButtons: true,
        primaryButtonProps: primary,
        secondaryButtonProps: secondary,
      };
    })
    .cond([states.ACCEPTED, _], () => {
      return { processName, processState, showAcceptedDetails: true };
    })
    .cond([states.DECLINED, _], () => {
      return { processName, processState, showDeclinedMessage: true };
    })
    .cond([states.EXPIRED, _], () => {
      return { processName, processState, showExpiredMessage: true };
    })
    .cond([states.DELIVERED, _], () => {
      return { processName, processState, showDeliveredStatus: true };
    })
    .cond([states.CANCELLED, _], () => {
      return { processName, processState, showCancelledStatus: true };
    })
    .default(() => {
      return { processName, processState, showDefaultStatus: true };
    })
    .resolve();
};
