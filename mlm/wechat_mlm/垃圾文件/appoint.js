$(function() {
	// "洗剪吹" 或 "洗吹" 选项被选中的时候，图标改为选中状态
	$(".wcb .left, .wc .left").click(function() {

		// 点击单选按钮，如果单选按钮是选中状态则取消选中，否则即为选中
		if ( $(this).find("img").attr('src') == "img/Image/未选中@2x.png" ) {
			$(this).find("img").attr('src',"img/Image/注册协议icon@2x.png");
			$(this).find("span").css({"color": "#f00"});
		} else {
			$(this).find("img").attr('src',"img/Image/未选中@2x.png");
			$(this).find("span").css({"color": "#000"});
		}

	})

	// 清除每一个列表项的浮动效果
	$(".list-item").addClass("clearfloat");

	// 服务类型项目去掉浮动
	$(".service-style .item").addClass("clearfloat");

	// 克隆一个元素添加到service-style中
	// $(".list-item:first-child .service-style .item:first-child").clone().appendTo(".list-item:first-child  .service-style");

	// $(".enter .sel").text("风格设计师");

	// 点击服务类型项后面的删除符号，执行删除操作
	$(".service-style .item > .right img").each(function(index,element) {
		$(element).click(function() {
			$(this).parents(".item").remove();
		})
	});
})