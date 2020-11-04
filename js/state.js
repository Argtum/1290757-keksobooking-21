'use strict';

(function () {
  let isActively = false;

  const isActiveState = () => {
    return isActively;
  };

  const deactivate = () => {
    isActively = false;

    window.map.switchMap();
    window.form.switchForm();
    window.form.toggleForms();
    window.form.setAddress();
    window.validation.setNumPlaces();
    window.validation.stop();
    window.render.removePins();
    window.card.closeCard(window.map.getMap());
    window.pin.resetPinPosition();
    window.form.setPriceRange();
    window.filter.stopChange();
    window.form.stopSubmissionHandler();
  };

  const activate = (mapPinMain) => {
    isActively = true;

    window.map.switchMap();
    window.form.switchForm();
    window.form.toggleForms();
    window.form.setAddress();
    window.validation.start();
    window.render.renderData();
    window.filter.change();
    window.form.clear();
    window.form.setAvatar();
    window.form.setPhoto();
    window.form.submissionHandler();

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
