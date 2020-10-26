'use strict';

(function () {
  const QUANTITY = 5;

  const limitQuantity = () => {
    return window.data.adsData.slice(0, QUANTITY);
  };

  const changeFilter = () => {
    const form = document.querySelector(`.map__filters`);

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
        if (housingPrice.value === `middle` && (price < 10000 || price > 50000)) {
          return false;
        }

        if (housingPrice.value === `low` && (price >= 10000)) {
          return false;
        }

        if (housingPrice.value === `high` && (price <= 50000)) {
          return false;
        }

        return true;
      };

      const getSimilarRank = (item) => {
        let rank = 0;

        if (housingType.value === `any` || housingType.value === item.offer.type) {
          rank++;
        }

        if (housingPrice.value === `any` || checkPrice(item.offer.price)) {
          rank++;
        }

        if (housingRoom.value === `any` || parseInt(housingRoom.value, 10) === item.offer.rooms) {
          rank++;
        }

        if (housingGuests.value === `any` || parseInt(housingGuests.value, 10) === item.offer.guests) {
          rank++;
        }

        if (filterWifi.checked && item.offer.features.includes(filterWifi.value)) {
          rank++;
        }

        if (filterDishwasher.checked && item.offer.features.includes(filterDishwasher.value)) {
          rank++;
        }

        if (filterParking.checked && item.offer.features.includes(filterParking.value)) {
          rank++;
        }

        if (filterWasher.checked && item.offer.features.includes(filterWasher.value)) {
          rank++;
        }

        if (filterElevator.checked && item.offer.features.includes(filterElevator.value)) {
          rank++;
        }

        if (filterConditioner.checked && item.offer.features.includes(filterConditioner.value)) {
          rank++;
        }

        return rank;
      };

      window.data.adsData.sort((left, right) => {
        return getSimilarRank(right) - getSimilarRank(left);
      });

      window.card.closeCard();
      window.render.renderMapPins(limitQuantity());
    };

    form.addEventListener(`change`, () => {
      setFilter();
    });
  };

  window.filter = {
    limitQuantity,
    changeFilter
  };
})();
