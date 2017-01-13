$(function(){

	setTimeout(function() {
		$('#myCarousel, .top-banner').carousel('pause');
	},30);

	// 定义自动执行函数，实现触屏滑动功能。
	(function swiper(selector) {
		// 手势向左
		$(selector).bind('swiperleft swipeleftup swipeleftdown', function() {
			$(this).carousel('next');
		});

		// 手势向右
		$(selector).bind('swiperright swiperightup swiperightdown', function() {
			$(this).carousel('prev');
		});
	})('.top-banner, #myCarousel');

	var mySwiper = new Swiper('.swiper-container', {
		autoplay: false,//可选选项，自动滑动
		spaceBetween : 30,
		width: $(".swiper-slide").width(),
	})

	setInterval(function() {
		$(".swiper-slide-active").css({
			"padding-left": "30px",
		});
	},20);


})