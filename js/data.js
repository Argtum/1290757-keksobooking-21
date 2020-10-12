'use strict';

(function () {
  const COUNT_ITEM = 8;
  const PRICE_MAX = 10000;
  const ROOMS_MAX = 10;
  const GUESTS_MAX = 100;
  const COORDINATE_Y_RANGE = 501;
  const COORDINATE_Y_OFFSET = 130;
  const TITLE_LENGTH = 8;
  const DESCRIPTION_LENGTH = 200;
  const TIMES = [
    `12:00`,
    `13:00`,
    `14:00`
  ];
  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
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
  const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const getTypeValue = (key, value) => {
    return TYPES.filter((item) => {
      return item.hasOwnProperty(key);
    })[0][key][value];
  };

  const getData = (onSuccess, onError) => {
    window.load.load(DATA_URL, onSuccess, onError);
  };

  const getRandomData = () => {
    const data = [];

    const getRandomNumber = (max, offset = 0) => {
      return Math.floor((Math.random() * Math.floor(max)) + offset);
    };

    const getRandomString = (max) => {
      let text = ``;
      const possible = `абвгдеёжзийклмнопрстуфхцчшщъыьэюя `;

      for (let i = 0; i < max; i++) {
        text += possible.charAt(getRandomNumber(possible.length));
      }

      return text;
    };

    const getRandomCoordinateX = () => {
      const containerWidth = document.querySelector(`.map`).clientWidth;

      return getRandomNumber(containerWidth + 1);
    };

    const getRandomCoordinateY = () => {
      return getRandomNumber(COORDINATE_Y_RANGE, COORDINATE_Y_OFFSET);
    };

    const getRandomArrayValue = (arr) => {
      return arr[getRandomNumber(arr.length)];
    };

    const getRandomLengthArrayValues = (arr) => {
      return arr.filter(() => {
        return getRandomNumber(2);
      });
    };

    const getType = () => {
      return Object.keys(getRandomArrayValue(TYPES))[0];
    };

    for (let i = 1; i <= COUNT_ITEM; i++) {
      const item = {
        "author": {
          "avatar": `img/avatars/user0${i}.png`
        },
        "offer": {
          "title": getRandomString(TITLE_LENGTH),
          "address": `${getRandomCoordinateX()}, ${getRandomCoordinateY()}`,
          "price": getRandomNumber(PRICE_MAX),
          "type": getType(),
          "rooms": getRandomNumber(ROOMS_MAX, 1),
          "guests": getRandomNumber(GUESTS_MAX, 1),
          "checkin": getRandomArrayValue(TIMES),
          "checkout": getRandomArrayValue(TIMES),
          "features": getRandomLengthArrayValues(FEATURES),
          "description": getRandomString(DESCRIPTION_LENGTH),
          "photos": getRandomLengthArrayValues(PHOTOS),
        },
        "location": {
          "x": getRandomCoordinateX(),
          "y": getRandomCoordinateY()
        }
      };

      data.push(item);
    }

    return data;
  };

  window.data = {
    getRandomData,
    getTypeValue,
    getData
  };
})();
