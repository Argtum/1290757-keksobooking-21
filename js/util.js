'use strict';

(function () {
  const isEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      action(evt);
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
      action(evt);
    }
  };

  window.util = {
    isEnterEvent,
    isLeftMouseButtonEvent,
    isEscapeEvent
  };
})();
