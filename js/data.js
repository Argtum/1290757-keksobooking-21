'use strict';

(function () {
  const TYPES = [
    {"palace":
        {
          name: `Дворец`,
          price: 10000
        }
    },
    {"flat":
        {
          name: `Квартира`,
          price: 1000
        }
    },
    {"house":
        {
          name: `Дом`,
          price: 5000
        }
    },
    {"bungalow":
        {
          name: `Бунгало`,
          price: 0
        }
    }
  ];

  let adsData;

  const getTypeValue = (key, value) => {
    return TYPES.filter((item) => {
      return item.hasOwnProperty(key);
    })[0][key][value];
  };

  const loadWithError = (msg) => {
    window.render.renderCustomErrorMessage(msg);

    document.addEventListener(`mousedown`, window.form.onErrorMsgClose);
    document.addEventListener(`keydown`, window.form.onErrorMsgClose);
  };

  const getData = (onSuccess) => {
    window.network.loadData(onSuccess, (msg) => {
      loadWithError(msg);
    });
  };

  window.data = {
    getTypeValue,
    getData,
    adsData
  };
})();
