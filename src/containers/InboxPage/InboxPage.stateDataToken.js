import {
  TX_TRANSITION_ACTOR_CUSTOMER as CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER as PROVIDER,
  CONDITIONAL_RESOLVER_WILDCARD,
  ConditionalResolver,
} from '../../transactions/transaction';

// Get Inbox data mapped to specific transaction state & role
export const getInboxDataForTokenProcess = (txInfo, processInfo) => {
  const { transactionRole } = txInfo;
  const { processName, processState, states } = processInfo;
  const _ = CONDITIONAL_RESOLVER_WILDCARD;

  return new ConditionalResolver([processState, transactionRole])
    .cond([states.INQUIRY, CUSTOMER], () => {
      return { processName, processState, messageType: 'inquiry', actionRequired: true };
    })
    .cond([states.INQUIRY, PROVIDER], () => {
      return { processName, processState, messageType: 'inquiry', actionRequired: false };
    })
    .cond([states.PREAUTHORIZED, CUSTOMER], () => {
      return { processName, processState, messageType: 'payment_pending', actionRequired: true };
    })
    .cond([states.PREAUTHORIZED, PROVIDER], () => {
      return { processName, processState, messageType: 'pending_acceptance', actionRequired: true };
    })
    .cond([states.ACCEPTED, _], () => {
      return { processName, processState, messageType: 'accepted', actionRequired: false };
    })
    .cond([states.DECLINED, _], () => {
      return {
        processName,
        processState,
        messageType: 'declined',
        actionRequired: false,
        isFinal: true,
      };
    })
    .cond([states.EXPIRED, _], () => {
      return {
        processName,
        processState,
        messageType: 'expired',
        actionRequired: false,
        isFinal: true,
      };
    })
    .cond([states.DELIVERED, _], () => {
      return { processName, processState, messageType: 'delivered', actionRequired: true };
    })
    .cond([states.CANCELLED, _], () => {
      return {
        processName,
        processState,
        messageType: 'cancelled',
        actionRequired: false,
        isFinal: true,
      };
    })
    .default(() => {
      return { processName, processState, messageType: 'general_update', actionRequired: false };
    })
    .resolve();
};
