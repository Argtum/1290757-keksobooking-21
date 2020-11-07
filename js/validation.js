'use strict';

(function () {
  const MAX_ROOMS = `100`;
  const DEFAULT_NUMBER_OF_PLACES = `1`;
  const PLACES_NOT_FOR_GUESTS = `0`;
  const CHECK_IN_TIME_FIELD_ID = `timein`;

  let type;
  let timein;
  let timeout;
  let roomNumber;

  const setTime = (value, id) => {
    if (id === CHECK_IN_TIME_FIELD_ID) {
      timeout.value = value;
    } else {
      timein.value = value;
    }
  };

  const setPriceMinRange = (value) => {
    const priceValue = String(window.data.getTypeValue(value, `price`));

    window.form.setPriceRange(priceValue);
  };

  const setNumPlaces = (value = DEFAULT_NUMBER_OF_PLACES) => {
    const capacity = document.querySelector(`#capacity`);

    for (let i = capacity.children.length - 1; i >= 0; i--) {
      capacity.children[i].disabled = value === MAX_ROOMS
        ? capacity.children[i].value !== PLACES_NOT_FOR_GUESTS
        : capacity.children[i].value > value || capacity.children[i].value === PLACES_NOT_FOR_GUESTS;
    }

    capacity.value = value !== MAX_ROOMS ? value : PLACES_NOT_FOR_GUESTS;
  };

  const onPriceMinRangeSet = (evt) => {
    setPriceMinRange(evt.target.value);
  };

  const onTimeSet = (evt) => {
    setTime(evt.target.value, evt.target.id);
  };

  const onNumPlacesSet = (evt) => {
    setNumPlaces(evt.target.value);
  };

  const start = () => {
    type = document.querySelector(`#type`);
    timein = document.querySelector(`#timein`);
    timeout = document.querySelector(`#timeout`);
    roomNumber = document.querySelector(`#room_number`);

    type.addEventListener(`input`, onPriceMinRangeSet);
    timein.addEventListener(`input`, onTimeSet);
    timeout.addEventListener(`input`, onTimeSet);
    roomNumber.addEventListener(`input`, onNumPlacesSet);
  };

  const stop = () => {
    type.removeEventListener(`input`, onPriceMinRangeSet);
    timein.removeEventListener(`input`, onTimeSet);
    timeout.removeEventListener(`input`, onTimeSet);
    roomNumber.removeEventListener(`input`, onNumPlacesSet);
  };

  window.validation = {
    start,
    stop,
    setNumPlaces
  };
})();
