'use strict';

(function () {
  const QUANTITY = 5;

  const numberFilter = () => {
    return window.data.adsData.slice(0, QUANTITY);
  };

  window.filter = {
    numberFilter
  };
})();
