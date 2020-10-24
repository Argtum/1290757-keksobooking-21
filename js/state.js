'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const addForm = document.querySelector(`.ad-form`);

  let isActive = false;

  const deactivation = () => {
    isActive = false;

    map.classList.add(`map--faded`);
    addForm.classList.add(`ad-form--disabled`);

    window.form.toggleForms();
    window.render.removePins();
    window.card.closeCard();
  };

  const init = () => {
    const mapPinMain = document.querySelector(`.map__pin--main`);

    const activation = () => {
      isActive = true;

      map.classList.remove(`map--faded`);
      addForm.classList.remove(`ad-form--disabled`);

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

  window.state = {
    deactivation,
    init,
  };
})();
