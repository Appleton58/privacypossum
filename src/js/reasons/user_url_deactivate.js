"use strict";

[(function(exports) {

const {USER_URL_DEACTIVATE, NO_ACTION} = require('../constants'),
    {setResponse, sendUrlDeactivate} = require('./utils'),
    {Action} = require('../schemes');

async function onUserUrlDeactivate({store, tabs}, {url, tabId}) {
  await store.updateUrl(url, currentAction => {
    let action;
    if (currentAction.reason === USER_URL_DEACTIVATE) {
      action = currentAction.getData('deactivatedAction');
    } else {
      action = new Action(USER_URL_DEACTIVATE, {
        href: url,
        deactivatedAction: currentAction,
      });
    }
    tabs.markAction(action, url, tabId);
    return action;
  });
}

const urlDeactivateReason = {
  name: USER_URL_DEACTIVATE,
  props: {
    in_popup: true,
    requestHandler: setResponse(NO_ACTION, true),
    messageHandler: onUserUrlDeactivate,
    popupHandler: sendUrlDeactivate,
  },
}

Object.assign(exports, {onUserUrlDeactivate, urlDeactivateReason});

})].map(func => typeof exports == 'undefined' ? define('/reasons/user_url_deactivate', func) : func(exports));
