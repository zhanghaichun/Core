window.onload = function(){
	// 获得容器对象
	var box = document.getElementById('container');

	// 获得图片元素的NodeList集合
	var img = box.getElementsByTagName('img');

	// 获取单张图片的宽度
	var imgWidth = img[0].offsetWidth;

	// 设置掩藏门体露出的宽度
	var exposeWidth = 160;

	// 设置图片盒子的总体宽度
	var boxWidth = ( imgWidth + (img.length - 1) * 160 );
	box.style.width = boxWidth + "px";

	// 设置每道门的初始位置
	function setImgPos() {
		for (var i = 1; i < img.length; i++) {
			img[i].style.left = ( imgWidth + exposeWidth * (i - 1) ) + "px";
		}
	}
	setImgPos(); // 首先需要执行一次
	// 计算每道门打开时应移动的距离
	var translate = imgWidth - exposeWidth;

	// img[0].style.left = "-270px";

	// 为每一道门绑定事件
	for (var i = 0; i < img.length; i++) {
		// 使用立即调用的函数表达式，为了获取不同的i值
		(function(i){ // 因为需要为每一张图片绑定事件
			img[i].onmouseover = function(){
				// 先将每道门复位
				setImgPos();
				// img[i].style.left = parseInt(img[i].style.left,10) - translate + "px";
				// 打开门
				for (var j = 1; j <= i; j++) {
					img[j].style.left = parseInt(img[j].style.left,10) - translate + "px";
				}
			}
		}(i));
	}

}