'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    const xhrLoad = () => {
      onSuccess(xhr.response);

      xhr.removeEventListener(`load`, onXhrLoad);
    };

    const onXhrLoad = () => {
      xhrLoad();
    };

    xhr.addEventListener(`load`, onXhrLoad);

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = {
    upload
  };
})();
