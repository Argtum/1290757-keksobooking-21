'use strict';

(function () {
  const MAP_PIN_GAP_X = 25;
  const MAP_PIN_GAP_Y = 70;
  const MAX_Y_COORDINATE = 630;
  const MIN_Y_COORDINATE = 130;
  const MIN_X_COORDINATE = 0;
  const DECIMAL_BASE = 10;
  const MAIN_PIN_Y_DEFAULT = 375;
  const MAIN_PIN_GAP = 30;

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const maxXCoordinate = window.map.get().clientWidth;

  let pinCoordinates;
  let mouseCoordinates;

  const resetPosition = () => {
    mapPinMain.style.left = `${String(Math.floor(maxXCoordinate / 2) - MAIN_PIN_GAP)}px`;
    mapPinMain.style.top = `${String(MAIN_PIN_Y_DEFAULT)}px`;
  };

  const initApp = () => {
    mapPinMain.addEventListener(`mousedown`, window.state.onAppActivation);
    mapPinMain.addEventListener(`keydown`, window.state.onAppActivation);
  };

  const create = (data, template) => {
    const mapPinItem = template.cloneNode(true);
    const mapPinImg = mapPinItem.querySelector(`img`);

    mapPinItem.style.left = `${String(data.location.x - MAP_PIN_GAP_X)}px`;
    mapPinItem.style.top = `${String(data.location.y - MAP_PIN_GAP_Y)}px`;
    mapPinImg.src = data.author.avatar;
    mapPinImg.alt = data.offer.title;

    return mapPinItem;
  };

  const setMapPinCoordinate = () => {
    const pinOffsetX = mapPinMain.offsetLeft;
    const pinOffsetY = mapPinMain.offsetTop;
    const pinWidth = mapPinMain.offsetWidth;
    const pinHeight = mapPinMain.clientHeight;
    const activePinHeight = parseInt(getComputedStyle(mapPinMain, `:after`).height, DECIMAL_BASE);

    pinCoordinates = {
      x: Math.floor(pinOffsetX + (pinWidth / 2)),
      y: window.map.checkActivity()
        ? Math.floor(pinOffsetY + pinHeight + activePinHeight)
        : Math.floor(pinOffsetY + (pinHeight / 2))
    };
  };

  const getCoordinate = () => {
    setMapPinCoordinate();

    return `${pinCoordinates.x}, ${pinCoordinates.y}`;
  };

  const moveMainPin = (mouseEvt) => {
    const shift = {
      x: mouseCoordinates.x - mouseEvt.clientX,
      y: mouseCoordinates.y - mouseEvt.clientY
    };

    mouseCoordinates = {
      x: mouseEvt.clientX,
      y: mouseEvt.clientY
    };

    window.form.setAddress();

    mapPinMain.style.left = pinCoordinates.x - shift.x >= MIN_X_COORDINATE && pinCoordinates.x - shift.x <= maxXCoordinate
      ? `${String(mapPinMain.offsetLeft - shift.x)}px`
      : `${String(mapPinMain.offsetLeft)}px`;

    mapPinMain.style.top = pinCoordinates.y - shift.y >= MIN_Y_COORDINATE && pinCoordinates.y - shift.y <= MAX_Y_COORDINATE
      ? `${String(mapPinMain.offsetTop - shift.y)}px`
      : `${String(mapPinMain.offsetTop)}px`;
  };

  const onMouseMove = (mouseEvt) => {
    mouseEvt.preventDefault();

    moveMainPin(mouseEvt);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  const mouseMoveHandler = (evt) => {
    mouseCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const activate = (pin) => {
    if (pin.classList.contains(`map__pin`)) {
      pin.classList.add(`map__pin--active`);
    } else {
      pin.parentElement.classList.add(`map__pin--active`);
    }
  };

  const deactivate = () => {
    const activePin = document.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  window.pin = {
    mouseMoveHandler,
    initApp,
    create,
    getCoordinate,
    resetPosition,
    activate,
    deactivate
  };
})();
