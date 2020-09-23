'use strict';

const getRandomData = () => {
  const COUNT_ITEM = 8;
  const PRICE_MAX = 10000;
  const ROOMS_MAX = 10;
  const GUESTS_MAX = 100;
  const TYPES = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];
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

  let data = [];

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
    const COORDINATE_Y_RANGE = 501;
    const COORDINATE_Y_OFFSET = 130;

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

  for (let i = 1; i <= COUNT_ITEM; i++) {
    const item = {
      "author": {
        "avatar": `img/avatars/user0${i}.png`
      },
      "offer": {
        "title": getRandomString(8),
        "address": `${getRandomCoordinateX()}, ${getRandomCoordinateY()}`,
        "price": getRandomNumber(PRICE_MAX),
        "type": getRandomArrayValue(TYPES),
        "rooms": getRandomNumber(ROOMS_MAX),
        "guests": getRandomNumber(GUESTS_MAX),
        "checkin": getRandomArrayValue(TIMES),
        "checkout": getRandomArrayValue(TIMES),
        "features": getRandomLengthArrayValues(FEATURES),
        "description": getRandomString(200),
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

const createMapPin = (data, template) => {
  const mapPinItem = template.cloneNode(true);
  let mapPinImg = mapPinItem.querySelector(`img`);

  mapPinItem.style.left = String(data.location.x) + `px`;
  mapPinItem.style.top = String(data.location.y) + `px`;
  mapPinImg.src = data.author.avatar;
  mapPinImg.alt = data.offer.title;

  return mapPinItem;
};

const renderMapPins = () => {
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();

  getRandomData().forEach((pinData) => {
    const mapPin = createMapPin(pinData, mapPinTemplate);
    fragment.appendChild(mapPin);
  });

  mapPinsContainer.appendChild(fragment);
};

renderMapPins();
