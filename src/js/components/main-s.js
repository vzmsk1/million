import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// init Swiper:
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination,],

});

const rem = function (rem) {
	if ($(window).width() > 768) {
		return 0.005208335 * $(window).width() * rem;
	} else {
		return (100 / 390) * (0.1 * $(window).width()) * rem;
	}
};

const mainSwiperOne = new Swiper('.main__swiper-one', {
		
		slidesPerView: 1,
		wrapperClass: 'main__swiper-wrapper-one',
		slideClass: 'main__one-s',
		speed: 500,
		modules: [EffectFade],
		effect: 'fade',
		fadeEffect: {
		  crossFade: true
		},
	
	
	
});
	
const mainSwiperTwo = new Swiper('.main__swiper-two', {
		
		slidesPerView: 1,
		wrapperClass: 'main__swiper-wrapper-two',
		slideClass: 'main__slide-t',
		speed: 500,
		effect: 'fade',
		fadeEffect: {
		  crossFade: true
		},
	
	
	
});



