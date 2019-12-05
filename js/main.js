'use strict';

//Мodal window

//Popup-call

const popupCall = () => {

  const popupCall = document.querySelector('.popup-call'),
    callBtn = document.querySelectorAll('.call-btn'),
    popupContent = document.querySelector('.popup-content');
  let count = 0;


  callBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      event.preventDefault();
      popupCall.style.display = 'block';
      popupContent.style.cssText = `border: 2px solid #90c406; box-shadow: 2px 4px 10px #222`;
      let popupInterval;
      const popupOpacity = function () {
        popupInterval = requestAnimationFrame(popupOpacity);
        count++;
        if (count <= 100) {//уменьшаем прозрачность
          console.log('count: ', count);
          popupContent.style.opacity = count + '%';
        } else {
          cancelAnimationFrame(popupInterval);
        }
      };
      popupOpacity();

    });
  });

  popupCall.addEventListener('click', (event) => {
    event.preventDefault();//чтобы не было прокрутки вверх 

    const countPopupNone = () => {//окно исчезает
      popupCall.style.display = 'none';
      count = 0;
    };

    let target = event.target;
    if (target.matches('.popup-close')) {
      countPopupNone();
    } else {
      target = target.closest('.popup-content');
      console.log('target: ', target);
      if (!target) {//если не получили popup-content, т.е. получили null при клике за пределами окна
        countPopupNone();//окно исчезает при клике за пределы окна
      }
    }

  });


};

popupCall();