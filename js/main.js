const elMenuBtn = document.querySelector('.btn-menu');
const elLayer = document.querySelector('.layer');
const elNavBar = document.querySelector('.navbar');
const elsFooterBtn = document.querySelectorAll('.product__footer__title');
const elShowMoreReasons = document.querySelector('.show-more--reasons');
const elShowMoreAbout = document.querySelector('.show-more--about');

elShowMoreReasons.addEventListener('click', () => {
  if (elShowMoreReasons.textContent.toLowerCase() == "показать все") {
    const elsHiddenReasons = document.querySelectorAll('.reasons__item--hide');
    elsHiddenReasons.forEach(el => {
      el.style = "display:block; opacity:1";
    });
    elShowMoreReasons.textContent = "СКРЫТЬ ВСЕ"
  } else {
    const elsHiddenReasons = document.querySelectorAll('.reasons__item--hide');
    elsHiddenReasons.forEach(el => {
      el.style = "display:none; opacity:0;";
    });
    elShowMoreReasons.textContent = "показать все"
  }
});

elShowMoreAbout.addEventListener('click', () => {
  if (elShowMoreAbout.textContent.toLowerCase() == "показать ещё") {
    const elsHiddenText = document.querySelectorAll('.about__content--hide');
    elsHiddenText.forEach(el => {
      el.style = "display:block; opacity:1";
    });
    elShowMoreAbout.textContent = "СКРЫТЬ ВСЕ"
  } else {
    const elsHiddenText = document.querySelectorAll('.about__content--hide');
    elsHiddenText.forEach(el => {
      el.style = "display:none; opacity:0;";
    });
    elShowMoreAbout.textContent = "показать ещё"
  }
});


elMenuBtn.addEventListener('click', () => {

  elMenuBtn.classList.toggle('menu-btn--active');
  elNavBar.classList.toggle('navbar--active');
  elLayer.classList.toggle('layer--active');
}); 

elLayer.addEventListener('click', () => {
  elMenuBtn.classList.toggle('menu-btn--active');
  elNavBar.classList.toggle('navbar--active');
  elLayer.classList.toggle('layer--active');
});

elsFooterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('product__footer__title--active');
    const elBtnNextElement = btn.nextElementSibling;
    if(elBtnNextElement.classList.contains('product__footer__list__wrapper')) {
      elBtnNextElement.children[0].classList.toggle('footer__list--active');
      elBtnNextElement.children[1].classList.toggle('footer__list--active');
    } else {
      elBtnNextElement.classList.toggle('footer__list--active');
    }
  })
});