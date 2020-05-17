const elMenuBtn = document.querySelector('.btn-menu');
const elLayer = document.querySelector('.layer');
const elNavBar = document.querySelector('.navbar');
const elsFooterBtn = document.querySelectorAll('.product__footer__title');

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