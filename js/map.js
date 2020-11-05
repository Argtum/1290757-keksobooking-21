'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const click = () => {
    map.addEventListener(`mousedown`, (evt) => {
      window.card.onCardOpen(evt, map);
      window.card.onCardClose(evt, map);
    });

    map.addEventListener(`keydown`, (evt) => {
      window.card.onCardOpen(evt, map);
    });

    document.addEventListener(`keydown`, (evt) => {
      window.card.onCardClose(evt, map);
    });
  };

  const get = () => {
    return map;
  };

  const toggle = () => {
    map.classList.toggle(`map--faded`);
  };

  const checkMapActivity = () => {
    return !map.classList.contains(`map--faded`);
  };

  window.map = {
    click,
    get,
    toggle,
    checkMapActivity
  };
})();
