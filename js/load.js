'use strict';

(function () {
  const load = (url, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.responseType = `json`;

    const removeXhrListener = () => {
      xhr.removeEventListener(`load`, onXhrLoad);
      xhr.removeEventListener(`error`, onXhrError);
      xhr.removeEventListener(`timeout`, onXhrTimeout);
    };

    const xhrLoad = () => {
      if (xhr.status === 200) {
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

  window.load = {
    load
  };
})();
