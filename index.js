const reduxPersist = require('redux-persist');
const traverse = require('traverse');

const PERSIST_EXPIRE_DATE_DEFAULT_KEY = 'persistExpiresAt';
const PERSIST_EXPIRE_STATE_DEFAULT_KEY = 'stateAfterExpiration';

module.exports = function (config) {
  config = config || {};
  config.expireDateKey = config.expireDateKey || PERSIST_EXPIRE_DATE_DEFAULT_KEY;
  config.expireStateKey = config.expireStateKey || PERSIST_EXPIRE_STATE_DEFAULT_KEY;
  config.defaultState = config.defaultState || {};

  function dateToUnix(date) {
    return +(date.getTime() / 1000).toFixed(0);
  }

  function inbound(state) {
    if (!state) return state;

    return state;
  }

  function outbound(state) {
    if (!state) return state;

    const validState = traverse(state).forEach(function (value) {
      if (!value || typeof value !== 'object') {
        return;
      }

      if (!value.hasOwnProperty(config.expireDateKey)) {
        return;
      }

      const expireDate = value[config.expireDateKey];

      if (!expireDate) {
        return;
      }

      const stateAfterExpiration = value[config.expireStateKey] || config.defaultState;

      if (dateToUnix(new Date(expireDate)) < dateToUnix(new Date())) {
        this.update(stateAfterExpiration);
      }
    });

    return validState;
  }

  return reduxPersist.createTransform(inbound, outbound);
};
