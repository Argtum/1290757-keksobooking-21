'use strict';

(function () {
  const onMapClick = () => {
    const map = document.querySelector(`.map`);

    map.addEventListener(`mousedown`, (evt) => {
      if (evt.target.className === `popup__close`) {
        window.util.isLeftMouseButtonEvent(evt, window.card.closeCard);
      }
    });

    map.addEventListener(`keydown`, (evt) => {
      window.util.isEscapeEvent(evt, window.card.closeCard);
    });
  };

  window.map = {
    onMapClick,
  };
})();
