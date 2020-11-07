'use strict';

(function () {
  const ENTER_BUTTON_KYE = `Enter`;
  const ESCAPE_BUTTON_KYE = `Escape`;

  const enterEvent = (evt, action) => {
    if (evt.key === ENTER_BUTTON_KYE) {
      evt.preventDefault();
      action(evt);
    }
  };

  const escapeEvent = (evt, action) => {
    if (evt.key === ESCAPE_BUTTON_KYE) {
      evt.preventDefault();
      action();
    }
  };

  const leftMouseButtonEvent = (evt, action) => {
    if (evt.button === 0) {
      evt.preventDefault();
      action(evt);
    }
  };

  window.util = {
    enterEvent,
    leftMouseButtonEvent,
    escapeEvent
  };
})();
