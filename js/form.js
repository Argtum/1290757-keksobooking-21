'use strict';

(function () {
  const DEFAULT_PRICE_LIMIT = 1000;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const PICTURE_WIDTH = 70;
  const PICTURE_HEIGHT = 70;
  const IMAGE_TAG_NAME = `IMG`;
  const DEFAULT_AVATAR_IMAGE = `img/muffin-grey.svg`;

  const form = document.querySelector(`.ad-form`);

  let clearButton;
  let errorButton;
  let avatarPreview;
  let photoPreview;

  const switchState = () => {
    form.classList.toggle(`ad-form--disabled`);
  };

  const reset = (resetForm = form) => {
    resetForm.reset();
  };

  const toggle = (switchableForm = form) => {
    for (let item of switchableForm.children) {
      item.disabled = !item.disabled;
    }
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

  const restart = () => {
    window.state.deactivate();

    clearButton.removeEventListener(`mousedown`, onRestart);
    clearButton.removeEventListener(`keydown`, onRestart);
  };

  const onRestart = (evt) => {
    if (evt.type === `keydown`) {
      window.util.enterEvent(evt, restart);
    } else if (evt.type === `mousedown`) {
      window.util.leftMouseButtonEvent(evt, restart);
    }
  };

  const clear = () => {
    clearButton = form.querySelector(`.ad-form__reset`);

    clearButton.addEventListener(`mousedown`, onRestart);
    clearButton.addEventListener(`keydown`, onRestart);
  };

  const setPreview = (reader, preview) => {
    if (preview.tagName === IMAGE_TAG_NAME) {
      preview.src = reader.result;
    } else {
      const image = document.createElement(`img`);

      preview.innerHTML = ``;
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

  const onLoadAvatar = (input) => {
    loadPicture(input, avatarPreview);
  };

  const onLoadPhoto = (input) => {
    loadPicture(input, photoPreview);
  };

  const setAvatar = () => {
    const avatarInput = form.querySelector(`.ad-form-header__input`);
    avatarPreview = form.querySelector(`.ad-form-header__preview img`);

    avatarInput.addEventListener(`change`, () => {
      onLoadAvatar(avatarInput);
    });
  };

  const setPhoto = () => {
    const photoInput = form.querySelector(`.ad-form__input`);
    photoPreview = form.querySelector(`.ad-form__photo`);

    photoInput.addEventListener(`change`, () => {
      onLoadPhoto(photoInput);
    });
  };

  const resetPhotos = () => {
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
    onCloseErrorMsg,
    reset
  };
})();
