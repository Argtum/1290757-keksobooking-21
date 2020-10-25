'use strict';

(function () {
  const addForm = document.querySelector(`.ad-form`);
  const filter = document.querySelector(`.map__filters`);

  const toggleForms = () => {
    window.form.toggleForm(addForm);
    window.form.toggleForm(filter);
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

  const send = () => {
    const success = () => {
      window.state.deactivation();
      window.render.renderSuccessMessage();

      const removeSuccessMessage = () => {
        const main = document.querySelector(`main`);
        const successMessage = main.querySelector(`.success`);

        main.removeChild(successMessage);

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
      window.upload.upload(new FormData(addForm), success);
    };

    addForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      onSendData();
    });
  };

  window.form = {
    toggleForm,
    setAddress,
    toggleForms,
    send
  };
})();
