'use strict';

(function () {
  const isEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      action();
    }
  };

  const isEscapeEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
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
    isEnterEvent,
    isLeftMouseButtonEvent,
    isInputEvent,
    isEscapeEvent
  };
})();
