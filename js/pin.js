'use strict';

(function () {
  const MAP_PIN_GAP_X = 25;
  const MAP_PIN_GAP_Y = 70;
  const MAX_Y_COORDINATE = 630;
  const MIN_Y_COORDINATE = 130;
  const MIN_X_COORDINATE = 0;
  const BASE = 10;
  const MAIN_PIN_Y_DEFAULT = 375;
  const MAIN_PIN_GAP = 30;

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const maxXCoordinate = window.card.getMapWidth();

  let coordinateX;
  let coordinateY;
  let isActive = false;

  const resetPinPosition = () => {
    mapPinMain.style.left = `${String(Math.floor(maxXCoordinate / 2) - MAIN_PIN_GAP)}px`;
    mapPinMain.style.top = `${String(MAIN_PIN_Y_DEFAULT)}px`;
  };

  const deactivation = () => {
    isActive = false;

    window.card.switchMap();
    window.form.switchAddForm();
    window.form.toggleForms();
    window.render.removePins();
    window.card.closeCard();
    window.form.setPriceRange();
    resetPinPosition();
    window.form.setAddress();
  };

  const init = () => {
    const activation = () => {
      isActive = true;

      window.card.switchMap();
      window.form.switchAddForm();
      window.form.toggleForms();
      window.form.setAddress();
      window.validation.validation();
      window.render.renderData();

      mapPinMain.removeEventListener(`mousedown`, onMapActivation);
      mapPinMain.removeEventListener(`keydown`, onMapActivation);
    };

    const onMapActivation = (evt) => {
      window.util.isLeftMouseButtonEvent(evt, activation);
    };

    mapPinMain.addEventListener(`mousedown`, (evt) => {
      if (!isActive) {
        onMapActivation(evt);
      }
      window.pin.onMoveMainMapPin(evt);
    });

    mapPinMain.addEventListener(`keydown`, (evt) => {
      if (!isActive) {
        onMapActivation(evt);
      }
      onMapActivation(evt);
    });
  };

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

  const setMapPinCoordinate = () => {
    const pinOffsetX = mapPinMain.offsetLeft;
    const pinOffsetY = mapPinMain.offsetTop;
    const pinWidth = mapPinMain.offsetWidth;
    const pinHeight = mapPinMain.clientHeight;
    const activePinHeight = parseInt(getComputedStyle(mapPinMain, `:after`).height, BASE);

    coordinateX = Math.floor(pinOffsetX + (pinWidth / 2));
    coordinateY = window.card.isMapActive()
      ? Math.floor(pinOffsetY + pinHeight + activePinHeight)
      : Math.floor(pinOffsetY + (pinHeight / 2));
  };

  const getMapPinCoordinate = () => {
    setMapPinCoordinate();

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

      window.form.setAddress();

      mapPinMain.style.left = coordinateX - shift.x >= MIN_X_COORDINATE && coordinateX - shift.x <= maxXCoordinate
        ? `${String(mapPinMain.offsetLeft - shift.x)}px`
        : `${String(mapPinMain.offsetLeft)}px`;

      mapPinMain.style.top = coordinateY - shift.y >= MIN_Y_COORDINATE && coordinateY - shift.y <= MAX_Y_COORDINATE
        ? `${String(mapPinMain.offsetTop - shift.y)}px`
        : `${String(mapPinMain.offsetTop)}px`;
    };

    const onMouseMove = (mouseEvt) => {
      mouseEvt.preventDefault();

      moveMainPin(mouseEvt);
      window.form.setAddress();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.pin = {
    deactivation,
    init,
    createMapPin,
    getMapPinCoordinate,
    onMoveMainMapPin,
    resetPinPosition
  };
})();
