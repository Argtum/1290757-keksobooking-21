'use strict';

(function () {
  const validation = () => {
    const type = document.querySelector(`#type`);
    const timein = document.querySelector(`#timein`);
    const timeout = document.querySelector(`#timeout`);
    const roomNumber = document.querySelector(`#room_number`);

    const setPriceMinRange = (value) => {
      const priceField = document.querySelector(`#price`);
      const priceValue = String(window.data.getTypeValue(value, `price`));

      priceField.placeholder = priceValue;
      priceField.min = priceValue;
    };

    const setTime = (value, id) => {
      if (id === `timein`) {
        timeout.value = value;
      } else {
        timein.value = value;
      }
    };

    const setNumPlaces = (value) => {
      const capacity = document.querySelector(`#capacity`);
      const capacityFiltered = capacity.cloneNode(true);

      for (let i = capacityFiltered.children.length - 1; i >= 0; i--) {
        if (value === `100`) {
          capacityFiltered.children[i].disabled = capacityFiltered.children[i].value !== `0`;
        } else {
          capacityFiltered.children[i].disabled = capacityFiltered.children[i].value > value || capacityFiltered.children[i].value === `0`;
        }
      }

      capacity.innerHTML = null;
      capacity.insertAdjacentHTML(`beforeend`, capacityFiltered.innerHTML);
      capacity.value = value !== `100` ? value : `0`;
    };

    const onSetPriceMinRange = (evt) => {
      window.util.isInputEvent(evt, setPriceMinRange);
    };

    const onSetTime = (evt) => {
      window.util.isInputEvent(evt, setTime);
    };

    const onSetNumPlaces = (evt) => {
      window.util.isInputEvent(evt, setNumPlaces);
    };

    type.addEventListener(`input`, onSetPriceMinRange);
    timein.addEventListener(`input`, onSetTime);
    timeout.addEventListener(`input`, onSetTime);
    roomNumber.addEventListener(`input`, onSetNumPlaces);
  };

  window.validation = {
    validation
  };
})();
