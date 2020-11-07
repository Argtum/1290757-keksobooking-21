'use strict';

(function () {
  const ENTER_BUTTON_KYE = `Enter`;
  const ESCAPE_BUTTON_KYE = `Escape`;

  const pressEnter = (evt, action) => {
    if (evt.key === ENTER_BUTTON_KYE) {
      evt.preventDefault();
      action(evt);
    }
  };

  const pressEscape = (evt, action) => {
    if (evt.key === ESCAPE_BUTTON_KYE) {
      evt.preventDefault();
      action();
    }
  };

  const pressLeftMouseButton = (evt, action) => {
    if (evt.button === 0) {
      evt.preventDefault();
      action(evt);
    }
  };

  window.util = {
    pressEnter,
    pressLeftMouseButton,
    pressEscape
  };
})();
