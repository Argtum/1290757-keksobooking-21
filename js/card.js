'use strict';

(function () {
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

  const createCard = (data, template) => {
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

  const closeCard = (map) => {
    const card = map.querySelector(`.map__card`);

    if (card) {
      map.removeChild(card);
    }
  };

  const getCardData = (target) => {
    return window.data.adsData.filter((item) => {
      return item.offer.title === target.alt ? target.alt : target.querySelector(`img`).alt;
    });
  };

  const openCard = (evt, map) => {
    closeCard(map);

    window.render.renderCard(getCardData(evt.target)[0], map);
  };

  const onCardOpen = (evt, map) => {
    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      if (evt.type === `keydown`) {
        window.util.isEnterEvent(evt, () => {
          openCard(evt, map);
        });
      } else if (evt.type === `mousedown`) {
        window.util.isLeftMouseButtonEvent(evt, () => {
          openCard(evt, map);
        });
      }
    }
  };

  const onCardClose = (evt, map) => {
    if (evt.type === `keydown`) {
      window.util.isEscapeEvent(evt, () => {
        closeCard(map);
      });
    } else if (evt.type === `mousedown` && evt.target.className === `popup__close`) {
      window.util.isLeftMouseButtonEvent(evt, () => {
        closeCard(map);
      });
    }
  };

  window.card = {
    createCard,
    closeCard,
    onCardOpen,
    onCardClose
  };
})();
