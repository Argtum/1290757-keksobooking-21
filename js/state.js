'use strict';

(function () {
  let isActively = false;

  const isActive = () => {
    return isActively;
  };

  const deactivate = () => {
    isActively = false;

    window.map.toggle();
    window.form.switchState();
    window.form.reset();
    window.form.reset(window.filter.getElement());
    window.form.toggle();
    window.form.toggle(window.filter.getElement());
    window.validation.stop();
    window.view.removePins();
    window.card.close();
    window.pin.resetPosition();
    window.form.setAddress();
    window.form.setPriceRange();
    window.filter.stopChange();
    window.form.stopHandling();
    window.form.resetPhotos();
    window.card.stopClickOnMapHandler();
  };

  const activate = () => {
    isActively = true;

    window.map.toggle();
    window.form.switchState();
    window.form.toggle();
    window.form.toggle(window.filter.getElement());
    window.form.setAddress();
    window.validation.setNumPlaces();
    window.validation.start();
    window.view.renderPins(window.filter.limitQuantity());
    window.filter.change();
    window.form.clear();
    window.form.setAvatar();
    window.form.setPhoto();
    window.form.startHandling();
    window.card.clickOnMapHandler();
  };

  const onAppActivation = (evt) => {
    if (evt.type === `keydown`) {
      window.util.pressEnter(evt, window.data.load);
    } else if (evt.type === `mousedown`) {
      window.util.pressLeftMouseButton(evt, window.pin.mouseMoveHandler);
      window.util.pressLeftMouseButton(evt, window.data.load);
    }
  };

  window.state = {
    activate,
    deactivate,
    onAppActivation,
    isActive
  };
})();
