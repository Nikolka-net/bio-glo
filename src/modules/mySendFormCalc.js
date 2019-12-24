class SendFormCalc {
  constructor() {
    this.obj = {
      priseOne: 10000,
      priseTwo: 15000,
      wellTwo: 0,
      wellOne: 0
    };
    this.obj2 = {
      result: 0,
      distance: 0,
      diameter1: '1.4 метра',
      diameter2: '1.4 метра',
      number1: '1 штука',
      number2: '1 штука',
    };
    this.elemDoc = {
      //calculator elem
      input: document.querySelectorAll('input'),
      calcResult: document.getElementById('calc-result'),
      sumpTwo: document.querySelector('.sumpTwo'),
      formControl: document.querySelectorAll('.form-control'),
      formDiameterOne: document.querySelectorAll('.form-control')[0],
      formNumberOne: document.querySelectorAll('.form-control')[1],
      formDiameterTwo: document.querySelectorAll('.form-control')[2],
      formNumberTwo: document.querySelectorAll('.form-control')[3],
      inputDistance: document.querySelector('.distance'),
      btnFour: document.querySelector('.btnFour'),
      collapseFourId: document.getElementById('collapseFour'),
      //send form elem
      mainForm: document.querySelector('.main-form'),
      captureForm: document.querySelectorAll('.capture-form')[0],
      callForm: document.querySelectorAll('.capture-form')[1],
      discountForm: document.querySelectorAll('.capture-form')[2],
      discountCalcForm: document.querySelectorAll('.capture-form')[5],
      checkForm: document.querySelectorAll('.capture-form')[3],
      directorForm: document.querySelector('.director-form'),
      consultationForm: document.querySelectorAll('.capture-form')[4],
      popupCall: document.querySelector('.popup-call'),
      popupDiscount: document.querySelector('.popup-discount'),
      popupDiscountCalc: document.querySelector('.popup-discount-calculation'),
      popupCheck: document.querySelector('.popup-check'),
      popupConsultation: document.querySelector('.popup-consultation'),
    };
    //массив для ошибочных инпутов, вмещает уникальные эл., не повторяются
    this.error = new Set();

  }
  start() {
    this.inputCheck();
    this.calculator();
    this.sendForm();
  }

  inputCheck() {//ввод. в инпут только цифры и кириллица
    this.elemDoc.input.forEach((elem) => {
      elem.addEventListener('input', () => {
        if (elem.name === 'user_name') {
          elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
          elem.setAttribute('maxlength', '25');
        }

        if (elem.name === 'user_phone') {
          elem.value = elem.value.replace(/\D/, '');
          elem.setAttribute('maxlength', '12');//ограничение на кол-во символов
        }

        if (elem.name === 'user_quest') {//'введите вопрос'
          elem.value = elem.value.replace(/[^a-zа-яё\s\d?!\.,:;]/ig, '');
          elem.setAttribute('maxlength', '120');
        }
        if (elem.matches('.distance')) {
          elem.value = elem.value.replace(/\D/, '');
          elem.setAttribute('maxlength', '10');
        }

      });

    });
  }

  calculator() {
    const myOnOffSwitchOne = document.getElementById('myonoffswitch');
    const myOnOffSwitchTwo = document.getElementById('myonoffswitch-two');

    this.elemDoc.calcResult.value = +this.obj.priseOne + 1000;//значение по умолчанию
    myOnOffSwitchOne.addEventListener('change', () => {
      if (myOnOffSwitchOne.checked) {//если чекбокс включён

        //1 колодец
        const chamberOne = () => {
          this.elemDoc.sumpTwo.style.display = 'none';
          this.elemDoc.calcResult.value = +this.obj.priseOne + 1000;//цена за днище
          this.elemDoc.formControl.forEach((elem) => {

            elem.addEventListener('change', () => {

              if (this.elemDoc.formDiameterOne.value === '1.4 метра') {

                if (this.elemDoc.formNumberOne.value === '1 штука') {
                  this.elemDoc.calcResult.value = 10000;
                }
                if (this.elemDoc.formNumberOne.value === '2 штуки') {
                  this.elemDoc.calcResult.value = ((10000 * 30) / 100) + 10000;
                } else if (this.elemDoc.formNumberOne.value === '3 штуки') {
                  this.elemDoc.calcResult.value = ((10000 * 50) / 100) + 10000;
                }
              }

              if (this.elemDoc.formDiameterOne.value === '2 метра') {
                this.elemDoc.calcResult.value = ((10000 * 20) / 100) + 10000;

                if (this.elemDoc.formNumberOne.value === '1 штука') {
                  this.elemDoc.calcResult.value = 12000;
                }
                if (this.elemDoc.formNumberOne.value === '2 штуки') {
                  this.elemDoc.calcResult.value = ((10000 * 30) / 100) + 12000;
                } else if (this.elemDoc.formNumberOne.value === '3 штуки') {
                  this.elemDoc.calcResult.value = ((10000 * 50) / 100) + 12000;
                }
              }
              //
              this.obj.wellOne = this.elemDoc.calcResult.value;
              this.elemDoc.calcResult.value = +this.elemDoc.calcResult.value + 1000;//отображаем в примерной стоимости

            });
          });
        };
        chamberOne();

        //2 колодца
      } else if (!myOnOffSwitchOne.checked) {
        const chamberTwo = () => {
          this.elemDoc.sumpTwo.style.display = 'block';
          this.elemDoc.calcResult.value = +this.obj.priseTwo + 2000;

          this.elemDoc.formControl.forEach((elem) => {
            elem.addEventListener('change', () => {
              //1 proviso
              if (this.elemDoc.sumpTwo.style.display === 'block') {
                if (this.elemDoc.formDiameterOne.value === '1.4 метра' && this.elemDoc.formDiameterTwo.value === '1.4 метра') {
                  //1шт
                  if (this.elemDoc.formNumberOne.value === '1 штука') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = 15000;//15000
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = (15000 * 30) / 100 + 15000;//19500
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = (15000 * 50) / 100 + 15000;//22500
                    }
                  }
                  //2шт
                  if (this.elemDoc.formNumberOne.value === '2 штуки') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = (15000 * 30) / 100 + 15000;//19500
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = ((15000 * 30) / 100) * 2 + 15000;//24000
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 15000;//27000
                    }
                  }
                  //3шт
                  if (this.elemDoc.formNumberOne.value === '3 штуки') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = (15000 * 50) / 100 + 15000;//22500
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 15000;//27000
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = ((15000 * 50) / 100) * 2 + 15000;//30000
                    }
                  }
                }
                //2 proviso
                if (this.elemDoc.formDiameterOne.value === '2 метра' && this.elemDoc.formDiameterTwo.value === '1.4 метра' ||
                  this.elemDoc.formDiameterOne.value === '1.4 метра' && this.elemDoc.formDiameterTwo.value === '2 метра') {
                  this.elemDoc.calcResult.value = ((15000 * 20) / 100) + 15000;//18000
                  //1шт
                  if (this.elemDoc.formNumberOne.value === '1 штука') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = 18000;//18000
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = (15000 * 30) / 100 + 18000;//22500
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = (15000 * 50) / 100 + 18000;//25500
                    }
                  }
                  //2шт
                  if (this.elemDoc.formNumberOne.value === '2 штуки') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = (15000 * 30) / 100 + 18000;//22500
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = ((15000 * 30) / 100) * 2 + 18000;//27000
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 18000;//30000
                    }
                  }
                  //3шт
                  if (this.elemDoc.formNumberOne.value === '3 штуки') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = (15000 * 50) / 100 + 18000;//25500
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 18000;//30000
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = ((15000 * 50) / 100) * 2 + 18000;//33000
                    }
                  }
                }
                //3 proviso
                if (this.elemDoc.formDiameterOne.value === '2 метра' && this.elemDoc.formDiameterTwo.value === '2 метра') {
                  this.elemDoc.calcResult.value = ((15000 * 20) / 100) * 2 + 15000;//21000
                  //1шт
                  if (this.elemDoc.formNumberOne.value === '1 штука') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = 21000;//21000
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = (15000 * 30) / 100 + 21000;//25500
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = (15000 * 50) / 100 + 21000;//28500
                    }
                  }
                  //2шт
                  if (this.elemDoc.formNumberOne.value === '2 штуки') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = (15000 * 30) / 100 + 21000;//25500
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = ((15000 * 30) / 100) * 2 + 21000;//30000
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 21000;//33000
                    }
                  }
                  //3шт
                  if (this.elemDoc.formNumberOne.value === '3 штуки') {
                    if (this.elemDoc.formNumberTwo.value === '1 штука') {
                      this.elemDoc.calcResult.value = (15000 * 50) / 100 + 21000;//28500
                    } else if (this.elemDoc.formNumberTwo.value === '2 штуки') {
                      this.elemDoc.calcResult.value = (((15000 * 30) / 100) + ((15000 * 50) / 100)) + 21000;//33000
                    } else if (this.elemDoc.formNumberTwo.value === '3 штуки') {
                      this.elemDoc.calcResult.value = ((15000 * 50) / 100) * 2 + 21000;//36000
                    }
                  }
                }
                //
                this.obj.wellTwo = this.elemDoc.calcResult.value;
                this.elemDoc.calcResult.value = +this.elemDoc.calcResult.value + 2000;
              }
            });
          });
        };
        chamberTwo();
      }
    });
    //дно у колодца
    const wellBottom = () => {
      myOnOffSwitchTwo.addEventListener('change', () => {
        if (myOnOffSwitchTwo.checked) {
          if (this.elemDoc.sumpTwo.style.display === 'none') {
            if (+this.obj.wellOne > 0) {
              this.elemDoc.calcResult.value = +this.obj.wellOne + 1000;
            } else if (+this.obj.wellOne === 0) {
              this.elemDoc.calcResult.value = +this.obj.priseOne + 1000;
            }
          }
          if (this.elemDoc.sumpTwo.style.display === 'block') {
            if (+this.obj.wellTwo > 0) {
              this.elemDoc.calcResult.value = +this.obj.wellTwo + 2000;
            } else if (+this.obj.wellTwo === 0) {
              this.elemDoc.calcResult.value = +this.obj.priseTwo + 2000;
            }
          }
        } else if (!myOnOffSwitchTwo.checked) {
          if (this.elemDoc.sumpTwo.style.display === 'none') {
            if (+this.obj.wellOne > 0) {
              this.elemDoc.calcResult.value = +this.obj.wellOne;
            } else {
              this.elemDoc.calcResult.value = +this.obj.priseOne;
            }
          }
          if (this.elemDoc.sumpTwo.style.display === 'block') {
            if (+this.obj.wellTwo > 0) {
              this.elemDoc.calcResult.value = +this.obj.wellTwo;
            } else {
              this.elemDoc.calcResult.value = +this.obj.priseTwo;
            }
          }
        }
      });

    };
    wellBottom();

    //очистка объекта от значений 2-го колодца (выбран 1 колодец)
    const deletElemObj2 = () => {
      this.obj2.diameter2 = '';
      this.obj2.number2 = '';
    };

    //передаём значения в объект2
    const elemObj2 = () => {
      this.elemDoc.formControl.forEach((elem) => {
        elem.addEventListener('change', () => {
          if (this.elemDoc.sumpTwo.style.display === 'block') {
            if (elem === this.elemDoc.formDiameterOne) {
              this.obj2.diameter1 = elem.value;
            } else if (elem === this.elemDoc.formNumberOne) {
              this.obj2.number1 = elem.value;
            } else if (elem === this.elemDoc.formDiameterTwo) {
              this.obj2.diameter2 = elem.value;
            } else if (elem === this.elemDoc.formNumberTwo) {
              this.obj2.number2 = elem.value;
            }
          } if (this.elemDoc.sumpTwo.style.display === 'none') {
            if (elem === this.elemDoc.formDiameterOne) {
              this.obj2.diameter1 = elem.value;
            } else if (elem === this.elemDoc.formNumberOne) {
              this.obj2.number1 = elem.value;
            }
            deletElemObj2();//очистка значений при 1 колодце
          }
        });
      });
    };
    elemObj2();

    //Передаём расстояние в объект2
    const inputDistanceObj = () => {
      this.elemDoc.inputDistance.addEventListener('input', () => {
        this.obj2.result = +this.elemDoc.calcResult.value;
        this.obj2.distance = +this.elemDoc.inputDistance.value;
      });
    };
    inputDistanceObj();

    //Закрываем последний блок
    const closeCollapseFour = () => {
      this.elemDoc.btnFour.addEventListener('click', () => {//закрываем последний блок при нажатии на кнопку "получить расчёт"
        if (this.elemDoc.sumpTwo.style.display === 'none') {//проверка при выборе 1 колодца
          deletElemObj2();//очистка значений
        }
        if (this.elemDoc.collapseFourId.style.display === 'block') {
          this.elemDoc.collapseFourId.style.display = 'none';
        }
      });
    };
    closeCollapseFour();
  }

  sendForm() {
    const successMessage = 'Сообщение отправлено',
      loadMessage = 'Идёт отправка',
      errorMessage = 'Что-то пошло не так...';

    //создаём элемент с классом
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('statusmessage');

    //валидация инпутов
    const valid = (event, form) => {
      const elementsForm = [];//пустой массив для инпутов

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
          event.preventDefault();
          elem.style.border = '2px solid red';
          this.error.add(elem);//добавл. инпуты с ошибками в Set
        } else {
          this.error.delete(elem);//удал. инпуты из Seta
          elem.style.border = '';
        }
      });

    };

    //отправка и очистка
    const sendReset = (event, form, form2, obj) => {

      //создание формы для отправки
      const getForm = (event, form, form2, obj) => {

        event.preventDefault();//чтобы страница не перезагружалась по умолчанию
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;//идёт загрузка
        let body = {};//объект, ко-й отправл. на сервер в формате json

        let formData = new FormData(form);//получ. данные нашей формы c атрибутом name в объект
        if (form2) {
          for (const elem of form2.elements) {//вытаскиваем из формы инпуты
            if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
              formData.append(elem.name, elem.value);//добавляем ключ и значение в formData
            }
          }
        }
        if (obj) {
          for (let key in obj) {//эл. в др. объект
            body[key] = obj[key];
          }
        }
        formData.forEach((val, key) => {
          body[key] = val;
        });

        //postData - отправка на сервер
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

        postData(body)
          .then((response) => {//данные, ко-е мы получаем
            if (response.status !== 200) {
              throw new Error('status network not 200');//обрабатываем как ошибку через конструктор
            }
            statusMessage.textContent = successMessage;
          })
          .catch((error) => {
            statusMessage.style.color = '#bd1717';//красный цвет сообщения
            statusMessage.textContent = errorMessage;
            console.error(error);
          });

        setTimeout(() => {//убираем сообщение
          form.removeChild(statusMessage);
        }, 3000);
      };

      //очистка объекта
      const resetObj = () => {
        this.elemDoc.calcResult.value = '';
        this.elemDoc.inputDistance.value = '';
        this.obj = {
          priseOne: 10000,
          priseTwo: 15000,
          wellTwo: 0,
          wellOne: 0
        };
        this.obj2 = {
          result: 0,
          distance: 0,
          diameter1: '1.4 метра',
          diameter2: '1.4 метра',
          number1: '1 штука',
          number2: '1 штука'
        };
        this.elemDoc.formDiameterOne.value = '1.4 метра';
        this.elemDoc.formNumberOne.value = '1 штука';
        this.elemDoc.formDiameterTwo.value = '1.4 метра';
        this.elemDoc.formNumberTwo.value = '1 штука';
      };

      //очистка инпутов формы и значений объекта
      const inputReset = (form, form2, obj) => {

        for (const elem of form.elements) {
          if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
            elem.value = '';
            elem.removeAttribute('required');//удаляем required
          }
        }
        if (form2) {
          for (const elem of form2.elements) {
            if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
              elem.value = '';
              elem.removeAttribute('required');
            }
          }
        }
        if (obj) {//очистка при наличии объекта
          resetObj();
        }
      };

      if (!this.error.size) {//если size не содержит ошибки (в Set);size коли-во эл. в массиве Set
        getForm(event, form, form2, obj);
        inputReset(form, form2, obj);
      }
    };

    //если ошибок в массиве нет, удаляем мод. окно
    const popupNone = (popupWindow) => {
      if (!this.error.size) {
        setTimeout(() => {
          popupWindow.style.display = 'none';
        }, 6000);
      }
    };

    //отправка данных с форм
    this.elemDoc.mainForm.addEventListener('submit', (event) => {
      valid(event, this.elemDoc.mainForm);
      sendReset(event, this.elemDoc.mainForm);
    });

    this.elemDoc.captureForm.addEventListener('submit', (event) => {
      valid(event, this.elemDoc.captureForm);
      sendReset(event, this.elemDoc.captureForm);
    });

    this.elemDoc.callForm.addEventListener('submit', (event) => {
      valid(event, this.elemDoc.callForm);
      sendReset(event, this.elemDoc.callForm);
      popupNone(this.elemDoc.popupCall);
    });

    this.elemDoc.discountForm.addEventListener('submit', (event) => {
      valid(event, this.elemDoc.discountForm);
      sendReset(event, this.elemDoc.discountForm);
      popupNone(this.elemDoc.popupDiscount);
    });

    this.elemDoc.checkForm.addEventListener('submit', (event) => {
      valid(event, this.elemDoc.checkForm);
      sendReset(event, this.elemDoc.checkForm);
      popupNone(this.elemDoc.popupCheck);
    });

    this.elemDoc.consultationForm.addEventListener('submit', (event) => {
      valid(event, this.elemDoc.consultationForm);
      sendReset(event, this.elemDoc.consultationForm, this.elemDoc.directorForm);
      popupNone(this.elemDoc.popupConsultation);
    });

    this.elemDoc.discountCalcForm.addEventListener('submit', (event) => {//отправка формы
      valid(event, this.elemDoc.discountCalcForm);
      sendReset(event, this.elemDoc.discountCalcForm, null, this.obj2);
      popupNone(this.elemDoc.popupDiscountCalc);
    });

  }

}

const mySendFormCalc = new SendFormCalc();

export default mySendFormCalc;