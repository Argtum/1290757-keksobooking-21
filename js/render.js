'use strict';

(function () {
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);

  const removePins = () => {
    const currentPins = mapPinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < currentPins.length; i++) {
      mapPinsContainer.removeChild(currentPins[i]);
    }
  };

  const renderMapPins = (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach((pinData, index) => {
      const mapPin = window.pin.createMapPin(pinData, mapPinTemplate, index);

      fragment.appendChild(mapPin);
    });

    removePins();
    mapPinsContainer.appendChild(fragment);
  };

  const renderCard = (data) => {
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const cardContainer = document.querySelector(`.map`);
    const cardPositionMarker = document.querySelector(`.map__filters-container`);
    const fragment = document.createDocumentFragment();
    const card = window.card.createCard(data, cardTemplate);

    fragment.appendChild(card);
    cardContainer.insertBefore(fragment, cardPositionMarker);
  };

  const renderData = () => {
    window.data.getData((data) => {
      window.data.adsData = data;
      renderMapPins(window.filter.limitQuantity());
      renderCard(window.data.adsData[0]);
      window.card.onMapClick();
      window.filter.onFilterChange();
    });
  };

  window.render = {
    renderData,
    renderCard,
    renderMapPins
  };
})();