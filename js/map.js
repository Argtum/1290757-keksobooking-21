'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const get = () => {
    return map;
  };

  const toggle = () => {
    map.classList.toggle(`map--faded`);
  };

  const checkActivity = () => {
    return !map.classList.contains(`map--faded`);
  };

  window.map = {
    get,
    toggle,
    checkActivity
  };
})();
