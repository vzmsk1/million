import $ from 'jquery';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
// init Swiper:

const rem = function (rem) {
	if ($(window).width() > 768) {
		return 0.005208335 * $(window).width() * rem;
	} else {
		return (100 / 390) * (0.1 * $(window).width()) * rem;
	}
};

const mainSwiperOne = new Swiper('.main__swiper-one', {
		modules: [Navigation, Pagination, EffectFade],
		slidesPerView: 1,
		wrapperClass: 'main__swiper-wrapper-one',
		slideClass: 'main__one-s',
		speed: 500,
		autoplay: 1000,
		effect: 'fade',
		fadeEffect: {
		  crossFade: true
		},

		on: {
			slideChange: function (mainSwiperOne) {
				$('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
				$('.swiper-pagination-bullet:nth-child('+ (mainSwiperOne.realIndex % 3 + 1) +')').addClass('swiper-pagination-bullet-active');
			}
		  },
		
	
	
});
	
const mainSwiperTwo = new Swiper('.main__swiper-two', {
		modules: [Navigation, Pagination, EffectFade],
		slidesPerView: 1,
		wrapperClass: 'main__swiper-wrapper-two',
		slideClass: 'main__slide-t',
		speed: 500,
		autoplay: 1000,
		effect: 'fade',
		fadeEffect: {
		  crossFade: true
		},
		on: {
			slideChange: function (mainSwiperTwo ) {
				$('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
				$('.swiper-pagination-bullet:nth-child('+ (mainSwiperTwo .realIndex % 3 + 1) +')').addClass('swiper-pagination-bullet-active');
			}
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




ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
			center: [55.720702, 37.630104],
			zoom: 9
		}, {
			searchControlProvider: 'yandex#search'
		}),
  
		// Создаём макет содержимого.
		MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
		),
  
		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			hintContent: 'Собственный значок метки',
			balloonContent: 'Это красивая метка'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: 'images/myIcon.gif',
			// Размеры метки.
			iconImageSize: [30, 42],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-5, -38]
		}),
  
		myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
			hintContent: 'Собственный значок метки с контентом',
			balloonContent: 'А эта — новогодняя',
			iconContent: '12'
		}, {
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
			iconContentLayout: MyIconContentLayout
		});
  
	myMap.geoObjects
		.add(myPlacemark)
		.add(myPlacemarkWithContent);
  });