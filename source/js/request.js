(() => {
  const API_URL = 'https://echo.htmlacademy.ru';
  const POST_METHOD = 'POST';
  const HTTP_REQUEST_OK = 200;

  const request = (url, method, data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === HTTP_REQUEST_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Response Status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', () => {
      if (xhr.statusText !== HTTP_REQUEST_OK) {
        onError('Connection failed');
      }
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    save: (data, onSuccess, onError) => {
      request(API_URL, POST_METHOD, data, onSuccess, onError);
    },

    onServerRequestError: (errorMessage) => {
      window.showSendingStatus(errorMessage);
    }
  };
})();
