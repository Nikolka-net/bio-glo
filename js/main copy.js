'use strict';

//Мodal window

//Popup-call, popup-discount, popup-check, popup-consultation, popup-discount-calculation
const modalWindow = () => {
  const btnAlertModal = (btn, popupWindow, popupWindowContent, form) => {//вызов модального окна

    let count = 0;
    btn.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        //убираем border red
        if (form) {
          for (const elem of form.elements) {//вытаскиваем из формы инпуты
            if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
              elem.value = '';//очищаем инпуты
              if (elem.style.border === '2px solid red') {
                elem.style.border = '';
              }
              //убираем required
              if (elem.hasAttribute('required')) {
                elem.removeAttribute('required');
              }
            }
          }
        }
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
  //Popup-call
  const popupCall = () => {
    let popupCall = document.querySelector('.popup-call');
    const callBtn = document.querySelectorAll('.call-btn'),
      popupContentCall = document.querySelectorAll('.popup-content')[0],
      callForm = document.querySelectorAll('.capture-form')[1];

    btnAlertModal(callBtn, popupCall, popupContentCall, callForm);
  };
  popupCall();

  //Popup-discount
  const popupDiscount = () => {
    let popupDiscount = document.querySelector('.popup-discount');
    const btnDiscount = document.querySelectorAll('.discount-btn'),
      popupContentDiscount = document.querySelectorAll('.popup-content')[1],
      discountForm = document.querySelectorAll('.capture-form')[2];

    btnAlertModal(btnDiscount, popupDiscount, popupContentDiscount, discountForm);
  };
  popupDiscount();

  //Popup-discount-calculation
  const popupDiscountCalc = () => {
    let popupDiscountCalc = document.querySelector('.popup-discount-calculation');
    const btnDiscountCalc = document.querySelectorAll('.btnFour'),
      popupContentDiscountCalc = document.querySelectorAll('.popup-content')[4],
      discountCalcForm = document.querySelectorAll('.capture-form')[5];

    btnAlertModal(btnDiscountCalc, popupDiscountCalc, popupContentDiscountCalc, discountCalcForm);
  };
  popupDiscountCalc();

  //Popup-check
  const popupCheck = () => {
    let popupCheck = document.querySelector('.popup-check');
    const btnCheck = document.querySelectorAll('.gauging-button'),
      popupContentCheck = document.querySelectorAll('.popup-content')[2],
      checkForm = document.querySelectorAll('.capture-form')[3];

    btnAlertModal(btnCheck, popupCheck, popupContentCheck, checkForm);
  };
  popupCheck();

  //Popup-consultation
  const popupConsultation = () => {
    let popupConsultation = document.querySelector('.popup-consultation');
    const btnConsultation = document.querySelectorAll('.consultation-btn'),
      popupContentConsultation = document.querySelectorAll('.popup-content')[3],
      consultationForm = document.querySelectorAll('.capture-form')[4];


    btnAlertModal(btnConsultation, popupConsultation, popupContentConsultation, consultationForm);
  };
  popupConsultation();



};
modalWindow();

//AccordionTwo

const accordionTwo = () => {

  const btnAccordionTwo = document.querySelectorAll(`a[data-parent="#accordion-two"]`),
    collapseOne = document.querySelector('.collapseOne'),
    collapseTwo = document.querySelector('.collapseTwo'),
    collapseThree = document.querySelector('.collapseThree');


  const sailOpacityTwo = (panelCollapse) => {//плавное появление
    let count = 30;
    let panelInterval;
    const panelOpacityTwo = function () {
      panelInterval = requestAnimationFrame(panelOpacityTwo);
      count++;
      if (count <= 100) {//уменьшаем прозрачность
        panelCollapse.style.opacity = count + '%';
      } else {
        cancelAnimationFrame(panelInterval);
      }
    };
    panelOpacityTwo();
  };

  btnAccordionTwo.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();

      if (elem.closest('#headingOne-two')) {

        if (collapseOne.style.display === 'none') {
          collapseOne.style.display = 'block';
          sailOpacityTwo(collapseOne);
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
          sailOpacityTwo(collapseTwo);
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
          sailOpacityTwo(collapseThree);
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
    collapseThreeId = document.getElementById('collapseThree');
  let collapseFourId = document.getElementById('collapseFour');

  const sailOpacityOne = (panelCollapse) => {//плавное появление
    let count = 40;
    let panelInterval;
    const panelOpacityOne = function () {
      panelInterval = requestAnimationFrame(panelOpacityOne);
      count++;
      if (count <= 100) {//уменьшаем прозрачность
        panelCollapse.style.opacity = count + '%';
      } else {
        cancelAnimationFrame(panelInterval);
      }
    };
    panelOpacityOne();
  };

  btnAccordion.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      //One
      if (elem.closest('#headingOne')) {
        if (collapseOneId.style.display === 'none') {
          collapseOneId.style.display = 'block';
          sailOpacityOne(collapseOneId);
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
          sailOpacityOne(collapseTwoId);
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
          sailOpacityOne(collapseThreeId);
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
          sailOpacityOne(collapseFourId);
        }
      }

    });

  });

};
accordion();

//Send form and calculator

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
    console.log('checkForm: ', this.elemDoccheckForm);
    //массив для ошибочных инпутов, вмещает уникальные эл., не повторяются
    this.error = new Set();
  }
  start() {
    this.inputCheck();
    this.maskPhoneUse();
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
          elem.setAttribute('maxlength', '18');//ограничение на кол-во символов
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

  maskPhoneUse() {
    const elemPhone = document.querySelectorAll('.phone-user');
    elemPhone.forEach((elem) => {

      const maskPhone = (masked = '+7 (___) ___-__-__') => {
        function mask(event) {
          const keyCode = event.keyCode;
          const template = masked,

            def = template.replace(/\D/g, ""),
            val = elem.value.replace(/\D/g, "");
          let i = 0,
            newValue = template.replace(/[_\d]/g,
              function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
              });
          i = newValue.indexOf("_");
          if (i != -1) {
            newValue = newValue.slice(0, i);
          }
          let reg = template.substr(0, elem.value.length).replace(/_+/g,
            function (a) {
              return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(elem.value) || elem.value.length < 5 || keyCode > 47 && keyCode < 58) {
            elem.value = newValue;
          }
          if (event.type == "blur" && elem.value.length < 5) {
            elem.value = "";
          }
        }
        elem.addEventListener("input", mask);
        elem.addEventListener("focus", mask);
        elem.addEventListener("blur", mask);
      };
      maskPhone();
    });
  }

  calculator() {
    const myOnOffSwitchOne = document.getElementById('myonoffswitch');
    const myOnOffSwitchTwo = document.getElementById('myonoffswitch-two');

    // this.elemDoc.calcResult.value = +this.obj.priseOne + 1000;//значение по умолчанию
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

    //создаём элемент с классом для вывода сообщения
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('statusmessage');
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('statusdiv');

    //валидация инпутов
    const valid = (event, form) => {
      const elementsForm = [];//пустой массив для инпутов

      for (const elem of form.elements) {//вытаскиваем из формы инпуты
        if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
          elementsForm.push(elem);//пушим в массив только наши инпуты
        }
      }

      elementsForm.forEach(elem => {
        const patternText = (/^[а-яё\s]+$/i);
        const patternPhone = /^[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}$/;
        //const patternPhone = /^\+?[7]([-\''()]*\d){18}$/;
        //const patternEmail = /^[\w-]+@\w+\.\w{1,}\D$/;//после точки больше 1 символа, не цифры

        if (elem.value.trim() === '' || elem.name === 'user_phone' && !patternPhone.test(elem.value) ||
          elem.name === 'user_name' && !patternText.test(elem.value)) {//если не проходит валидацию
          event.preventDefault();
          elem.style.border = '2px solid red';
          this.error.add(elem);//добавл. инпуты с ошибками в Set
        } else {
          event.preventDefault();
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
        form.appendChild(statusDiv);
        statusDiv.appendChild(statusMessage);

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
          form.removeChild(statusDiv);
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
      event.preventDefault();
      valid(event, this.elemDoc.mainForm);
      sendReset(event, this.elemDoc.mainForm);
    });

    this.elemDoc.captureForm.addEventListener('submit', (event) => {
      event.preventDefault();
      valid(event, this.elemDoc.captureForm);
      sendReset(event, this.elemDoc.captureForm);
    });

    this.elemDoc.callForm.addEventListener('submit', (event) => {
      event.preventDefault();
      valid(event, this.elemDoc.callForm);
      sendReset(event, this.elemDoc.callForm);
      popupNone(this.elemDoc.popupCall);
    });

    this.elemDoc.discountForm.addEventListener('submit', (event) => {
      event.preventDefault();
      valid(event, this.elemDoc.discountForm);
      sendReset(event, this.elemDoc.discountForm);
      popupNone(this.elemDoc.popupDiscount);
    });

    this.elemDoc.checkForm.addEventListener('submit', (event) => {
      event.preventDefault();
      valid(event, this.elemDoc.checkForm);
      sendReset(event, this.elemDoc.checkForm);
      popupNone(this.elemDoc.popupCheck);
    });

    this.elemDoc.consultationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      valid(event, this.elemDoc.consultationForm);
      sendReset(event, this.elemDoc.consultationForm, this.elemDoc.directorForm);
      popupNone(this.elemDoc.popupConsultation);
    });

    this.elemDoc.discountCalcForm.addEventListener('submit', (event) => {
      event.preventDefault();
      valid(event, this.elemDoc.discountCalcForm);
      sendReset(event, this.elemDoc.discountCalcForm, null, this.obj2);
      popupNone(this.elemDoc.popupDiscountCalc);
    });

  }

}

const mySendFormCalc = new SendFormCalc();
mySendFormCalc.start();

