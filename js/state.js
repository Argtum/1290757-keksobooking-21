'use strict';

(function () {
  let isActively = false;

  const isActiveState = () => {
    return isActively;
  };

  const deactivate = () => {
    isActively = false;

    window.map.toggle();
    window.form.switchForm();
    window.form.toggleForms();
    window.validation.setNumPlaces();
    window.validation.stop();
    window.render.removePins();
    window.card.close(window.map.get());
    window.pin.resetPosition();
    window.form.setAddress();
    window.form.setPriceRange();
    window.filter.stopChange();
    window.form.stopSubmissionHandler();
    window.form.resetPhotos();
  };

  const activate = (mapPinMain) => {
    isActively = true;

    window.map.toggle();
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

    mapPinMain.removeEventListener(`mousedown`, onActivation);
    mapPinMain.removeEventListener(`keydown`, onActivation);
  };

  const onActivation = (evt, mapPinMain) => {
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
    onActivation,
    isActiveState
  };
})();
