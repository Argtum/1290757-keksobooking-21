'use strict';

(function () {
  const map = window.map.get();
  let closeCardButton;

  const createFeaturesList = (features, cardItem) => {
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

  const createPhotosList = (photos, cardItem) => {
    const photosList = cardItem.querySelector(`.popup__photos`);
    const photoTemplate = photosList.querySelector(`.popup__photo`);

    photos.forEach((photo) => {
      const currentPhoto = photoTemplate.cloneNode();
      currentPhoto.src = photo;
      photosList.appendChild(currentPhoto);
    });

    photosList.removeChild(photoTemplate);
  };

  const create = (data, template) => {
    const cardItem = template.cloneNode(true);

    cardItem.querySelector(`.popup__title`).textContent = data.offer.title;
    cardItem.querySelector(`.popup__text--address`).textContent = data.offer.address;
    cardItem.querySelector(`.popup__text--price`).textContent = `${data.offer.price}₽/ночь`;
    cardItem.querySelector(`.popup__type`).textContent = window.data.getTypeValue(data.offer.type, `name`);
    cardItem.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
    cardItem.querySelector(`.popup__text--time`).innerHTML = `${data.offer.checkin}, выезд&nbsp;до ${data.offer.checkout}`;
    createFeaturesList(data.offer.features, cardItem);
    cardItem.querySelector(`.popup__description`).textContent = data.offer.description;
    createPhotosList(data.offer.photos, cardItem);
    cardItem.querySelector(`.popup__avatar`).src = data.author.avatar;

    return cardItem;
  };

  const close = () => {
    const card = map.querySelector(`.map__card`);

    if (card) {
      closeCardButton.removeEventListener(`mousedown`, onCardClose);
      closeCardButton.removeEventListener(`keydown`, onCardClose);
      document.removeEventListener(`keydown`, onCardClose);

      map.removeChild(card);
      window.pin.deactivate();
    }
  };

  const getCardData = (target) => {
    const name = target.alt ? target.alt : target.querySelector(`img`).alt;

    return window.data.ads.filter((item) => {
      return item.offer.title === name;
    });
  };

  const openCard = (evt) => {
    close();

    window.pin.activate(evt.target);
    window.view.renderCard(getCardData(evt.target)[0], map);

    closeCardButton = document.querySelector(`.popup__close`);

    closeCardButton.addEventListener(`mousedown`, onCardClose);
    closeCardButton.addEventListener(`keydown`, onCardClose);
    document.addEventListener(`keydown`, onCardClose);
  };

  const onCardOpen = (evt) => {
    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      if (evt.type === `keydown`) {
        window.util.pressEnter(evt, () => {
          openCard(evt);
        });
      } else if (evt.type === `mousedown`) {
        window.util.pressLeftMouseButton(evt, () => {
          openCard(evt);
        });
      }
    }
  };

  const onCardClose = (evt) => {
    if (evt.type === `keydown`) {
      if (evt.target.className === `popup__close`) {
        window.util.pressEnter(evt, close);
      } else {
        window.util.pressEscape(evt, close);
      }
    } else if (evt.type === `mousedown`) {
      window.util.pressLeftMouseButton(evt, close);
    }
  };

  const stopClickOnMapHandler = () => {
    map.removeEventListener(`mousedown`, onCardOpen);
    map.removeEventListener(`keydown`, onCardOpen);
  };

  const clickOnMapHandler = () => {
    map.addEventListener(`mousedown`, onCardOpen);
    map.addEventListener(`keydown`, onCardOpen);
  };

  window.card = {
    clickOnMapHandler,
    stopClickOnMapHandler,
    create,
    close,
  };
})();
