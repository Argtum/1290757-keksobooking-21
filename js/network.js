'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  const upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = `json`;

    const removeXhrListener = () => {
      xhr.removeEventListener(`load`, onXhrLoad);
      xhr.removeEventListener(`error`, onXhrError);
      xhr.removeEventListener(`timeout`, onXhrTimeout);
    };

    const xhrLoad = () => {
      onSuccess(xhr.response);

      removeXhrListener();
    };

    const xhrTimeout = () => {
      onError();

      removeXhrListener();
    };

    const xhrError = () => {
      onError();

      removeXhrListener();
    };

    const onXhrLoad = () => {
      xhrLoad();
    };

    const onXhrTimeout = () => {
      xhrTimeout();
    };

    const onXhrError = () => {
      xhrError();
    };

    xhr.addEventListener(`load`, onXhrLoad);
    xhr.addEventListener(`error`, onXhrError);
    xhr.addEventListener(`timeout`, onXhrTimeout);

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  const load = (url, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = `json`;

    const removeXhrListener = () => {
      xhr.removeEventListener(`load`, onXhrLoad);
      xhr.removeEventListener(`error`, onXhrError);
      xhr.removeEventListener(`timeout`, onXhrTimeout);
    };

    const xhrLoad = () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }

      removeXhrListener();
    };

    const xhrTimeout = () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);

      removeXhrListener();
    };

    const xhrError = () => {
      onError(`Произошла ошибка соединения`);

      removeXhrListener();
    };

    const onXhrLoad = () => {
      xhrLoad();
    };

    const onXhrTimeout = () => {
      xhrTimeout();
    };

    const onXhrError = () => {
      xhrError();
    };

    xhr.addEventListener(`load`, onXhrLoad);
    xhr.addEventListener(`error`, onXhrError);
    xhr.addEventListener(`timeout`, onXhrTimeout);

    xhr.open(`GET`, url);
    xhr.send();
  };

  window.network = {
    upload,
    load
  };
})();
