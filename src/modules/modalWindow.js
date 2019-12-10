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
              if (elem.style.border === 'solid red') {
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
    const popupCall = document.querySelector('.popup-call'),
      callBtn = document.querySelectorAll('.call-btn'),
      popupContentCall = document.querySelectorAll('.popup-content')[0],
      callForm = document.querySelectorAll('.capture-form')[1];

    btnAlertModal(callBtn, popupCall, popupContentCall, callForm);
  };
  popupCall();

  //Popup-discount
  const popupDiscount = () => {
    const btnDiscount = document.querySelectorAll('.discount-btn'),
      popupDiscount = document.querySelector('.popup-discount'),
      popupContentDiscount = document.querySelectorAll('.popup-content')[1],
      discountForm = document.querySelectorAll('.capture-form')[2];

    btnAlertModal(btnDiscount, popupDiscount, popupContentDiscount, discountForm);
  };
  popupDiscount();

  //Popup-discount-calculation
  const popupDiscountCalc = () => {
    const btnDiscountCalc = document.querySelectorAll('.btnFour'),
      popupDiscountCalc = document.querySelector('.popup-discount-calculation'),
      popupContentDiscountCalc = document.querySelectorAll('.popup-content')[4],
      discountCalcForm = document.querySelectorAll('.capture-form')[5];

    btnAlertModal(btnDiscountCalc, popupDiscountCalc, popupContentDiscountCalc, discountCalcForm);
  };
  popupDiscountCalc();

  //Popup-check
  const popupCheck = () => {
    const btnCheck = document.querySelectorAll('.gauging-button'),
      popupCheck = document.querySelector('.popup-check'),
      popupContentCheck = document.querySelectorAll('.popup-content')[2],
      checkForm = document.querySelectorAll('.capture-form')[3];

    btnAlertModal(btnCheck, popupCheck, popupContentCheck, checkForm);
  };
  popupCheck();

  //Popup-consultation
  const popupConsultation = () => {
    const btnConsultation = document.querySelectorAll('.consultation-btn'),
      popupConsultation = document.querySelector('.popup-consultation'),
      popupContentConsultation = document.querySelectorAll('.popup-content')[3],
      consultationForm = document.querySelectorAll('.capture-form')[4];

    btnAlertModal(btnConsultation, popupConsultation, popupContentConsultation, consultationForm);
  };
  popupConsultation();

};

export default modalWindow; 