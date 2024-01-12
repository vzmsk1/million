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

const mainSwiperOne = new Swiper('.main__swiper-one', {
  modules: [Navigation, Pagination, EffectFade, Autoplay],
  slidesPerView: 1,
  wrapperClass: 'main__swiper-wrapper-one',
  slideClass: 'main__one-s',
  speed: 500,
  loop: true,
  autoplay: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },

  on: {
    slideChange: function (mainSwiperOne) {
      $('.swiper-pagination-bullet-one').removeClass(
        'swiper-pagination-bullet-one-active'
      );
      $(
        '.swiper-pagination-bullet-one:nth-child(' +
          ((mainSwiperOne.realIndex % 3) + 1) +
          ')'
      ).addClass('swiper-pagination-bullet-one-active');
    },
  },
});

const mainSwiperTwo = new Swiper('.main__swiper-two', {
  modules: [Navigation, Pagination, EffectFade, Autoplay],
  slidesPerView: 1,
  wrapperClass: 'main__swiper-wrapper-two',
  slideClass: 'main__slide-t',
  speed: 500,
  loop: true,
  autoplay: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  on: {
    slideChange: function (mainSwiperTwo) {
      $('.swiper-pagination-bullet').removeClass(
        'swiper-pagination-bullet-active'
      );
      $(
        '.swiper-pagination-bullet:nth-child(' +
          ((mainSwiperTwo.realIndex % 3) + 1) +
          ')'
      ).addClass('swiper-pagination-bullet-active');
    },
  },
});

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
  // allowTouchMove: false,
  speed: 5500,

  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false, //
  },

  breakpoints: {
    769: {
      slidesPerView: 'auto',
      modules: [Autoplay],
      spaceBetween: rem(16.5),
    },
  },
});

if (document.getElementById('map')) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map(
        'map',
        {
          center: [55.720702, 37.630104],
          zoom: 9,
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
        {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка',
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'images/myIcon.gif',
          // Размеры метки.
          iconImageSize: [30, 42],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38],
        }
      ),
      myPlacemarkWithContent = new ymaps.Placemark(
        [55.661574, 37.573856],
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
          iconImageHref: 'images/ball.png',
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
  });
}

$('.map-class g').on('click', function () {
  const info = $(`.p-map__box[data-card='${$(this).attr('id')}']`);
  $('.map-class g').not(this).removeClass('active').show(200);
  $(this).toggleClass('active').fadeIn(200);
  $('.p-map__box').not(this).removeClass('active').show(200);
  info.toggleClass('active').fadeIn(200);
});

$(document).mouseup(function (e) {
  var container = $('.p-map__box');
  if (container.has(e.target).length === 0) {
    container.removeClass('active');
  }
});

$('.map-class g').hover(function () {
  const info = $(
    `.world-container-map-info-item[data-card='${$(this).attr('id')}']`
  );
  $('.map-class g').not(this).removeClass('hover-g').show(200);
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

$('.p-map__floor').click(function () {
  var id = $(this).attr('data-tab'),
    content = $('.p-map__content[data-tab="' + id + '"]');

  $('.p-map__floor.active').removeClass('active'); // 1
  $(this).addClass('active'); // 2

  $('.p-map__content.active').removeClass('active'); // 3
  content.addClass('active'); // 4
});

let data = [],
  width = 801,
  height = 494,
  numPoints = 100;

let zoom = d3.zoom().scaleExtent([0.25, 10]).on('zoom', handleZoom);

function updateData() {
  data = [];
  for (let i = 0; i < numPoints; i++) {
    data.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
    });
  }
}

function initZoom() {
  d3.select('.content-svg').call(zoom);
}

function handleZoom(e) {
  d3.select('.content-svg g').attr('transform', e.transform);
}

function zoomIn() {
  d3.select('.content-svg').transition().call(zoom.scaleBy, 2);
}

function zoomOut() {
  d3.select('.content-svg').transition().call(zoom.scaleBy, 0.5);
}

// function resetZoom() {
// 	d3.select('svg')
// 		.transition()
// 		.call(zoom.scaleTo, 1);
// }

// function center() {
// 	d3.select('svg')
// 		.transition()
// 		.call(zoom.translateTo, 0.5 * width, 0.5 * height);
// }

// function panLeft() {
// 	d3.select('svg')
// 		.transition()
// 		.call(zoom.translateBy, -50, 0);
// }

// function panRight() {
// 	d3.select('svg')
// 		.transition()
// 		.call(zoom.translateBy, 50, 0);
// }

// function update() {
// 	d3.select('content-svg g')
// 		.selectAll('circle')
// 		.data(data)
// 		.join('circle')
// 		.attr('cx', function(d) { return d.x; })
// 		.attr('cy', function(d) { return d.y; })
// 		.attr('r', 3);
// }

initZoom();

const zoomPlus = document.querySelector('.p-map__zoom-plus');
const zoomMinus = document.querySelector('.p-map__zoom-minus');

if (zoomPlus) {
  zoomPlus.addEventListener('click', () => {
    zoomIn();
  });
}

if (zoomMinus) {
  zoomMinus.addEventListener('click', () => {
    zoomOut();
  });
}
jQuery(function ($) {
  $('#phone-mask').mask('+7(999) 999-9999');
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
})();
