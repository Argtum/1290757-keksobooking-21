'use strict';

(function () {
  const QUANTITY = 5;

  const limitQuantity = () => {
    return window.data.adsData.slice(0, QUANTITY);
  };

  const onFilterChange = () => {
    const form = document.querySelector(`.map__filters`);

    const setFilter = () => {
      const housingType = form.querySelector(`#housing-type`);

      const getSimilarRank = (item) => {
        let rank = 0;

        if (item.offer.type === housingType.value) {
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
    onFilterChange
  };
})();
