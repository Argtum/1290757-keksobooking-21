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

  const renderMapPins = (data) => {
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

  const renderData = () => {
    window.data.getData((data) => {
      window.data.adsData = data;
      renderMapPins(window.filter.limitQuantity());
    });
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

  const renderCustomErrorMessage = (msg) => {
    const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = errorMessageTemplate.cloneNode();
    const paragraph = document.createElement(`p`);

    paragraph.innerHTML = msg;
    paragraph.classList.add(`error__message`);

    errorMessage.appendChild(paragraph);
    main.appendChild(errorMessage);
  };

  const removeMessage = (msg) => {
    main.removeChild(msg);
  };

  window.render = {
    renderData,
    renderCard,
    renderMapPins,
    removePins,
    renderSuccessMessage,
    renderErrorMessage,
    removeMessage,
    renderCustomErrorMessage
  };
})();
