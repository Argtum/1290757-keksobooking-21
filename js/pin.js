'use strict';

(function () {
  const MAP_PIN_GAP_X = 25;
  const MAP_PIN_GAP_Y = 70;
  const BASE = 10;

  const createMapPin = (data, template) => {
    const mapPinItem = template.cloneNode(true);
    const mapPinImg = mapPinItem.querySelector(`img`);

    mapPinItem.style.left = `${String(data.location.x - MAP_PIN_GAP_X)}px`;
    mapPinItem.style.top = `${String(data.location.y - MAP_PIN_GAP_Y)}px`;
    mapPinImg.src = data.author.avatar;
    mapPinImg.alt = data.offer.title;

    return mapPinItem;
  };

  const getMapPinCoordinate = () => {
    const map = document.querySelector(`.map`);
    const mapPinMain = map.querySelector(`.map__pin--main`);
    const pinOffsetX = mapPinMain.offsetLeft;
    const pinOffsetY = mapPinMain.offsetTop;
    const pinWidth = mapPinMain.offsetWidth;
    const pinHeight = mapPinMain.clientHeight;
    const coordinateX = Math.floor(pinOffsetX + (pinWidth / 2));

    if (!map.classList.contains(`map--faded`)) {
      const activePinHeight = parseInt(getComputedStyle(mapPinMain, `:after`).height, BASE);
      const coordinateY = Math.floor(pinOffsetY + pinHeight + activePinHeight);

      return `${coordinateX}, ${coordinateY}`;
    }

    const coordinateY = Math.floor(pinOffsetY + (pinHeight / 2));

    return `${coordinateX}, ${coordinateY}`;
  };

  window.pin = {
    "createMapPin": createMapPin,
    "getMapPinCoordinate": getMapPinCoordinate
  };
})();
