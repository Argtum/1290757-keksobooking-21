'use strict';

(function () {
  let type;
  let timein;
  let timeout;
  let roomNumber;

  const setTime = (value, id) => {
    if (id === `timein`) {
      timeout.value = value;
    } else {
      timein.value = value;
    }
  };

  const setPriceMinRange = (value) => {
    const priceValue = String(window.data.getTypeValue(value, `price`));

    window.form.setPriceRange(priceValue);
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
    setPriceMinRange(evt.target.value);
  };

  const onSetTime = (evt) => {
    setTime(evt.target.value, evt.target.id);
  };

  const onSetNumPlaces = (evt) => {
    setNumPlaces(evt.target.value);
  };

  const start = () => {
    type = document.querySelector(`#type`);
    timein = document.querySelector(`#timein`);
    timeout = document.querySelector(`#timeout`);
    roomNumber = document.querySelector(`#room_number`);

    type.addEventListener(`input`, onSetPriceMinRange);
    timein.addEventListener(`input`, onSetTime);
    timeout.addEventListener(`input`, onSetTime);
    roomNumber.addEventListener(`input`, onSetNumPlaces);
  };

  const stop = () => {
    type.removeEventListener(`input`, onSetPriceMinRange);
    timein.removeEventListener(`input`, onSetTime);
    timeout.removeEventListener(`input`, onSetTime);
    roomNumber.removeEventListener(`input`, onSetNumPlaces);
  };

  window.validation = {
    start,
    stop
  };
})();
