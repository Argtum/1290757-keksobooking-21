'use strict';

(function () {
  const toggleForm = (form) => {
    const formDisabled = form.cloneNode(true);

    for (let item of formDisabled.children) {
      item.disabled = !item.disabled;
    }

    form.innerHTML = null;
    form.insertAdjacentHTML(`beforeend`, formDisabled.innerHTML);
  };

  const setAddress = () => {
    document.querySelector(`#address`).value = window.pin.getMapPinCoordinate();
  };

  window.form = {
    toggleForm,
    setAddress
  };
})();
