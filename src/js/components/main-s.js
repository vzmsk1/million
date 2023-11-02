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
		effect: 'fade',
		fadeEffect: {
		  crossFade: true
		},
		
	
	
});
	
const mainSwiperTwo = new Swiper('.main__swiper-two', {
		modules: [Navigation, Pagination, EffectFade],
		slidesPerView: 1,
		wrapperClass: 'main__swiper-wrapper-two',
		slideClass: 'main__slide-t',
		speed: 500,
		effect: 'fade',
		fadeEffect: {
		  crossFade: true
		},
	
	
	
});



