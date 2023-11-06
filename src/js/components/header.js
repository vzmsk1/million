const rem = function (rem) {
	if ($(window).width() > 768) {
		return 0.005208335 * $(window).width() * rem;
	} else {
		return (100 / 390) * (0.1 * $(window).width()) * rem;
	}
};

$( document ).ready(function() {
    $(".header__bottom-mob-burger").on('click', function() {
		$(".header__mob").toggleClass("active");
		$(".header__mob-catalog").removeClass("active");
	});
	$(".header__mob-top-item--catalog").click( function() {
		$(".header__mob-catalog").addClass("active");
	});
	$(".header__mob-catalog-back").click( function() {
		$(".header__mob-catalog").removeClass("active");
	});
	
	$(".header__bottom-mob-burger").on('click', function() {
		$(".header__bottom-mob-burger").toggleClass("open");
		// $("main").toggleClass("main-none")
	});



	$( ".catalog-t__box" ).hover( function(){
		$(this).toggleClass('active');
	});

	

	$('.header').each(function () {
        let more = $(this).find('.header__bottom-catalog');
        let hide = $(this).find('.header__menu');
        hide.hide(0);
        more.click(function () {
          hide.fadeToggle(200);
          more.toggleClass('active');
        });
    });
	

	$('.header__menu-item').each(function () {
        $(this).find('.header__menu-item');
        let hide = $(this).find('.header__menu-item-down');
        hide.hide(0);
        $(this).hover(function () {
          hide.fadeToggle(200);
          $(this).toggleClass('active');
		  
        });
    });

	$('.header__mob-catalog-inner').each(function () {
		let more = $(this).find('.header__mob-catalog-box');
        let hide = $(this).find('.header__mob-catalog-lists');
        hide.hide(0);
        $(this).click(function () {
          hide.slideToggle(200);
          more.toggleClass('active');
		  
        });
    });


	$('.contacts__bottom-left-item').click(function () {
		var id = $(this).attr('data-tab'),
			content = $('.contacts__bottom-left-content[data-tab="' + id + '"]');
	
		$('.contacts__bottom-left-item.active').removeClass('active'); // 1
		$(this).addClass('active'); // 2
	
		$('.contacts__bottom-left-content.active').removeClass('active'); // 3
		content.addClass('active'); // 4
	});
	
	
});
