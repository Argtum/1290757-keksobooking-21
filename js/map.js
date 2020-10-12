'use strict';

(function () {
  const onMapClick = () => {
    const map = document.querySelector(`.map`);

    const closeCard = () => {
      const card = map.querySelector(`.map__card`);

      map.removeChild(card);
    };

    const onCardClose = (evt) => {
      window.util.isEscapeEvent(evt, closeCard);
    };

    map.addEventListener(`mousedown`, (evt) => {
      if (evt.target.className === `popup__close`) {
        window.util.isLeftMouseButtonEvent(evt, window.card.closeCard);
      } else if (evt.target.className === `map__pin` && evt.target.className !== `map__pin--main`) {
        window.util.isLeftMouseButtonEvent(evt, window.card.openCard);
      }
    });

    map.addEventListener(`keydown`, onCardClose);
  };

  window.map = {
    onMapClick,
  };
})();
