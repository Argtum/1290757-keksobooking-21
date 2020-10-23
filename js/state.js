'use strict';

(function () {
  let isActive = false;

  const deactivation = () => {
    const addForm = document.querySelector(`.ad-form`);
    const filter = document.querySelector(`.map__filters`);

    window.form.toggleForm(addForm);
    window.form.toggleForm(filter);
  };

  const init = () => {
    const mapPinMain = document.querySelector(`.map__pin--main`);

    const activation = () => {
      const map = document.querySelector(`.map`);
      const addForm = document.querySelector(`.ad-form`);
      const filter = map.querySelector(`.map__filters`);

      isActive = true;

      map.classList.remove(`map--faded`);
      addForm.classList.remove(`ad-form--disabled`);

      window.form.toggleForm(addForm);
      window.form.toggleForm(filter);
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
