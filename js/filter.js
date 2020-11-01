'use strict';

(function () {
  const QUANTITY = 5;
  const DEBOUNCE_INTERVAL = 500;
  const BASE = 10;
  const PRICE_LOWER_LIMIT = 10000;
  const PRICE_UPPER_LIMIT = 50000;

  const form = document.querySelector(`.map__filters`);

  const limitQuantity = () => {
    return window.data.adsData.slice(0, QUANTITY);
  };

  const getFilterElement = () => {
    return form;
  };

  const changeFilter = () => {
    let lastTimeout;

    const setFilter = () => {
      const housingType = form.querySelector(`#housing-type`);
      const housingPrice = form.querySelector(`#housing-price`);
      const housingRoom = form.querySelector(`#housing-rooms`);
      const housingGuests = form.querySelector(`#housing-guests`);
      const filterWifi = form.querySelector(`#filter-wifi`);
      const filterDishwasher = form.querySelector(`#filter-dishwasher`);
      const filterParking = form.querySelector(`#filter-parking`);
      const filterWasher = form.querySelector(`#filter-washer`);
      const filterElevator = form.querySelector(`#filter-elevator`);
      const filterConditioner = form.querySelector(`#filter-conditioner`);

      const checkPrice = (price) => {
        if (housingPrice.value === `middle` && (price < PRICE_LOWER_LIMIT || price > PRICE_UPPER_LIMIT)) {
          return false;
        }

        if (housingPrice.value === `low` && (price >= PRICE_LOWER_LIMIT)) {
          return false;
        }

        return !(housingPrice.value === `high` && (price <= PRICE_UPPER_LIMIT));
      };

      const getSimilarRank = (item) => {
        return Number(housingType.value === `any` || housingType.value === item.offer.type)
          + Number(housingPrice.value === `any` || checkPrice(item.offer.price))
          + Number(housingRoom.value === `any` || parseInt(housingRoom.value, BASE) === item.offer.rooms)
          + Number(housingGuests.value === `any` || parseInt(housingGuests.value, BASE) === item.offer.guests)
          + Number(filterWifi.checked && item.offer.features.includes(filterWifi.value))
          + Number(filterDishwasher.checked && item.offer.features.includes(filterDishwasher.value))
          + Number(filterParking.checked && item.offer.features.includes(filterParking.value))
          + Number(filterWasher.checked && item.offer.features.includes(filterWasher.value))
          + Number(filterElevator.checked && item.offer.features.includes(filterElevator.value))
          + Number(filterConditioner.checked && item.offer.features.includes(filterConditioner.value));
      };

      window.data.adsData.sort((left, right) => {
        return getSimilarRank(right) - getSimilarRank(left);
      });

      window.card.closeCard();
      window.render.renderMapPins(limitQuantity());
    };

    form.addEventListener(`change`, () => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        setFilter();
      }, DEBOUNCE_INTERVAL);
    });
  };

  window.filter = {
    getFilterElement,
    limitQuantity,
    changeFilter
  };
})();
