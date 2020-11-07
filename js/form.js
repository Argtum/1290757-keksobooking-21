'use strict';

(function () {
  const DEFAULT_PRICE_LIMIT = 1000;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const PICTURE_WIDTH = 70;
  const PICTURE_HEIGHT = 70;
  const IMAGE_TAG_NAME = `IMG`;
  const DEFAULT_AVATAR_IMAGE = `img/muffin-grey.svg`;

  const form = document.querySelector(`.ad-form`);

  let resetButton;
  let errorButton;

  const switchState = () => {
    form.classList.toggle(`ad-form--disabled`);
  };

  const toggle = (switchableForm = form) => {
    const formDisabled = switchableForm.cloneNode(true);

    for (let item of formDisabled.children) {
      item.disabled = !item.disabled;
    }

    switchableForm.innerHTML = null;
    switchableForm.insertAdjacentHTML(`beforeend`, formDisabled.innerHTML);
  };

  const setAddress = () => {
    document.querySelector(`#address`).value = window.pin.getCoordinate();
  };

  const setPriceRange = (value = DEFAULT_PRICE_LIMIT) => {
    const priceField = document.querySelector(`#price`);

    priceField.placeholder = value;
    priceField.min = value;
  };

  const removeErrorMessage = () => {
    const errorMessage = document.querySelector(`.error`);

    window.render.removeMessage(errorMessage);

    document.removeEventListener(`mousedown`, onErrorCardClose);
    errorButton.removeEventListener(`keydown`, onErrorCardClose);
    document.removeEventListener(`keydown`, onErrorCardClose);
  };

  const onErrorCardClose = (evt) => {
    if (evt.type === `keydown`) {
      if (evt.target.classList.contains(`error__button`)) {
        window.util.enterEvent(evt, removeErrorMessage);
      } else {
        window.util.escapeEvent(evt, removeErrorMessage);
      }
    } else if (evt.type === `mousedown`) {
      window.util.leftMouseButtonEvent(evt, removeErrorMessage);
    }
  };

  const sentWithError = () => {
    window.render.renderErrorMessage();

    errorButton = document.querySelector(`.error__button`);

    document.addEventListener(`mousedown`, onErrorCardClose);
    errorButton.addEventListener(`keydown`, onErrorCardClose);
    document.addEventListener(`keydown`, onErrorCardClose);
  };

  const removeSuccessMessage = () => {
    const successMessage = document.querySelector(`.success`);

    window.render.removeMessage(successMessage);

    document.removeEventListener(`mousedown`, onSuccessCardClose);
    document.removeEventListener(`keydown`, onSuccessCardClose);
  };

  const onSuccessCardClose = (evt) => {
    if (evt.type === `keydown`) {
      window.util.escapeEvent(evt, removeSuccessMessage);
    } else if (evt.type === `mousedown`) {
      window.util.leftMouseButtonEvent(evt, removeSuccessMessage);
    }
  };

  const sentSuccessfully = () => {
    window.state.deactivate();
    window.render.renderSuccessMessage();

    document.addEventListener(`mousedown`, onSuccessCardClose);
    document.addEventListener(`keydown`, onSuccessCardClose);
  };

  const onSendData = (evt) => {
    evt.preventDefault();

    window.network.uploadFormData(new FormData(form), sentSuccessfully, sentWithError);
  };

  const submissionHandler = () => {
    form.addEventListener(`submit`, onSendData);
  };

  const stopSubmissionHandler = () => {
    form.addEventListener(`submit`, onSendData);
  };

  const reset = () => {
    window.state.deactivate();

    resetButton.removeEventListener(`mousedown`, onReset);
    resetButton.removeEventListener(`keydown`, onReset);
  };

  const onReset = (evt) => {
    if (evt.type === `keydown`) {
      window.util.enterEvent(evt, reset);
    } else if (evt.type === `mousedown`) {
      window.util.leftMouseButtonEvent(evt, reset);
    }
  };

  const clear = () => {
    resetButton = form.querySelector(`.ad-form__reset`);

    resetButton.addEventListener(`mousedown`, onReset);
    resetButton.addEventListener(`keydown`, onReset);
  };

  const setPreview = (reader, preview) => {
    if (preview.tagName === IMAGE_TAG_NAME) {
      preview.src = reader.result;
    } else {
      const image = document.createElement(`img`);

      image.src = reader.result;
      image.width = PICTURE_WIDTH;
      image.height = PICTURE_HEIGHT;

      preview.appendChild(image);
    }

    reader.removeEventListener(`load`, () => {
      onSetPreview(reader, preview);
    });
  };

  const onSetPreview = (reader, preview) => {
    setPreview(reader, preview);
  };

  const closeErrorMsg = () => {
    const errorMessage = document.querySelector(`.error`);

    window.render.removeMessage(errorMessage);

    document.removeEventListener(`mousedown`, onCloseErrorMsg);
    document.removeEventListener(`keydown`, onCloseErrorMsg);
  };

  const onCloseErrorMsg = (evt) => {
    if (evt.type === `keydown`) {
      window.util.escapeEvent(evt, closeErrorMsg);
    } else if (evt.type === `mousedown`) {
      window.util.leftMouseButtonEvent(evt, closeErrorMsg);
    }
  };

  const loadPicture = (input, preview) => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    try {
      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, () => {
          onSetPreview(reader, preview);
        });

        reader.readAsDataURL(file);
      } else {
        throw new Error(`Загружать можно только картинки, следующих форматов: gif, jpg, jpeg, png`);
      }
    } catch (err) {
      window.render.renderCustomErrorMessage(err.message);

      document.addEventListener(`mousedown`, onCloseErrorMsg);
      document.addEventListener(`keydown`, onCloseErrorMsg);
    }
  };

  const onLoadAvatar = (input, preview) => {
    loadPicture(input, preview);
  };

  const onLoadPhoto = (input, preview) => {
    loadPicture(input, preview);
  };

  const setAvatar = () => {
    const avatarInput = form.querySelector(`.ad-form-header__input`);
    const avatarPreview = form.querySelector(`.ad-form-header__preview img`);

    avatarInput.addEventListener(`change`, () => {
      onLoadAvatar(avatarInput, avatarPreview);
    });
  };

  const setPhoto = () => {
    const photoInput = form.querySelector(`.ad-form__input`);
    const photoPreview = form.querySelector(`.ad-form__photo`);

    photoInput.addEventListener(`change`, () => {
      onLoadPhoto(photoInput, photoPreview);
    });
  };

  const resetPhotos = () => {
    const avatarPreview = form.querySelector(`.ad-form-header__preview img`);
    const photoPreview = form.querySelector(`.ad-form__photo`);

    avatarPreview.src = DEFAULT_AVATAR_IMAGE;
    photoPreview.innerHTML = ``;
  };

  window.form = {
    switchState,
    toggle,
    setAddress,
    submissionHandler,
    stopSubmissionHandler,
    clear,
    setPriceRange,
    setAvatar,
    setPhoto,
    resetPhotos,
    onCloseErrorMsg
  };
})();
