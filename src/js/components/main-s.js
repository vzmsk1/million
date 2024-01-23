import $ from 'jquery';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import * as d3 from 'd3';

// init Swiper:

export const rem = function (rem) {
  if ($(window).width() > 768) {
    return 0.005208335 * $(window).width() * rem;
  } else {
    return (100 / 390) * (0.1 * $(window).width()) * rem;
  }
};




const catalogSwiper = new Swiper('.catalog__swiper', {
  modules: [Navigation, Pagination, EffectFade],
  spaceBetween: rem(1),
  slidesPerView: 'auto',
  wrapperClass: 'catalog__swiper-wrapper',
  slideClass: 'catalog__slide',
  navigation: {
    nextEl: '.catalog__swiper-arrow',
  },
});

const swiperPartnersTwo = new Swiper('.partners__swiper', {
  slidesPerView: 3,
  modules: [Autoplay],
  spaceBetween: rem(6.3),
  allowTouchMove: false,
  speed: 5500,
  freeMode: true,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false, //
  },

  breakpoints: {
    769: {
      slidesPerView: 5,
      spaceBetween: rem(16.5),
    },
  },
});

if (document.getElementById('map')) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map(
        'map',
        {
          center: [55.884721, 37.60372],

          zoom: 16,
        },
        {
          searchControlProvider: 'yandex#search',
        }
      ),
      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {},
        {
          // // Опции.
          // // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // // Своё изображение иконки метки.
          iconImageHref: 'assets/images/geo-map.svg',
          // Размеры метки.
          iconImageSize: [55, 88],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38],
        }
      ),
      myPlacemarkWithContent = new ymaps.Placemark(
        [55.785979, 37.660521],
        {
          hintContent: 'Собственный значок метки с контентом',
          balloonContent: 'А эта — новогодняя',
          iconContent: '12',
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: 'assets/images/geo-map.svg',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
          // Макет содержимого.
          iconContentLayout: MyIconContentLayout,
        }
      );

    myMap.geoObjects.add(myPlacemark).add(myPlacemarkWithContent);
  });
}

$('.g-box').on('click', function () {
  // const info = $(`.p-map__box[data-card='${$(this).attr('id')}']`);
  $('.g-box').not(this).removeClass('active').show(200);
  $(this).toggleClass('active').fadeIn(200);
  $('.p-map__box').not(this).removeClass('active').show(200);
  // info.toggleClass('active').fadeIn(200);
});

// $(document).mouseup(function (e) {
//   var container = $('.p-map__box');
//   var gBoxRemove = $('.g-box');
//   if (gBoxRemove && container.has(e.target).length === 0) {
//     container.removeClass('active');
//     gBoxRemove.removeClass('active');
//   }
// });

$('.g-box').hover(function () {
  const info = $(
    `.world-container-map-info-item[data-card='${$(this).attr('id')}']`
  );
  $('.g-box').not(this).removeClass('hover-g').show(200);
  $(this).toggleClass('hover-g').fadeIn(200);
  info.not(this).removeClass('hover-g').show(200);
  info.toggleClass('hover-g').fadeIn(200);
});

$('.world-container-filter--item').on('click', function () {
  $(this)
    .parents('.world-container-filter')
    .find('.world-container-filter--item')
    .removeClass('active');
  $(this).addClass('active');
});

$(document).ready(() => {
  let panzoomInstances = [];
  const width = screen.width;

  $('.p-map__floor').click(function () {
    var id = $(this).attr('data-tab'),
      content = $('.p-map__content[data-tab="' + id + '"]');

    panzoomInstances.forEach(panzoom => {
      panzoom.pan(0, 0);
      panzoom.zoom(width < 769 ? 1.5 : 1, { animate: false });
    });

    $('.p-map__floor.active').removeClass('active'); // 1
    $(this).addClass('active'); // 2

    $('.p-map__content.active').removeClass('active'); // 3
    content.addClass('active'); // 4
  });

  $('.p-map__boxs').on('click', '.p-map__box-desk-close', function (event) {
    console.log('close');
    $('.p-map__box').removeClass('active');
    $('.g-box').removeClass('active');
  });

  $('.p-map__content-block').on(
    'click',
    '.p-map__box-mob-close',
    function (event) {
      console.log('close');
      $('.p-map__box').removeClass('active');
      $('.g-box').removeClass('active');
    }
  );

  const svgContainers = document.querySelectorAll('.content-svg');
  if (svgContainers.length > 0) {
    const btnZoomIn = document.querySelector('.p-map__zoom-plus');
    const btnZoomOut = document.querySelector('.p-map__zoom-minus');
    svgContainers.forEach((svgContainer, index) => {
      const panzoom = Panzoom(svgContainer, {
        contain: 'outside',
        startScale: width < 769 ? 1.5 : 1,
        maxScale: width < 769 ? 2.5 : 2,
        minScale: width < 769 ? 1.5 : 1,
        startX: 0,
        startY: 0,
      });
      svgContainer.classList.add('no-pan');
      setTimeout(() => {
        panzoom.pan(0, 0, { animate: false });
        svgContainer.classList.remove('no-pan');
      }, 100);
      if (width < 769) {
        panzoom.zoom(1.5, { animate: false });
      } else {
        setTimeout(() => {
          panzoom.zoom(1.5, { animate: true });
        }, 500);
      }
      svgContainer.addEventListener('panzoomstart', event => {
        svgContainer.classList.add('no-touch');
      });

      svgContainer.addEventListener('panzoomend', event => {
        svgContainer.classList.remove('no-touch'); // => { x: 0, y: 0, scale: 1 }
      });

      panzoomInstances.push(panzoom);
    });

    // Обработка событий кнопок зума
    btnZoomIn.addEventListener('click', () => {
      panzoomInstances.forEach(panzoom => panzoom.zoomIn());
    });

    btnZoomOut.addEventListener('click', () => {
      panzoomInstances.forEach(panzoom => panzoom.zoomOut());
    });
  }
});

$('.p-map__item--bank').on('click', function () {
  $('.p-map__item').each((id, item) => {
    console.log(this);
    if (this !== item) {
      $(item).removeClass('active');
    } else {
      $('.g-toilet').removeClass('active');
      $('.g-staircase').removeClass('active');
      $('.g-box-exit').removeClass('active');
      $('.g-wardrobe').removeClass('active');
      $('.g-bank').toggleClass('active');
      $(this).toggleClass('active');
    }
  });
});

$('.p-map__item--toilet').on('click', function () {
  $('.p-map__item').each((id, item) => {
    console.log(this, item);
    if (this !== item) {
      $(item).removeClass('active');
    } else {
      $('.g-toilet').toggleClass('active');
      $('.g-staircase').removeClass('active');
      $('.g-box-exit').removeClass('active');
      $('.g-wardrobe').removeClass('active');
      $('.g-bank').removeClass('active');
      $(this).toggleClass('active');
    }
  });
});

$('.p-map__item--staircase').on('click', function () {
  $('.p-map__item').each((id, item) => {
    console.log(this, item);
    if (this !== item) {
      $(item).removeClass('active');
    } else {
      $('.g-staircase').toggleClass('active');
      $('.g-toilet').removeClass('active');
      $('.g-box-exit').removeClass('active');
      $('.g-wardrobe').removeClass('active');
      $('.g-bank').removeClass('active');
      $(this).toggleClass('active');
    }
  });
});
$('.p-map__item--exit').on('click', function () {
  $('.p-map__item').each((id, item) => {
    console.log(this, item);
    if (this !== item) {
      $(item).removeClass('active');
    } else {
      $('.g-box-exit').toggleClass('active');
      $('.g-staircase').removeClass('active');
      $('.g-toilet').removeClass('active');
      $('.g-wardrobe').removeClass('active');
      $('.g-bank').removeClass('active');
      $(this).toggleClass('active');
    }
  });
});
$('.p-map__item--wardrobe').on('click', function () {
  $('.p-map__item').each((id, item) => {
    console.log(this, item);
    if (this !== item) {
      $(item).removeClass('active');
    } else {
      $('.g-wardrobe').toggleClass('active');
      $('.g-box-exit').removeClass('active');
      $('.g-staircase').removeClass('active');
      $('.g-toilet').removeClass('active');
      $('.g-bank').removeClass('active');
      $(this).toggleClass('active');
    }
  });
});

const phoneMask = document.getElementById('phone-mask');

!(function () {
  const form = document.getElementById('form');
  const userName = document.getElementById('username');
  const email = document.getElementById('email');
  // const phone = document.getElementById("phone");
  const companyName = document.getElementById('company-name');
  const formActivity = document.getElementById('form-activity');
  const square = document.getElementById('square');

  // Показываем ошибку под полем
  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

  // Показываем, что поле заполнено верно
  function showSuccess(input, textarea) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  // Проверяем адрес электронной почты на правильность
  function checkEmail(input) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Адрес электронной почты имеет неверный формат');
    }
  }

  // Проверка обязательных полей
  /**
   *
   * @param {HTMLElement[]} inputElements
   * @returns {boolean}
   */
  function checkRequired(inputElements) {
    let isRequired = false;
    inputElements.forEach(function (input) {
      if (input.value.trim() === '') {
        showError(
          input,
          `Требуется задать значение для поля ${getFieldName(input)}`
        );
        isRequired = true;
      } else {
        showSuccess(input);
      }
    });

    return isRequired;
  }

  // Проверяем значение поля на соответствие минимальной и максимальной длине
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(input, `Поле  должно быть длиной не менее ${min} символов`);
    } else if (input.value.length > max) {
      showError(input, `Поле  не должно быть длиной более ${max} символов`);
    } else {
      showSuccess(input);
    }
  }

  // // Проверка соответствия паролей
  // function checkPasswordsMatch(input1, input2) {
  //   if (input1.value !== input2.value) {
  //     showError(input2, "Пароли не совпадают");
  //   }
  // }

  // Получаем имя поля
  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  // Устанавливаем слушатели событий на форму
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (checkRequired([userName, email, companyName, square, phoneMask])) {
        checkLength(userName, 3, 15);
        checkLength(companyName, 3, 15);
        checkEmail(email);
        checkLength(formActivity, 5, 100);
        checkLength(square, 3, 15);
        checkLength(phoneMask, 11, 11);
      }
    });
  }
})();

var initBox = false;

function initBoxDown() {
  if (window.innerWidth <= 768) {
    if (!initBox) {
      initBox = true;

      $('.p-map__searh-down-lists').hide(0);
      $('.p-map__searh-inner').on(
        'click',
        '.p-map__searh-down-block',
        function () {
          let more = $(this).find('.p-map__searh-down-block-box');
          let hide = $(this).find('.p-map__searh-down-lists');
          hide.slideToggle(300);
          more.toggleClass('active');
        }
      );
    }
  } else if (initBox) {
    initBox = false;
  }
}
initBoxDown();
window.addEventListener('load', initBoxDown);
window.addEventListener('resize', initBoxDown);
