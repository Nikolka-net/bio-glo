'use strict';

//Мodal window

//Popup-call, popup-discount, popup-check, popup-consultation

const btnAlertModal = (btn, popupWindow, popupWindowContent) => {//вызов модального окна

  let count = 0;
  btn.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      popupWindow.style.display = 'block';
      popupWindowContent.style.cssText = `border: 2px solid #90c406; box-shadow: 2px 4px 10px #222`;
      let popupInterval;
      const popupOpacity = function () {
        popupInterval = requestAnimationFrame(popupOpacity);
        count++;
        if (count <= 100) {//уменьшаем прозрачность
          popupWindowContent.style.opacity = count + '%';
        } else {
          cancelAnimationFrame(popupInterval);
        }
      };
      popupOpacity();

    });
  });
  popupWindow.addEventListener('click', (event) => {

    const countPopupNone = () => {//окно исчезает
      popupWindow.style.display = 'none';
      count = 0;
    };
    let target = event.target;
    if (target.matches('.popup-close')) {
      countPopupNone();
    } else {
      target = target.closest('.popup-content');
      if (!target) {//если не получили popup-content, т.е. получили null при клике за пределами окна
        countPopupNone();//окно исчезает при клике за пределы окна
      }
    }
  });
};

const popupCall = () => {
  const popupCall = document.querySelector('.popup-call'),
    callBtn = document.querySelectorAll('.call-btn'),
    popupContentCall = document.querySelectorAll('.popup-content')[0];

  btnAlertModal(callBtn, popupCall, popupContentCall);
};
popupCall();

const popupDiscount = () => {
  const btnDiscount = document.querySelectorAll('.discount-btn'),
    popupDiscount = document.querySelector('.popup-discount'),
    popupContentDiscount = document.querySelectorAll('.popup-content')[1];

  btnAlertModal(btnDiscount, popupDiscount, popupContentDiscount);
};
popupDiscount();


const popupCheck = () => {
  const btnCheck = document.querySelectorAll('.gauging-button'),
    popupCheck = document.querySelector('.popup-check'),
    popupContentCheck = document.querySelectorAll('.popup-content')[2];


  btnAlertModal(btnCheck, popupCheck, popupContentCheck);
};
popupCheck();

const popupConsultation = () => {
  const btnConsultation = document.querySelectorAll('.consultation-btn'),
    popupConsultation = document.querySelector('.popup-consultation'),
    popupContentConsultation = document.querySelectorAll('.popup-content')[3];

  btnAlertModal(btnConsultation, popupConsultation, popupContentConsultation);
};
popupConsultation();


//Send form

const sendForm = () => {
  const successMessage = 'Сообщение отправлено',
    loadMessage = 'Идёт отправка',
    errorMessage = 'Что-то пошло не так...';

  const mainForm = document.querySelector('.main-form'),
    captureForm = document.querySelectorAll('.capture-form')[0],
    callForm = document.querySelectorAll('.capture-form')[1],
    discountForm = document.querySelectorAll('.capture-form')[2],
    checkForm = document.querySelectorAll('.capture-form')[3],
    directorForm = document.querySelector('.director-form'),
    consultationForm = document.querySelectorAll('.capture-form')[4],
    input = document.querySelectorAll('input');

  const inputNameTel = () => {//ввод. в инпут только цифры и кириллица

    input.forEach((elem) => {
      elem.addEventListener('input', () => {
        if (elem.name === 'user_name') {
          elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
        }

        if (elem.name === 'user_phone') {
          elem.value = elem.value.replace(/\D/, '');
        }

        if (elem.name === 'user_quest') {
          elem.value = elem.value.replace(/[^a-zа-яё\s\d?!\.,:;]/ig, '');
        }

      });

    });
  };
  inputNameTel();

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem; color: ##90c406`;

  const getForm = (event, form, form2) => {
    event.preventDefault();//чтобы страница не перезагружалась по умолчанию
    form.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;//идёт загрузка

    let formData = new FormData(form);//получ. данные нашей формы c атрибутом name в объект
    if (form2) {
      for (const elem of form2.elements) {//вытаскиваем из формы инпуты
        if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
          formData.append(elem.name, elem.value);//добавляем ключ и значение в formData
        }
      }
    }

    let body = {};//объект, ко-й отправл. на сервер в формате json

    formData.forEach((val, key) => {
      body[key] = val;
    });

    postData(body)

      .then((response) => {//данные, ко-е мы получаем
        if (response.status !== 200) {
          throw new Error('status network not 200');//обрабатываем как ошибку через конструктор
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
  };

  const inputReset = (form, form2) => {

    for (const elem of form.elements) {//очистка инпутов
      if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
        elem.value = '';
      }
    }
    if (form2) {

      for (const elem of form2.elements) {//очистка инпутов
        if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
          elem.value = '';
        }
      }
    }

    setTimeout(() => {//очистка сообщений
      form.removeChild(statusMessage);
    }, 3000);
  };

  function valid(event, form, form2) {
    const elementsForm = [];//пустой массив для инпутов
    const error = new Set();//массив для ошибочных инпутов, вмещает уникальные эл., не повторяются

    for (const elem of form.elements) {//вытаскиваем из формы инпуты
      if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
        elementsForm.push(elem);//пушим в массив только наши инпуты
      }
    }

    elementsForm.forEach(elem => {
      const patternPhone = /^\+?[78]([-()]*\d){10}$/;
      const patternText = (/^[а-яё\s]+$/i);
      //const patternEmail = /^[\w-]+@\w+\.\w{1,}\D$/;//после точки больше 1 символа, не цифры


      if (elem.value.trim() === '' || elem.name === 'user_phone' && !patternPhone.test(elem.value) ||
        elem.name === 'user_name' && !patternText.test(elem.value)) {//если не проходит валидацию
        elem.style.border = 'solid red';
        error.add(elem);//добавл. инпуты с ошибками в Set
        event.preventDefault();
      } else {
        error.delete(elem);//удал. инпуты из Seta
        elem.style.border = '';
      }

    });
    if (!error.size) {//если size не содержит ошибки (в Set);size коли-во эл. в массиве Set
      getForm(event, form, form2);
      inputReset(form, form2);
    }
  }

  mainForm.addEventListener('submit', (event) => {
    valid(event, mainForm);
  });

  captureForm.addEventListener('submit', (event) => {
    valid(event, captureForm);
  });

  callForm.addEventListener('submit', (event) => {
    valid(event, callForm);
  });

  discountForm.addEventListener('submit', (event) => {
    valid(event, discountForm);
  });

  checkForm.addEventListener('submit', (event) => {
    valid(event, checkForm);
  });

  consultationForm.addEventListener('submit', (event) => {
    valid(event, consultationForm, directorForm);
  });


  const postData = (body) => {//ф. отправки запроса
    return fetch('./server.php', {//отправка запроса на сервер с по-ю промисов
      method: 'POST',//отправляем и получаем
      headers: {//заголовки
        'Content-Type': 'application/json'//сообщаем серверу, что передаём json
      },
      body: JSON.stringify(body),//преобр. данные (~body) в json(строка) и передаём
      credentials: 'include',
      cache: 'default'
    });

  };


};

sendForm();

//AccordionTwo

const accordionTwo = () => {

  const btnAccordionTwo = document.querySelectorAll(`a[data-parent="#accordion-two"]`),
    collapseOne = document.querySelector('.collapseOne'),
    collapseTwo = document.querySelector('.collapseTwo'),
    collapseThree = document.querySelector('.collapseThree');

  btnAccordionTwo.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      if (elem.closest('#headingOne-two')) {

        if (collapseOne.style.display === 'none') {
          collapseOne.style.display = 'block';
          collapseTwo.style.display = 'none';
          collapseThree.style.display = 'none';

        } else {
          collapseOne.style.display = 'block';
          collapseTwo.style.display = 'none';
          collapseThree.style.display = 'none';
        }
      }

      if (elem.closest('#headingTwo-two')) {

        if (collapseTwo.style.display === 'block') {
          collapseOne.style.display = 'none';
          collapseTwo.style.display = 'block';
          collapseThree.style.display = 'none';
        } else {
          collapseOne.style.display = 'none';
          collapseTwo.style.display = 'block';
          collapseThree.style.display = 'none';
        }
      }

      if (elem.closest('#headingThree-two')) {

        if (collapseThree.style.display === 'block') {
          collapseOne.style.display = 'none';
          collapseTwo.style.display = 'none';
          collapseThree.style.display = 'block';
        } else {
          collapseOne.style.display = 'none';
          collapseTwo.style.display = 'none';
          collapseThree.style.display = 'block';
        }
      }
    });

  });

};
accordionTwo();

//More blocks, sentence

const moreBlocks = () => {
  const shadowBlocks = document.querySelectorAll(`.col-xs-12.col-sm-6.col-md-4`),
    btnAddSentence = document.querySelector('.add-sentence-btn');


  btnAddSentence.addEventListener('click', (event) => {
    event.preventDefault();
    shadowBlocks.forEach((elem) => {
      if (elem.matches('.visible-sm-block') || elem.matches('.hidden')) {
        elem.classList.remove('visible-sm-block', 'hidden');
        btnAddSentence.style.cssText = `transform: scale(0)`;
      }

    });

  });

};

moreBlocks();