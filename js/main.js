$(document).ready(function() {
  const elMenuBtn = $('.btn-menu');
  const elLayer = $('.layer');
  const elNavBar = $('.navbar');
  const elsFooterBtn = $('.product__footer__title');
  const elShowMoreReasons = $('.show-more--reasons');
  const elShowMoreAbout = $('.show-more--about');


  

  ///////////////////////////
  //STICKY NAVBAR/////////
  //////////////////

  const elStickyNav = $('.header__bottom')


  const stickyNavTop = elStickyNav.offset().top
  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop();
    if (scrollTop > stickyNavTop) { 
      elStickyNav.addClass('sticky');
      elMenuBtn.addClass('btn-menu--sticky');
    } else {
      elMenuBtn.removeClass('btn-menu--sticky');
      elStickyNav.removeClass('sticky'); 
    }
  });





  //////////////////////////////




  /////////////////////////
  ///BASKET-RELATED//////
  //////////////////////

  

  const productsBasket = [];
  const basket = [];
  const elBasket = $('.basket');
  const elsAddToBasketBtn = $('.add-to-basket');
  const elBasketList = $('.basket-list');



  $('.products__list').flyto({
    item : 'li',
    target: '.basket',
    button: '.add-to-basket',
    shake: false
  });
  elsAddToBasketBtn.each(function() {
    $(this).on('click', function() {

      $(this).addClass('add-to-basket--added');
      $(this).prop('disabled',true)
      setTimeout(() => {
        $(this).removeClass('add-to-basket--added');
        $(this).prop('disabled',false)
      }, 500);
      
        
      
      const productData = getProductInfo($(this).prev());
      if (!productsBasket.includes(productData.name)) {
        productsBasket.push(productData.name);
        basket.push(productData);
        const elProductTemplate = `
        <li data-name="${productData.name}">
          <div class="basket-top basic-flex">
            <p class="basket-item-name">${productData.name}</p>
            <p class="basket-item-price"><span>${productData.price}</span><span>руб.</span></p>
          </div>
          <div class="basket-bottom basic-flex">
            <p class="item-quantity"><span class="exact-product-amount">${productData.amount}</span>шт.</p>
            <button class="btn basket-item-remove" type="button">Удалить</button>
          </div>
        </li>`
        elBasketList.append(elProductTemplate)
      } else {
        const elProductItem = $(`.basket-list li[data-name="${productData.name}"]`);
        const amount = parseInt(elProductItem.find('.exact-product-amount').text());
        const price = parseInt(elProductItem.find('.basket-item-price span:first-child').text());
        const elProductTemplate = `
        <div class="basket-top basic-flex">
          <p class="basket-item-name">${productData.name}</p>
          <p class="basket-item-price"><span>${productData.price + price}</span><span>руб.</span></p>
        </div>
        <div class="basket-bottom basic-flex">
          <p class="item-quantity"><span class="exact-product-amount">${productData.amount + amount}</span>шт.</p>
          <button class="btn basket-item-remove" type="button" data-name="${productData.name}">Удалить</button>
        </div>
        `
        elProductItem.html(elProductTemplate);
      }
      setTimeout(() => {
        setBasketBasicInfo()
      }, 1200);
    });
  });



  elBasket.on('click', function(evt) {
    evt.preventDefault();
    $('.basket-box').toggleClass('basket-box--shown');
  }); 


  $('.amount__add-btn').on('click', function(){
    const elAmountBox = $(this).parent().children('.exact-product-amount');
    let amount = elAmountBox.text();
    amount++;
    elAmountBox.text(amount);
  });

  $('.amount__remove-btn').on('click', function(){
    const elAmountBox = $(this).parent().children('.exact-product-amount');
    let amount = elAmountBox.text();
    if (amount > 1) {
      amount--;
      elAmountBox.text(amount);
    }
  });

  elBasketList.on('click', '.basket-item-remove', function() {
    $(this).parent().parent().remove();
    const i = productsBasket.indexOf($(this).data('name'));
    const j = basket.filter(a => a.name = productsBasket.indexOf($(this).data('name')));
    productsBasket.splice(i,1);
    basket.splice(basket.indexOf(j[0],1));
    setBasketBasicInfo()
  })

  /////////////////////////////////







  elShowMoreReasons.on('click', () => {
    if (elShowMoreReasons.text().toLowerCase() == "показать все") {
      const elsHiddenReasons = $('.reasons__item--hide');
      elsHiddenReasons.each(function() {
        $(this).attr('style',"display:block; opacity:1");
      });
      elShowMoreReasons.text("СКРЫТЬ ВСЕ"); 
    } else {
      const elsHiddenReasons = $('.reasons__item--hide');
      elsHiddenReasons.each(function() {
        $(this).attr('style',"display:none; opacity:0;");
      });
      elShowMoreReasons.text("показать все");
    }
  });

  elShowMoreAbout.on('click', () => {
    if (elShowMoreAbout.text().toLowerCase() == "показать ещё") {
      const elsHiddenText = $('.about__content--hide');
      elsHiddenText.each(function() {
        $(this).attr('style',"display:block; opacity:1");
      });
      elShowMoreAbout.text("СКРЫТЬ ВСЕ"); 
    } else {
      const elsHiddenText = $('.about__content--hide');
      elsHiddenText.each(function() {
        $(this).attr('style',"display:none; opacity:0;");
      });
      elShowMoreAbout.text("показать все");
    }
  });


  elMenuBtn.on('click', () => {

    elMenuBtn.toggleClass('menu-btn--active');
    elNavBar.toggleClass('navbar--active');
    elLayer.toggleClass('layer--active');
  }); 

  elLayer.on('click', () => {
    elMenuBtn.toggleClass('menu-btn--active');
    elNavBar.toggleClass('navbar--active');
    elLayer.toggleClass('layer--active');
  });

  elsFooterBtn.each(function() {

    $(this).on('click', () => {
      $(this).toggleClass('product__footer__title--active');
      const elBtnNextElement = $(this).next();
      if(elBtnNextElement.hasClass('product__footer__list__wrapper')) {
        elBtnNextElement.children().each(function() {
          $(this).toggleClass('footer__list--active');
        })
      } else {
        elBtnNextElement.toggleClass('footer__list--active');
      }
    })
  });





  /////////////////////
  ///FUNCTIONS//////
  ///////////////
  function getProductInfo(parentElement) {
    const productType = parentElement.children('h3').text();
    const name = parentElement.parent().parent().data('name');
    const price = parentElement.find('.price-and-amount strong').text().replace('руб.','');

    const amount = parentElement.find('.exact-product-amount').text();
    

    const data = {};
    data.name = productType + '(' + name + ')';
    data.price = parseInt(price) * parseInt(amount);
    data.amount = parseInt(amount);
    return data;
  }

  function getOverallBasketInfo() {
    let price = 0;
    let amount = 0; 

    elBasketList.children().each(function() {
      price += parseInt($(this).find('.basket-item-price span:first-child').text());
      amount += parseInt($(this).find('.exact-product-amount').text());
    });
    const data = {};
    data.price = price;
    data.amount = amount;
    return data;
  }

  function setBasketBasicInfo() {
    const productsInfo = getOverallBasketInfo();
    $('.overall-product-quantity').text(productsInfo.amount);
    $('.overall-price-amount').text(productsInfo.price);
    $('.basket').attr('data-amount', productsInfo.amount);
  }
});

