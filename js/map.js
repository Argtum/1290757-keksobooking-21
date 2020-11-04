'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const clickOnMap = () => {
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

  const getMap = () => {
    return map;
  };

  const switchMap = () => {
    map.classList.toggle(`map--faded`);
  };

  const isMapActive = () => {
    return !map.classList.contains(`map--faded`);
  };

  window.map = {
    clickOnMap,
    getMap,
    switchMap,
    isMapActive
  };
})();
