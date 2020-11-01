'use strict';

(function () {
  const DEFAULT_PRICE_LIMIT = 1000;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const PICTURE_WIDTH = 70;
  const PICTURE_HEIGHT = 70;

  const addForm = document.querySelector(`.ad-form`);

  const switchAddForm = () => {
    addForm.classList.toggle(`ad-form--disabled`);
  };

  const toggleForms = () => {
    window.form.toggleForm(addForm);
    window.form.toggleForm(window.filter.getFilterElement());
  };

  const toggleForm = (form) => {
    const formDisabled = form.cloneNode(true);

    for (let item of formDisabled.children) {
      item.disabled = !item.disabled;
    }

    form.innerHTML = null;
    form.insertAdjacentHTML(`beforeend`, formDisabled.innerHTML);
  };

  const setAddress = () => {
    document.querySelector(`#address`).value = window.pin.getMapPinCoordinate();
  };

  const setPriceRange = (value = DEFAULT_PRICE_LIMIT) => {
    const priceField = document.querySelector(`#price`);

    priceField.placeholder = value;
    priceField.min = value;
  };

  const send = () => {
    const error = () => {
      window.render.renderErrorMessage();
      const errorButton = document.querySelector(`.error__button`);

      const removeErrorMessage = () => {
        const errorMessage = document.querySelector(`.error`);

        window.render.removeMessage(errorMessage);

        document.removeEventListener(`mousedown`, onCardClose);
        document.removeEventListener(`keydown`, onCardClose);
      };

      const onCardClose = (evt) => {
        if (evt.type === `keydown`) {
          if (evt.target.classList.contains(`error__button`)) {
            window.util.isEnterEvent(evt, removeErrorMessage);
          } else {
            window.util.isEscapeEvent(evt, removeErrorMessage);
          }
        } else if (evt.type === `mousedown`) {
          window.util.isLeftMouseButtonEvent(evt, removeErrorMessage);
        }
      };

      document.addEventListener(`mousedown`, onCardClose);
      errorButton.addEventListener(`mousedown`, onCardClose);
      document.addEventListener(`keydown`, onCardClose);
    };

    const success = () => {
      window.pin.deactivation();
      window.render.renderSuccessMessage();

      const removeSuccessMessage = () => {
        const successMessage = document.querySelector(`.success`);

        window.render.removeMessage(successMessage);

        document.removeEventListener(`mousedown`, onCardClose);
        document.removeEventListener(`keydown`, onCardClose);
      };

      const onCardClose = (evt) => {
        if (evt.type === `keydown`) {
          window.util.isEscapeEvent(evt, removeSuccessMessage);
        } else if (evt.type === `mousedown`) {
          window.util.isLeftMouseButtonEvent(evt, removeSuccessMessage);
        }
      };

      document.addEventListener(`mousedown`, onCardClose);
      document.addEventListener(`keydown`, onCardClose);
    };

    const onSendData = () => {
      window.network.upload(new FormData(addForm), success, error);
    };

    addForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      onSendData();
    });
  };

  const clear = () => {
    const resetButton = addForm.querySelector(`.ad-form__reset`);

    const reset = () => {
      window.pin.deactivation();

      resetButton.removeEventListener(`click`, onReset);
    };

    const onReset = (evt) => {
      evt.preventDefault();

      window.util.isLeftMouseButtonEvent(evt, reset);
    };

    resetButton.addEventListener(`click`, onReset);
  };

  const loadPicture = (input, preview) => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        if (preview.tagName === `IMG`) {
          preview.src = reader.result;
        } else {
          const image = document.createElement(`img`);

          image.src = reader.result;
          image.alt = fileName;
          image.width = PICTURE_WIDTH;
          image.height = PICTURE_HEIGHT;

          preview.appendChild(image);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  const onLoadAvatar = (input, preview) => {
    loadPicture(input, preview);
  };

  const onLoadPhoto = (input, preview) => {
    loadPicture(input, preview);
  };

  const setAvatar = () => {
    const avatarInput = addForm.querySelector(`.ad-form-header__input`);
    const avatarPreview = addForm.querySelector(`.ad-form-header__preview img`);

    avatarInput.addEventListener(`change`, () => {
      onLoadAvatar(avatarInput, avatarPreview);
    });
  };

  const setPhoto = () => {
    const photoInput = addForm.querySelector(`.ad-form__input`);
    const photoPreview = addForm.querySelector(`.ad-form__photo`);

    photoInput.addEventListener(`change`, () => {
      onLoadPhoto(photoInput, photoPreview);
    });
  };

  window.form = {
    switchAddForm,
    toggleForm,
    setAddress,
    toggleForms,
    send,
    clear,
    setPriceRange,
    setAvatar,
    setPhoto
  };
})();
