$(function() {

	// 选择类型按钮点击之后的效果
	$(".fair-len .len").each(function(index, element) {
		$(element).click(function() {
			$(this).css({
				"background": "#f00",
				"color": "#fff"
			});

			$(this).siblings().css({
				"background": "#fff",
				"color": "#000"
			});
		})
	})

	// 当选中对应类型的时候更改为选中的图片，否则则取消选中
	$(".list-item .left").click(function() {

		// 点击单选按钮，如果单选按钮是选中状态则取消选中，否则即为选中
		if ( $(this).find("img").attr('src') == "img/Image/未选中@2x.png" ) {
			$(this).find("img").attr('src',"img/Image/选中@2x.png");
		} else {
			$(this).find("img").attr('src',"img/Image/未选中@2x.png");
		}
	})



})