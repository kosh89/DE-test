(() => {
  const CLOSED_MODAL_CLASS = 'closed';
  const OVERFLOW_HIDDEN_STYLE = 'hidden';
  const OVERFLOW_VISIBLE_STYLE = 'visible';
  const ESC_KEYCODE = 27;
  const VALID_INPUT_COLOR = 'green';
  const INVALID_INPUT_COLOR = 'red';

  const body = document.querySelector('body');
  const workButtonElement = body.querySelector('.work__button');

  const modalElement = body.querySelector('.modal');
  const modalWrapperElement = modalElement.querySelector('.modal__wrapper');
  const modalContentElement = modalElement.querySelector('.modal__content');
  const modalDataSendingElement = body.querySelector('.modal__data-sending');
  const modalStatusElement = modalDataSendingElement.querySelector('.modal__status');
  const modalMessageElement = modalDataSendingElement.querySelector('.modal__message');

  const formElement = body.querySelector('.form');
  const formInputElements = formElement.querySelectorAll('.form__input');
  const nameInputElement = formElement.querySelector('.form__input--name');
  const emailInputElement = formElement.querySelector('.form__input--email');
  const messageInputElement = formElement.querySelector('.form__input--message');

  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onInputTypeHandler = function() {
    if (this === emailInputElement) {
      emailInputElement.style.borderColor = emailPattern.test(String(emailInputElement.value).toLowerCase()) ? VALID_INPUT_COLOR : INVALID_INPUT_COLOR;
    } else {
      this.style.borderColor = this.value ? VALID_INPUT_COLOR : INVALID_INPUT_COLOR;
    }
  };

  const onWorkButtonClickHandler = (event) => {
    event.preventDefault();
    showModal();
  };

  const showModal = () => {
    modalElement.classList.remove(CLOSED_MODAL_CLASS);
    body.style.overflowY = OVERFLOW_HIDDEN_STYLE;
    document.addEventListener('keydown', onModalEscPress);
  }

  const closeModal = () => {
    formInputsClear(formInputElements);
    modalElement.classList.add(CLOSED_MODAL_CLASS);
    modalContentElement.classList.remove(CLOSED_MODAL_CLASS);
    modalDataSendingElement.classList.add(CLOSED_MODAL_CLASS);
    body.style.overflowY = OVERFLOW_VISIBLE_STYLE;
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onModalEscPress = (event) => {
    if (event.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  const onModalWrapperClickHandler = (event) => {
    event.preventDefault();
    event.target.classList.contains('modal__wrapper') && closeModal();
  };

  const formInputsClear = (formInputs) => {
    formInputs.forEach((input) => {
      input.value = '';
      input.style.borderColor = '';
    })
  };

  window.showSendingStatus = (error) => {
    error ? (
      modalStatusElement.textContent = 'Error!',
      modalMessageElement.textContent = error
    ) : (
      modalStatusElement.textContent = 'Success!',
      modalMessageElement.textContent = 'Your data has been sent.'
    )

    modalContentElement.classList.add(CLOSED_MODAL_CLASS);
    modalDataSendingElement.classList.remove(CLOSED_MODAL_CLASS);

    setTimeout(() => {
      closeModal();
    }, 2500);
  }

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
  formElement.addEventListener('submit', onFormSubmitHandler);

  formInputElements.forEach((input)=>{
    input.addEventListener('input', onInputTypeHandler);
  })
})();