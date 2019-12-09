const sendForm = () => {
  const successMessage = 'Сообщение отправлено',
    loadMessage = 'Идёт отправка',
    errorMessage = 'Что-то пошло не так...';

  const mainForm = document.querySelector('.main-form'),
    captureForm = document.querySelectorAll('.capture-form')[0],
    callForm = document.querySelectorAll('.capture-form')[1],
    discountForm = document.querySelectorAll('.capture-form')[2],
    discountCalcForm = document.querySelectorAll('.capture-form')[5],
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
        if (elem.matches('.distance')) {
          elem.value = elem.value.replace(/\D/, '');
        }

      });

    });
  };
  inputNameTel();

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem; color: ##90c406`;

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

  function valid(event, form, form2, obj) {
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
      getForm(event, form, form2, obj);
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

  //Calculator online

  const calculatorOnline = function calculatorOnlineFunc() {
    const myOnOffSwitchOne = document.getElementById('myonoffswitch'),
      myOnOffSwitchTwo = document.getElementById('myonoffswitch-two'),
      sumpTwo = document.querySelector('.sumpTwo'),
      formControl = document.querySelectorAll('.form-control'),
      formDiameterOne = document.querySelectorAll('.form-control')[0],
      formNumberOne = document.querySelectorAll('.form-control')[1],
      formDiameterTwo = document.querySelectorAll('.form-control')[2],
      formNumberTwo = document.querySelectorAll('.form-control')[3];
    let inputDistance = document.querySelector('.distance');
    let calcResult = document.getElementById('calc-result');
    let btnFour = document.querySelector('.btnFour');
    let collapseFourId = document.getElementById('collapseFour');


    let obj = {
      priseOne: 10000,
      priseTwo: 15000,
      wellTwo: 0,
      wellOne: 0
    };
    let obj2 = {
      result: 0,
      distance: 0,
      diameter1: '1.4 метра',
      diameter2: '1.4 метра',
      number1: '1 штука',
      number2: '1 штука',
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
            calcResult.value = +calcResult.value + 1000;//отображаем в примерной стоимости

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
            calcResult.value = +obj.wellOne;
          } else {
            calcResult.value = +obj.priseOne;
          }
        }
        if (sumpTwo.style.display === 'block') {
          if (+obj.wellTwo > 0) {
            calcResult.value = +obj.wellTwo;
          } else {
            calcResult.value = +obj.priseTwo;
          }
        }
      }
    });

    //Dimeter and number 
    const resetObj2 = () => {//очистка объекта от ненужных значений
      obj2.diameter2 = '';
      obj2.number2 = '';
    };

    formControl.forEach((elem) => {
      elem.addEventListener('change', () => {
        if (sumpTwo.style.display === 'block') {
          if (elem === formDiameterOne) {
            obj2.diameter1 = elem.value;
          } else if (elem === formNumberOne) {
            obj2.number1 = elem.value;
          } else if (elem === formDiameterTwo) {
            obj2.diameter2 = elem.value;
          } else if (elem === formNumberTwo) {
            obj2.number2 = elem.value;
          }
        } if (sumpTwo.style.display === 'none') {
          if (elem === formDiameterOne) {
            obj2.diameter1 = elem.value;
          } else if (elem === formNumberOne) {
            obj2.number1 = elem.value;
          }
          resetObj2();//очистка значений при 1 колодце
        }
      });
    });

    //Input distance
    inputDistance.addEventListener('input', () => {
      obj2.result = +calcResult.value;
      obj2.distance = +inputDistance.value;
    });

    btnFour.addEventListener('click', () => {//закрываем последний блок при нажатии на кнопку "получить расчёт"
      reset();
      if (sumpTwo.style.display === 'none') {//проверка при выборе 1 колодца
        resetObj2();//очистка значений
      }
      if (collapseFourId.style.display === 'block') {
        collapseFourId.style.display = 'none';
      }
    });

    const reset = () => {
      calcResult.value = '';
      inputDistance.value = '';
    };

    const resetObj = () => {//очистка объекта
      obj = {
        priseOne: 10000,
        priseTwo: 15000,
        wellTwo: 0,
        wellOne: 0
      };
      obj2 = {
        result: 0,
        distance: 0,
        diameter1: '1.4 метра',
        diameter2: '1.4 метра',
        number1: '1 штука',
        number2: '1 штука'
      };
      formDiameterOne.value = '1.4 метра';
      formNumberOne.value = '1 штука';
      formDiameterTwo.value = '1.4 метра';
      formNumberTwo.value = '1 штука';
    };

    discountCalcForm.addEventListener('submit', (event) => {//отправка формы
      valid(event, discountCalcForm, null, obj2);
      resetObj();
    });
  };

  calculatorOnline();

};

export default sendForm;