'use strict';

(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;
  const RESPONSE_DATA_TYPE = `json`;
  const StatusCode = {
    OK: 200
  };

  const removeXhrListener = (xhr) => {
    xhr.removeEventListener(`load`, onXhrLoad);
    xhr.removeEventListener(`error`, onXhrErrorCatch);
    xhr.removeEventListener(`timeout`, onXhrTimeoutCatch);
  };

  const onXhrLoad = (xhr, onSuccess, onError) => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}.`);
    }

    removeXhrListener(xhr);
  };

  const onXhrTimeoutCatch = (xhr, onError) => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс.`);

    removeXhrListener(xhr);
  };

  const onXhrErrorCatch = (xhr, onError) => {
    onError(`Произошла ошибка соединения.`);

    removeXhrListener(xhr);
  };

  const uploadFormData = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = RESPONSE_DATA_TYPE;

    xhr.addEventListener(`load`, () => {
      onXhrLoad(xhr, onSuccess, onError);
    });

    xhr.addEventListener(`error`, () => {
      onXhrErrorCatch(xhr, onError);
    });

    xhr.addEventListener(`timeout`, () => {
      onXhrTimeoutCatch(xhr, onError);
    });

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

  const loadData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = RESPONSE_DATA_TYPE;

    xhr.addEventListener(`load`, () => {
      onXhrLoad(xhr, onSuccess, onError);
    });

    xhr.addEventListener(`error`, () => {
      onXhrErrorCatch(xhr, onError);
    });

    xhr.addEventListener(`timeout`, () => {
      onXhrTimeoutCatch(xhr, onError);
    });

    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  window.network = {
    uploadFormData,
    loadData
  };
})();
