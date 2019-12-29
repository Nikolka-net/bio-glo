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

export default accordionTwo;