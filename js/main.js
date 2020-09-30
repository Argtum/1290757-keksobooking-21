'use strict';

const COUNT_ITEM = 8;
const PRICE_MAX = 10000;
const ROOMS_MAX = 10;
const GUESTS_MAX = 100;
const COORDINATE_Y_RANGE = 501;
const COORDINATE_Y_OFFSET = 130;
const MAP_PIN_GAP_X = 25;
const MAP_PIN_GAP_Y = 70;
const TITLE_LENGTH = 8;
const DESCRIPTION_LENGTH = 200;
const TYPES = [
  {"palace": `Дворец`},
  {"flat": `Квартира`},
  {"house": `Дом`},
  {"bungalow": `Бунгало`}
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

const createMapPin = (data, template) => {
  const mapPinItem = template.cloneNode(true);
  const mapPinImg = mapPinItem.querySelector(`img`);

  mapPinItem.style.left = `${String(data.location.x - MAP_PIN_GAP_X)}px`;
  mapPinItem.style.top = `${String(data.location.y - MAP_PIN_GAP_Y)}px`;
  mapPinImg.src = data.author.avatar;
  mapPinImg.alt = data.offer.title;

  return mapPinItem;
};

const renderMapPins = (data) => {
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  data.forEach((pinData) => {
    const mapPin = createMapPin(pinData, mapPinTemplate);

    fragment.appendChild(mapPin);
  });

  mapPinsContainer.appendChild(fragment);
};

const createCard = (data, template) => {
  const cardItem = template.cloneNode(true);

  const getType = (key) => {
    return TYPES.filter((item) => {
      return item.hasOwnProperty(key);
    })[0][key];
  };

  const createFeaturesList = (features) => {
    const featuresList = cardItem.querySelector(`.popup__features`);
    const newList = featuresList.cloneNode();

    features.forEach((feature) => {
      newList.appendChild(featuresList.querySelector(`.popup__feature--${feature}`));
    });

    for (let i = featuresList.children.length - 1; i >= 0; i--) {
      featuresList.children[i].classList.add(`hidden`);
    }

    for (let i = newList.children.length - 1; i >= 0; i--) {
      featuresList.appendChild(newList.children[i]);
    }
  };

  const createPhotosList = (photos) => {
    const photosList = cardItem.querySelector(`.popup__photos`);
    const photoTemplate = photosList.querySelector(`.popup__photo`);

    photos.forEach((photo) => {
      const currentPhoto = photoTemplate.cloneNode();
      currentPhoto.src = photo;
      photosList.appendChild(currentPhoto);
    });

    photosList.removeChild(photoTemplate);
  };

  cardItem.querySelector(`.popup__title`).textContent = data.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = data.offer.address;
  cardItem.querySelector(`.popup__text--price`).textContent = `${data.offer.price}₽/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = getType(data.offer.type);
  cardItem.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  cardItem.querySelector(`.popup__text--time`).innerHTML = `${data.offer.checkin}, выезд&nbsp;до ${data.offer.checkout}`;
  createFeaturesList(data.offer.features);
  cardItem.querySelector(`.popup__description`).textContent = data.offer.description;
  createPhotosList(data.offer.photos);
  cardItem.querySelector(`.popup__avatar`).src = data.author.avatar;

  return cardItem;
};

const renderCard = (data) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardContainer = document.querySelector(`.map`);
  const cardPositionMarker = document.querySelector(`.map__filters-container`);
  const fragment = document.createDocumentFragment();
  const card = createCard(data, cardTemplate);

  fragment.appendChild(card);
  cardContainer.insertBefore(fragment, cardPositionMarker);
};

const renderData = () => {
  const randomData = getRandomData();

  renderMapPins(randomData);
  renderCard(randomData[0]);
};

const deactivationForm = (form) => {
  const formDisabled = form.cloneNode(true);

  for (let item of formDisabled.children) {
    item.disabled = true;
  }

  form.innerHTML = null;
  form.insertAdjacentHTML(`beforeend`, formDisabled.innerHTML);
};

const deactivation = () => {
  const addForm = document.querySelector(`.ad-form`);
  const filter = document.querySelector(`.map__filters`);

  deactivationForm(addForm);
  deactivationForm(filter);
};

deactivation();
//renderData();
