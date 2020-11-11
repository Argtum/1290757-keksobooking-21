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

  const errorMessage = document.querySelector(`.map__error-message`);

  let ads;

  const getTypeValue = (key, value) => {
    return TYPES.filter((item) => {
      return item.hasOwnProperty(key);
    })[0][key][value];
  };

  const openErrorMessage = (msg) => {
    errorMessage.querySelector(`.error-message__text`).textContent = `${msg} Пожалуйста перезагрузите страницу`;
    errorMessage.classList.add(`error-message--show`);
  };

  const load = () => {
    if (!window.state.isActive()) {
      window.network.loadData((data) => {
        window.data.ads = data;
        window.state.activate();
      }, (msg) => {
        openErrorMessage(msg);
      });
    }
  };

  window.data = {
    getTypeValue,
    load,
    ads
  };
})();
