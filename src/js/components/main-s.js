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



