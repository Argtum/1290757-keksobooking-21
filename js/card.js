'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const createCard = (data, template) => {
    const cardItem = template.cloneNode(true);

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
    cardItem.querySelector(`.popup__type`).textContent = window.data.getTypeValue(data.offer.type, `name`);
    cardItem.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
    cardItem.querySelector(`.popup__text--time`).innerHTML = `${data.offer.checkin}, выезд&nbsp;до ${data.offer.checkout}`;
    createFeaturesList(data.offer.features);
    cardItem.querySelector(`.popup__description`).textContent = data.offer.description;
    createPhotosList(data.offer.photos);
    cardItem.querySelector(`.popup__avatar`).src = data.author.avatar;

    return cardItem;
  };

  const closeCard = () => {
    const card = map.querySelector(`.map__card`);

    if (card) {
      map.removeChild(card);
    }
  };

  const getCardData = (name) => {
    return window.data.adsData.filter((item) => {
      return item.offer.title === name;
    });
  };

  const mapClick = () => {
    const openCard = (evt) => {
      closeCard();
      window.render.renderCard(getCardData(evt.target.alt)[0], map);
    };

    const onCardOpen = (evt) => {
      if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
        if (evt.type === `keydown`) {
          window.util.isEnterEvent(evt, openCard);
        } else if (evt.type === `mousedown`) {
          window.util.isLeftMouseButtonEvent(evt, openCard);
        }
      }
    };

    const onCardClose = (evt) => {
      if (evt.type === `keydown`) {
        window.util.isEscapeEvent(evt, closeCard);
      } else if (evt.type === `mousedown` && evt.target.className === `popup__close`) {
        window.util.isLeftMouseButtonEvent(evt, closeCard);
      }
    };

    map.addEventListener(`mousedown`, (evt) => {
      onCardOpen(evt);
      onCardClose(evt);
    });

    map.addEventListener(`keydown`, (evt) => {
      onCardOpen(evt);
    });

    document.addEventListener(`keydown`, (evt) => {
      onCardClose(evt);
    });
  };

  const getMapWidth = () => {
    return map.clientWidth;
  };

  const switchMap = () => {
    map.classList.toggle(`map--faded`);
  };

  const isMapActive = () => {
    return !map.classList.contains(`map--faded`);
  };

  window.card = {
    createCard,
    mapClick,
    closeCard,
    getMapWidth,
    switchMap,
    isMapActive
  };
})();
