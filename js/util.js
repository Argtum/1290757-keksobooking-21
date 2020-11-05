'use strict';

(function () {
  const ENTER_BUTTON_KYE = `Enter`;
  const ESCAPE_BUTTON_KYE = `Escape`;

  const isEnterEvent = (evt, action) => {
    if (evt.key === ENTER_BUTTON_KYE) {
      evt.preventDefault();
      action(evt);
    }
  };

  const isEscapeEvent = (evt, action) => {
    if (evt.key === ESCAPE_BUTTON_KYE) {
      evt.preventDefault();
      action();
    }
  };

  const isLeftMouseButtonEvent = (evt, action) => {
    if (evt.button === 0) {
      evt.preventDefault();
      action(evt);
    }
  };

  window.util = {
    isEnterEvent,
    isLeftMouseButtonEvent,
    isEscapeEvent
  };
})();
