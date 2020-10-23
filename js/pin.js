'use strict';

(function () {
  const MAP_PIN_GAP_X = 25;
  const MAP_PIN_GAP_Y = 70;
  const BASE = 10;

  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const createMapPin = (data, template, index) => {
    const mapPinItem = template.cloneNode(true);
    const mapPinImg = mapPinItem.querySelector(`img`);

    mapPinItem.style.left = `${String(data.location.x - MAP_PIN_GAP_X)}px`;
    mapPinItem.style.top = `${String(data.location.y - MAP_PIN_GAP_Y)}px`;
    mapPinItem.dataset.index = index;
    mapPinImg.src = data.author.avatar;
    mapPinImg.alt = data.offer.title;

    return mapPinItem;
  };

  const getMapPinCoordinate = () => {
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

  const onMoveMainMapPin = (evt) => {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const moveMainPin = (mouseEvt) => {
      const shift = {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY
      };

      startCoords = {
        x: mouseEvt.clientX,
        y: mouseEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
    };

    const onMouseMove = (mouseEvt) => {
      mouseEvt.preventDefault();

      moveMainPin(mouseEvt);
      window.form.setAddress();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      mapPinMain.removeEventListener(`mousemove`, onMouseMove);
      mapPinMain.removeEventListener(`mouseup`, onMouseUp);
    };

    mapPinMain.addEventListener(`mousemove`, onMouseMove);
    mapPinMain.addEventListener(`mouseup`, onMouseUp);
  };

  window.pin = {
    createMapPin,
    getMapPinCoordinate,
    onMoveMainMapPin
  };
})();
