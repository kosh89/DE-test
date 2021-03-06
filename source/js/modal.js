(() => {
  const CLOSED_MODAL_CLASS = 'closed';
  const VALID_INPUT_COLOR = 'green';
  const INVALID_INPUT_COLOR = 'red';

  const workButtonElement = document.querySelector('.work__button');

  const modalElement = document.querySelector('.modal');
  const modalWrapperElement = modalElement.querySelector('.modal__wrapper');
  const modalContentElement = modalElement.querySelector('.modal__content');
  const modalCloseButtonElement = modalElement.querySelector('.modal__close');
  const modalDataSendingElement = modalElement.querySelector('.modal__data-sending');
  const modalStatusElement = modalDataSendingElement.querySelector('.modal__status');
  const modalMessageElement = modalDataSendingElement.querySelector('.modal__message');

  const formElement = document.querySelector('.form');
  const formInputElements = formElement.querySelectorAll('.form__input');
  const nameInputElement = formElement.querySelector('.form__input--name');
  const emailInputElement = formElement.querySelector('.form__input--email');
  const messageInputElement = formElement.querySelector('.form__input--message');

  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onInputTypeHandler = function (event) {
    if (event.target === emailInputElement) {
      emailInputElement.style.borderColor = emailPattern.test(String(emailInputElement.value).toLowerCase()) ? VALID_INPUT_COLOR : INVALID_INPUT_COLOR;
    } else {
      event.target.style.borderColor = event.target.value ? VALID_INPUT_COLOR : INVALID_INPUT_COLOR;
    }
  };

  const onWorkButtonClickHandler = (event) => {
    event.preventDefault();
    showModal();
  };

  const showModal = () => {
    modalElement.classList.remove(CLOSED_MODAL_CLASS);
    window.utils.body.classList.add(window.utils.STOP_SCROLL_CLASS, window.utils.STOP_SCROLL_CLASS + '--modal');
    document.addEventListener('keydown', onModalEscPressHandler);
  };

  const closeModal = () => {
    formInputsClear(formInputElements);
    modalElement.classList.add(CLOSED_MODAL_CLASS);
    modalContentElement.classList.remove(CLOSED_MODAL_CLASS);
    modalDataSendingElement.classList.add(CLOSED_MODAL_CLASS);
    window.utils.body.classList.remove(window.utils.STOP_SCROLL_CLASS, window.utils.STOP_SCROLL_CLASS + '--modal');
    document.removeEventListener('keydown', onModalEscPressHandler);
  };

  const onModalEscPressHandler = (event) => {
    if (event.key === window.utils.ESC_KEY) {
      closeModal();
    }
  };

  const onModalWrapperClickHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('modal__wrapper')) {
      closeModal();
    }
  };

  const formInputsClear = (formInputs) => {
    formInputs.forEach((input) => {
      input.value = '';
      input.style.borderColor = '';
    });
  };

  window.showSendingStatus = (error) => {
    if (error) {
      modalStatusElement.textContent = 'Error!';
      modalMessageElement.textContent = error;
    } else {
      modalStatusElement.textContent = 'Success!';
      modalMessageElement.textContent = 'Your data has been sent.';
    }

    modalContentElement.classList.add(CLOSED_MODAL_CLASS);
    modalDataSendingElement.classList.remove(CLOSED_MODAL_CLASS);

    setTimeout(() => {
      closeModal();
    }, 2500);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    if (emailPattern.test(String(emailInputElement.value).toLowerCase()) &&
      nameInputElement.value &&
      messageInputElement.value) {
      window.backend.save(new FormData(formElement), window.showSendingStatus, window.backend.onServerRequestError);
    }
  };

  workButtonElement.addEventListener('click', onWorkButtonClickHandler);
  modalWrapperElement.addEventListener('mouseup', onModalWrapperClickHandler);
  modalCloseButtonElement.addEventListener('click', closeModal);
  formElement.addEventListener('submit', onFormSubmitHandler);

  formInputElements.forEach((input) => {
    input.addEventListener('input', onInputTypeHandler);
  });
})();
