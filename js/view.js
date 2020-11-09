'use strict';

(function () {
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);
  const main = document.querySelector(`main`);

  const removePins = () => {
    const currentPins = mapPinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < currentPins.length; i++) {
      mapPinsContainer.removeChild(currentPins[i]);
    }
  };

  const renderPins = (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach((pinData) => {
      if (pinData.offer) {
        const mapPin = window.pin.create(pinData, mapPinTemplate);

        fragment.appendChild(mapPin);
      }
    });

    removePins();
    mapPinsContainer.appendChild(fragment);
  };

  const renderCard = (data, map) => {
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const cardPositionMarker = document.querySelector(`.map__filters-container`);
    const fragment = document.createDocumentFragment();
    const card = window.card.create(data, cardTemplate);

    fragment.appendChild(card);
    map.insertBefore(fragment, cardPositionMarker);
  };

  const renderSuccessMessage = () => {
    const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successMessage = successMessageTemplate.cloneNode(true);
    const fragment = document.createDocumentFragment();

    fragment.appendChild(successMessage);
    main.appendChild(fragment);
  };

  const renderErrorMessage = () => {
    const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = errorMessageTemplate.cloneNode(true);
    const fragment = document.createDocumentFragment();

    fragment.appendChild(errorMessage);
    main.appendChild(fragment);
  };

  const removeMessage = (msg) => {
    main.removeChild(msg);
  };

  window.view = {
    renderCard,
    renderPins,
    removePins,
    renderSuccessMessage,
    renderErrorMessage,
    removeMessage
  };
})();
