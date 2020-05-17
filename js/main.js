const elMenuBtn = document.querySelector('.btn-menu');
const elLayer = document.querySelector('.layer');
const elNavBar = document.querySelector('.navbar');

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