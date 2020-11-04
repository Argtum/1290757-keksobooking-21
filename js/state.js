'use strict';

(function () {
  let isActively = false;

  const isActiveState = () => {
    return isActively;
  };

  const deactivate = () => {
    isActively = false;

    window.map.switchMap();
    window.form.switchAddForm();
    window.form.toggleForms();
    window.form.setAddress();
    window.validation.stop();

    window.render.removePins();
    window.card.closeCard(window.map.getMap());
    window.form.setPriceRange();
    window.pin.resetPinPosition();
  };

  const activate = (mapPinMain) => {
    isActively = true;

    window.map.switchMap();
    window.form.switchAddForm();
    window.form.toggleForms();
    window.form.setAddress();
    window.validation.start();

    window.render.renderData();
    window.map.mapClick();
    window.filter.changeFilter();
    window.form.send();
    window.form.clear();
    window.form.setAvatar();
    window.form.setPhoto();

    mapPinMain.removeEventListener(`mousedown`, onMapActivation);
    mapPinMain.removeEventListener(`keydown`, onMapActivation);
  };

  const onMapActivation = (evt, mapPinMain) => {
    if (evt.type === `keydown`) {
      window.util.isEnterEvent(evt, () => {
        activate(mapPinMain);
      });
    } else if (evt.type === `mousedown`) {
      window.util.isLeftMouseButtonEvent(evt, () => {
        activate(mapPinMain);
      });
    }
  };

  window.state = {
    deactivate,
    onMapActivation,
    isActiveState
  };
})();
