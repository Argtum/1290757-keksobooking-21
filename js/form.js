'use strict';

(function () {
  const DEFAULT_PRICE_LIMIT = 1000;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const PICTURE_WIDTH = 70;
  const PICTURE_HEIGHT = 70;
  const IMAGE_TAG_NAME = `IMG`;
  const DEFAULT_AVATAR_IMAGE = `img/muffin-grey.svg`;

  const form = document.querySelector(`.ad-form`);
  const errorMessage = document.querySelector(`.ad-form__error-message`);

  let clearButton;
  let errorButton;
  let avatarPreview;
  let photoPreview;
  let avatarInput;
  let photoInput;

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
    const sendErrorMessage = document.querySelector(`.error`);

    window.view.removeMessage(sendErrorMessage);

    document.removeEventListener(`mousedown`, onErrorCardClose);
    errorButton.removeEventListener(`keydown`, onErrorCardClose);
    document.removeEventListener(`keydown`, onErrorCardClose);
  };

  const onErrorCardClose = (evt) => {
    if (evt.type === `keydown`) {
      if (evt.target.classList.contains(`error__button`)) {
        window.util.pressEnter(evt, removeErrorMessage);
      } else {
        window.util.pressEscape(evt, removeErrorMessage);
      }
    } else if (evt.type === `mousedown`) {
      window.util.pressLeftMouseButton(evt, removeErrorMessage);
    }
  };

  const sentWithError = () => {
    window.view.renderErrorMessage();

    errorButton = document.querySelector(`.error__button`);

    document.addEventListener(`mousedown`, onErrorCardClose);
    errorButton.addEventListener(`keydown`, onErrorCardClose);
    document.addEventListener(`keydown`, onErrorCardClose);
  };

  const removeSuccessMessage = () => {
    const successMessage = document.querySelector(`.success`);

    window.view.removeMessage(successMessage);

    document.removeEventListener(`mousedown`, onSuccessCardClose);
    document.removeEventListener(`keydown`, onSuccessCardClose);
  };

  const onSuccessCardClose = (evt) => {
    if (evt.type === `keydown`) {
      window.util.pressEscape(evt, removeSuccessMessage);
    } else if (evt.type === `mousedown`) {
      window.util.pressLeftMouseButton(evt, removeSuccessMessage);
    }
  };

  const sentSuccessfully = () => {
    window.state.deactivate();
    window.view.renderSuccessMessage();

    document.addEventListener(`mousedown`, onSuccessCardClose);
    document.addEventListener(`keydown`, onSuccessCardClose);
  };

  const onDataSend = (evt) => {
    evt.preventDefault();

    window.network.uploadFormData(new FormData(form), sentSuccessfully, sentWithError);
  };

  const startHandling = () => {
    form.addEventListener(`submit`, onDataSend);
  };

  const stopHandling = () => {
    form.addEventListener(`submit`, onDataSend);
  };

  const restartApp = () => {
    window.state.deactivate();

    clearButton.removeEventListener(`mousedown`, onAppRestart);
    clearButton.removeEventListener(`keydown`, onAppRestart);
  };

  const onAppRestart = (evt) => {
    if (evt.type === `keydown`) {
      window.util.pressEnter(evt, restartApp);
    } else if (evt.type === `mousedown`) {
      window.util.pressLeftMouseButton(evt, restartApp);
    }
  };

  const clear = () => {
    clearButton = form.querySelector(`.ad-form__reset`);

    clearButton.addEventListener(`mousedown`, onAppRestart);
    clearButton.addEventListener(`keydown`, onAppRestart);
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
      onPreviewSet(reader, preview);
    });
  };

  const onPreviewSet = (reader, preview) => {
    setPreview(reader, preview);
  };

  const openErrorMessage = (msg) => {
    errorMessage.querySelector(`.error-message__text`).textContent = msg;
    errorMessage.classList.add(`error-message--show`);
  };

  const closeErrorMessage = () => {
    errorMessage.classList.remove(`error-message--show`);
  };

  const closeErrorMsg = () => {
    closeErrorMessage();

    document.removeEventListener(`mousedown`, onErrorMsgClose);
    document.removeEventListener(`keydown`, onErrorMsgClose);
  };

  const onErrorMsgClose = (evt) => {
    if (evt.type === `keydown`) {
      if (evt.target.classList.contains(`error-message__button`)) {
        window.util.pressEnter(evt, closeErrorMsg);
      } else {
        window.util.pressEscape(evt, closeErrorMsg);
      }
    } else if (evt.type === `mousedown`) {
      window.util.pressLeftMouseButton(evt, closeErrorMsg);
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
          onPreviewSet(reader, preview);
        });

        reader.readAsDataURL(file);
      } else {
        throw new Error(`Загружать можно только картинки, следующих форматов: gif, jpg, jpeg, png.`);
      }
    } catch (err) {
      openErrorMessage(err.message);

      document.addEventListener(`mousedown`, onErrorMsgClose);
      document.addEventListener(`keydown`, onErrorMsgClose);
    }
  };

  const onAvatarLoad = () => {
    loadPicture(avatarInput, avatarPreview);
  };

  const onPhotoLoad = () => {
    loadPicture(photoInput, photoPreview);
  };

  const setAvatar = () => {
    avatarInput = form.querySelector(`.ad-form-header__input`);
    avatarPreview = form.querySelector(`.ad-form-header__preview img`);

    avatarInput.addEventListener(`change`, onAvatarLoad);
  };

  const setPhoto = () => {
    photoInput = form.querySelector(`.ad-form__input`);
    photoPreview = form.querySelector(`.ad-form__photo`);

    photoInput.addEventListener(`change`, onPhotoLoad);
  };

  const resetPhotos = () => {
    avatarPreview.src = DEFAULT_AVATAR_IMAGE;
    photoPreview.textContent = ``;

    avatarInput.removeEventListener(`change`, onAvatarLoad);
    photoInput.removeEventListener(`change`, onPhotoLoad);
  };

  window.form = {
    switchState,
    toggle,
    setAddress,
    startHandling,
    stopHandling,
    clear,
    setPriceRange,
    setAvatar,
    setPhoto,
    resetPhotos,
    onErrorMsgClose,
    reset
  };
})();
