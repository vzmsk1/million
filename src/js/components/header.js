const rem = function (rem) {
	if ($(window).width() > 768) {
		return 0.005208335 * $(window).width() * rem;
	} else {
		return (100 / 390) * (0.1 * $(window).width()) * rem;
	}
};

$( document ).ready(function() {
    $(".header__bottom-mob-burger").on('click', function() {
		$(".header__nav-mob").toggleClass("open-nav");
		$(".header").toggleClass("header--active");
		// $("main").toggleClass("main-none")
	});
	
	$(".header__bottom-mob-burger").on('click', function() {
		$(".header__bottom-mob-burger").toggleClass("open");
		// $("main").toggleClass("main-none")
	});



	$( ".catalog-t__box" ).hover( function(){
		$(this).toggleClass('active');
	});
		
	
	
});
