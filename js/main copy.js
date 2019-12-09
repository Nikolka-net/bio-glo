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
        }
      }

      if (elem.closest('#headingTwo-two')) {

        if (collapseTwo.style.display === 'block') {
          collapseTwo.style.display = 'block';
        } else {
          collapseOne.style.display = 'none';
          collapseTwo.style.display = 'block';
          collapseThree.style.display = 'none';
        }
      }

      if (elem.closest('#headingThree-two')) {

        if (collapseThree.style.display === 'block') {
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

//Accordion

const accordion = () => {
  const btnAccordion = document.querySelectorAll(`a[data-parent="#accordion"]`),
    collapseOneId = document.getElementById('collapseOne'),
    collapseTwoId = document.getElementById('collapseTwo'),
    collapseThreeId = document.getElementById('collapseThree'),
    collapseFourId = document.getElementById('collapseFour'),
    btnFour = document.querySelector('.btnFour');

  btnAccordion.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      //One
      if (elem.closest('#headingOne')) {
        if (collapseOneId.style.display === 'none') {
          collapseOneId.style.display = 'block';
          collapseTwoId.style.display = 'none';
          collapseThreeId.style.display = 'none';
          collapseFourId.style.display = 'none';

        } else {
          collapseOneId.style.display = 'block';
        }
      }
      //Two
      if (elem.closest('#headingTwo') || elem.matches('.btnOne')) {

        if (collapseTwoId.style.display === 'block') {
          collapseTwoId.style.display = 'block';

        } else {
          collapseOneId.style.display = 'none';
          collapseTwoId.style.display = 'block';
          collapseThreeId.style.display = 'none';
          collapseFourId.style.display = 'none';
        }
      }
      //Three
      if (elem.closest('#headingThree') || elem.matches('.btnTwo')) {

        if (collapseThreeId.style.display === 'block') {
          collapseThreeId.style.display = 'block';

        } else {
          collapseOneId.style.display = 'none';
          collapseTwoId.style.display = 'none';
          collapseThreeId.style.display = 'block';
          collapseFourId.style.display = 'none';
        }
      }
      //Four
      if (elem.closest('#headingFour') || elem.matches('.btnThree')) {

        if (collapseFourId.style.display === 'block') {
          collapseFourId.style.display = 'block';

        } else {
          collapseOneId.style.display = 'none';
          collapseTwoId.style.display = 'none';
          collapseThreeId.style.display = 'none';
          collapseFourId.style.display = 'block';
        }
      }

    });

  });
  btnFour.addEventListener('click', () => {//закрываем последний блок при нажатии на кнопку "получить расчёт"
    if (collapseFourId.style.display === 'block') {
      collapseFourId.style.display = 'none';
    }
  });

};
accordion();

//Checkbox one!!!

const checkboxOne = () => {
  const sumpTwo = document.querySelector('.sumpTwo'),
    myOnOffSwitchOne = document.getElementById('myonoffswitch');

  myOnOffSwitchOne.addEventListener('change', () => {//при выборе 'одно' исчезает 2 колодец из 2 блока

    if (myOnOffSwitchOne.checked) {
      sumpTwo.style.display = 'none';
    } else if (!myOnOffSwitchOne.checked) {
      sumpTwo.style.display = 'block';
    }

  });


};
//checkboxOne();

//Calculator online

const calculatorOnline = () => {
  const myOnOffSwitchOne = document.getElementById('myonoffswitch'),
    myOnOffSwitchTwo = document.getElementById('myonoffswitch-two'),
    sumpTwo = document.querySelector('.sumpTwo'),
    formControl = document.querySelectorAll('.form-control'),
    formDiameterOne = document.querySelectorAll('.form-control')[0],
    formNumberOne = document.querySelectorAll('.form-control')[1],
    formDiameterTwo = document.querySelectorAll('.form-control')[2],
    formNumberTwo = document.querySelectorAll('.form-control')[3],
    inputDistance = document.querySelector('.distance');
  let btnNextStep = document.querySelectorAll(`a[data-parent="#accordion"]`);
  let calcResult = document.getElementById('calc-result');

  let obj = {
    priseOne: 10000,
    priseTwo: 15000,
    wellTwo: 0,
    wellOne: 0
  };

  //check and option
  myOnOffSwitchOne.addEventListener('change', () => {
    if (myOnOffSwitchOne.checked) {
      sumpTwo.style.display = 'none';
      calcResult.value = obj.priseOne;

      //1 колодец

      formControl.forEach((elem) => {
        elem.addEventListener('change', () => {

          if (formDiameterOne.value === '1.4 метра') {

            if (formNumberOne.value === '1 штука') {
              calcResult.value = 10000;
            }
            if (formNumberOne.value === '2 штуки') {
              calcResult.value = ((10000 * 30) / 100) + 10000;
            } else if (formNumberOne.value === '3 штуки') {
              calcResult.value = ((10000 * 50) / 100) + 10000;
            }
          }

          if (formDiameterOne.value === '2 метра') {
            calcResult.value = ((10000 * 20) / 100) + 10000;

            if (formNumberOne.value === '1 штука') {
              calcResult.value = 12000;
            }
            if (formNumberOne.value === '2 штуки') {
              calcResult.value = ((10000 * 30) / 100) + 12000;
            } else if (formNumberOne.value === '3 штуки') {
              calcResult.value = ((10000 * 50) / 100) + 12000;
            }
          }
          //
          obj.wellOne = calcResult.value;
          calcResult.value = +calcResult.value + 1000;

        });
      });

      //2 колодца

    } else if (!myOnOffSwitchOne.checked) {
      sumpTwo.style.display = 'block';
      calcResult.value = obj.priseTwo;

      formControl.forEach((elem) => {
        elem.addEventListener('change', () => {
          //1 proviso
          if (sumpTwo.style.display === 'block') {
            if (formDiameterOne.value === '1.4 метра' && formDiameterTwo.value === '1.4 метра') {
              //1шт
              if (formNumberOne.value === '1 штука') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = 15000;//15000
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = (15000 * 30) / 100 + 15000;//19500
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = (15000 * 50) / 100 + 15000;//22500
                }
              }
              //2шт
              if (formNumberOne.value === '2 штуки') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = (15000 * 30) / 100 + 15000;//19500
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = ((15000 * 30) / 100) * 2 + 15000;//24000
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 15000;//27000
                }
              }
              //3шт
              if (formNumberOne.value === '3 штуки') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = (15000 * 50) / 100 + 15000;//22500
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 15000;//27000
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = ((15000 * 50) / 100) * 2 + 15000;//30000
                }
              }
            }
            //2 proviso
            if (formDiameterOne.value === '2 метра' && formDiameterTwo.value === '1.4 метра' ||
              formDiameterOne.value === '1.4 метра' && formDiameterTwo.value === '2 метра') {
              calcResult.value = ((15000 * 20) / 100) + 15000;//18000
              //1шт
              if (formNumberOne.value === '1 штука') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = 18000;//18000
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = (15000 * 30) / 100 + 18000;//22500
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = (15000 * 50) / 100 + 18000;//25500
                }
              }
              //2шт
              if (formNumberOne.value === '2 штуки') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = (15000 * 30) / 100 + 18000;//22500
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = ((15000 * 30) / 100) * 2 + 18000;//27000
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 18000;//30000
                }
              }
              //3шт
              if (formNumberOne.value === '3 штуки') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = (15000 * 50) / 100 + 18000;//25500
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 18000;//30000
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = ((15000 * 50) / 100) * 2 + 18000;//33000
                }
              }
            }
            //3 proviso
            if (formDiameterOne.value === '2 метра' && formDiameterTwo.value === '2 метра') {
              calcResult.value = ((15000 * 20) / 100) * 2 + 15000;//21000
              //1шт
              if (formNumberOne.value === '1 штука') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = 21000;//21000
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = (15000 * 30) / 100 + 21000;//25500
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = (15000 * 50) / 100 + 21000;//28500
                }
              }
              //2шт
              if (formNumberOne.value === '2 штуки') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = (15000 * 30) / 100 + 21000;//25500
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = ((15000 * 30) / 100) * 2 + 21000;//30000
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 21000;//33000
                }
              }
              //3шт
              if (formNumberOne.value === '3 штуки') {
                if (formNumberTwo.value === '1 штука') {
                  calcResult.value = (15000 * 50) / 100 + 21000;//28500
                } else if (formNumberTwo.value === '2 штуки') {
                  calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 21000;//33000
                } else if (formNumberTwo.value === '3 штуки') {
                  calcResult.value = ((15000 * 50) / 100) * 2 + 21000;//36000
                }
              }
            }
            //
            obj.wellTwo = calcResult.value;
            calcResult.value = +calcResult.value + 2000;

          }
        });
      });


    }


  });


  myOnOffSwitchTwo.addEventListener('change', () => {
    if (myOnOffSwitchTwo.checked) {
      if (sumpTwo.style.display === 'none') {
        if (+obj.wellOne > 0) {
          calcResult.value = +obj.wellOne + 1000;
        } else if (+obj.wellOne === 0) {
          calcResult.value = +obj.priseOne + 1000;
        }

      }
      if (sumpTwo.style.display === 'block') {
        if (+obj.wellTwo > 0) {
          calcResult.value = +obj.wellTwo + 2000;
        } else if (+obj.wellTwo === 0) {
          calcResult.value = +obj.priseTwo + 2000;
        }
      }

    } else if (!myOnOffSwitchTwo.checked) {
      if (sumpTwo.style.display === 'none') {
        if (+obj.wellOne > 0) {
          console.log(3, 'none');
          calcResult.value = +obj.wellOne;
        } else {
          console.log(4, 'none');
          calcResult.value = +obj.priseOne;
        }
      }
      if (sumpTwo.style.display === 'block') {
        if (+obj.wellTwo > 0) {
          console.log(5, 'block');
          calcResult.value = +obj.wellTwo;
        } else {
          console.log(6, 'block');
          calcResult.value = +obj.priseTwo;
        }
      }

    }
  });





};

calculatorOnline();