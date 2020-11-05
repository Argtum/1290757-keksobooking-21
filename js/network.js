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
    xhr.removeEventListener(`error`, onXhrError);
    xhr.removeEventListener(`timeout`, onXhrTimeout);
  };

  const onXhrLoad = (xhr, onSuccess, onError) => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }

    removeXhrListener(xhr);
  };

  const onXhrUpload = (xhr, onSuccess) => {
    onSuccess(xhr.response);

    removeXhrListener(xhr);
  };

  const onXhrTimeout = (xhr, onError) => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);

    removeXhrListener(xhr);
  };

  const onXhrError = (xhr, onError) => {
    onError(`Произошла ошибка соединения`);

    removeXhrListener(xhr);
  };

  const uploadFormData = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = RESPONSE_DATA_TYPE;

    xhr.addEventListener(`load`, () => {
      onXhrUpload(xhr, onSuccess);
    });

    xhr.addEventListener(`error`, () => {
      onXhrError(xhr, onError);
    });

    xhr.addEventListener(`timeout`, () => {
      onXhrTimeout(xhr, onError);
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
      onXhrError(xhr, onError);
    });

    xhr.addEventListener(`timeout`, () => {
      onXhrTimeout(xhr, onError);
    });

    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  window.network = {
    uploadFormData,
    loadData
  };
})();
