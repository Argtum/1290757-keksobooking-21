'use strict';

(function () {
  const isKeyboardEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    } else if (evt.key === `Escape`) {
      window.card.closeCard();
    }
  };

  const isLeftMouseButtonEvent = (evt, action) => {
    if (evt.button === 0) {
      action();
    }
  };

  const isInputEvent = (evt, action) => {
    if (evt.target.id === `timein` || evt.target.id === `timeout`) {
      action(evt.target.value, evt.target.id);
    } else {
      action(evt.target.value);
    }
  };

  window.util = {
    isKeyboardEvent,
    isLeftMouseButtonEvent,
    isInputEvent
  };
})();
