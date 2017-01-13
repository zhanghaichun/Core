$(function() {

	// console.log( $(".selectAward-pullUp").css("display") );
	var couponValue = 0;

	// 进度条
	var progressArr = [100/7*1,100/7*2,100/7*3,100/7*4,100/7*5,100/7*6,100/7*7,];

	// 成熟度
	var maturityArr = [1,2,3,4,5,6,7];

	// 花盆图片
	var dayPic = ['images/day1.png','images/day2.png','images/day3.png','images/day4.png','images/day5.png','images/day6.png','images/day7.png',];

	// 营养气泡的图片
	var bubblePic = ['images/plus1.png','images/plus2.png','images/plus3.png','images/plus4.png','images/plus5.png','images/plus6.png','images/plus7.png',];


	// 数组中存储不同的营养气泡的运动轨迹
	var animateBubble = ['bubble-day1','bubble-day2','bubble-day3','bubble-day4','bubble-day5','bubble-day6','bubble-day7',];

	$('.progress span').css({'width': '0%', 'border': '0 solid'});
	$('.maturity .value').text('0');

	/* ######### 浇水图片按钮点击事件 */
	/* 设置成熟度进度条的动态变化 */
	// 记录按钮点击的次数
	var btnCount = 1;
	var lockedNum = 1;
	$('.water a').click(function(){
		
		// 只有当点击按钮处于可点击状态的时候才会触发下面的效果
		if ( $(this).children('img').attr('src') == 'images/water.png' ) {

			// 显示水壶
			$('.water-pot').fadeIn(100);

			// 显示营养气泡
			$('.bubble').show();

			// 如果是点击属于第七天的浇花按钮
			if (btnCount == 7) {
				// 将进度条的进度和成熟度的数值都设置为最高值
				$('.progress span').css({'width': progressArr[0]*7+'%','border': '1px solid transparent'});
				$('.maturity .value').text(maturityArr[0]*7);

				// 将浇花按钮设置为灰色，不可点击状态
				$(this).find('img').attr('src','images/water-gray.png');

				/* 当签到七天之后，点击采摘就对应的有一个小花盆将会被解锁 */
				$('.week' + lockedNum + ' img').attr('src','images/unlocked-' + lockedNum + '.png');

				// 解锁花盆计数器的增长方式
				lockedNum = lockedNum == 5 ? 1 : (lockedNum + 1);

				// 当所有的花盆都已经解锁的时候，浇花和采摘按钮都处于不可点击状态
				if(lockedNum == 5) {
					$('.water a img').attr('src','images/water-gray.png');
					$('.pick a img').attr('src','images/兑换至灰@2x.png');
				}

				// 显示最后一盆鲜花
				$('.flowerpot img').attr('src', dayPic[6]);

				// 显示最后一个气泡
				$('.bubble img').attr('src', bubblePic[6]);

				// 设置营养气泡最后一个的动画轨迹
				$('.bubble').css({'animation': animateBubble[6] + ' 4s linear both running'});

				delete btnCount; // 删除计数器变量

				// 将采摘按钮设置为可点击状态
				$('.pick a img').attr('src','images/兑换按钮@2x.png');

				return; // 终止函数的执行
			}

			// 按照点击的次数来正确显示进度条中的进度和成熟度数值
			$('.progress span').css({'width': progressArr[0]*btnCount+'%','border': '1px solid transparent'});
			$('.maturity .value').text(maturityArr[0]*btnCount);

			// 设置鲜花图片随着天数的不断变化
			$('.flowerpot img').attr('src', dayPic[btnCount-1]);

			// 设置气泡图片随着天数的不断变化
			$('.bubble img').attr('src', bubblePic[btnCount-1]);

			// 设置营养气泡的动画轨迹
			$('.bubble').css({'animation': animateBubble[btnCount-1] + ' 4s linear both running'});

			setInterval(function() {
				if( $('.bubble').css('opacity') == 0 ) {
					$('.water-pot').fadeOut(300);
				}
			},30);

			// $('.water-pot').addClass('wp-animation');

			btnCount ++; // 每点击一次计数器就 +1
		}

	})


	/* ######### 采摘图片按钮点击事件 */
	// 当采摘的按钮是可以点击的时候，点击采摘的按钮将会使进度条的进度归零同时成熟度也是
	// 归零显示的
	
	$('.pick a').click(function() {
		// 只有在背景图片是可以兑换的时候，点击图片才有效果
		if( $('.pick a img').attr('src') == 'images/兑换按钮@2x.png' ) {
			// 进度条和成熟度数值的归零显示
			$('.progress span').css({'width': '0%', 'border': '0 solid'});
			$('.maturity .value').text('0');

			// 将花盆设置为还没有进行浇水的状态，也就是隐藏的状态。
			$('.flowerpot img').attr('src', 'images/day0.png');

			// 将浇花按钮设置为可点击的状态
			$('.water a img').attr('src','images/water.png');

			// 隐藏水壶
			$('.water-pot').fadeOut(100);

			// 隐藏营养气泡
			$('.bubble').hide();

			// 显示选择奖励的弹出框
			$(".selectAward-pullUp").show();

			/* 总共有四盆应该被解锁的小花盆，同时也对应着四张优惠券
			   每一个小花盆解锁之后对应的优惠券的面额也是不相同的，
			   但是在小花盆未解锁的时候四张优惠券全部是暗调的，也就是
			   不可以选择的，解锁相应的花盆，相应面额的优惠券是变亮的也就是可以选择的
			   */
			setTimeout(function () {
				if ($(".week1 img").attr("src") == "images/unlocked-1.png") {
					$(".awardFiche .fiche1").find("img.over").hide();
					$(".awardFiche .fiche1").click(function () {
						$(this).find("img.checked").show();
					});
				}

				if ($(".week2 img").attr("src") == "images/unlocked-2.png") {
					$(".awardFiche .fiche2").find("img.over").hide();
					$(".awardFiche .fiche2").click(function () {
						$(this).find("img.checked").show();
					});
				}

				if ($(".week3 img").attr("src") == "images/unlocked-3.png") {
					$(".awardFiche .fiche3").find("img.over").hide();
					$(".awardFiche .fiche3").click(function () {
						$(this).find("img.checked").show();
					});
				}

				if ($(".week4 img").attr("src") == "images/unlocked-4.png") {
					$(".awardFiche .fiche4").find("img.over").hide();
					$(".awardFiche .fiche4").click(function () {
						$(this).find("img.checked").show();
					});
				}

			},30);
			
			

		}


		// 将兑换设置为不可点击的图片按钮
		$('.pick a img').attr('src','images/pick-gray.png');

		
		btnCount = 1; // 重新声明并初始化全局计数器变量
	})

	// alert( $('.pick a').css('background-image') == 'url("img/pick.png")');

	// 点击活动规则按钮，弹出活动规则提示框
	$(".activity-rule a").click(function (e) {
		// e.preventDefault(); 
		$(".pullUp").show(); 
	});

	// 点击活动规则上面的取消按钮，活动规则弹出框消失
	$('.pullUp .pullUp-content img').click(function () {
		$('.pullUp').hide();
	});

	// 点击页面上的奖励列表按钮，弹出奖励列表的提示框
	$('.prizeList img').click(function () {
		$(".prizeList-pullUp").show();
	});

	// 点击奖品上面的取消按钮，活动规则弹出框消失
	$('.prizeList-pullUp .pullUp-content img').click(function () {
		$('.prizeList-pullUp').hide();
	});

	// 选择奖励弹出框中的兑换按钮的点击事件
	$(".selectAward-pullUp .convert").click(function () {
		// $(".selectAward-pullUp").hide();
		// $(".congratulation-pullUp").show();
		// $(".congratulation-pullUp .coupon .num").text(couponValue);
	});

	$(".selectAward-pullUp .convert input").click(function() {
		alert(111);
		$(this).attr("disabled","true");
	});

	// 点击优惠券进行选择的时候，使用之后优惠券变暗不能点击
	$(".selectAward-pullUp .awardFiche > div").click(function () {
		// 只有在优惠券是可以点击的情况下，此奖励才是可以兑换的
		if ($(this).find("img.over").css("display") == "none") {
			// $(this).find("img.over").show();
			couponValue = $(this).find("span").text();
		} else {
			$(this).unbind("click");
		}
		
		console.log(couponValue);
	});

	// 设置兑换奖励成功的弹出框的取消方式
	$(".congratulation-pullUp img").click(function () {
		$(".congratulation-pullUp").hide();
	});

	// 在选择奖励的弹出框中，如果选取留待日后按钮，那么
	// 选择奖励这个弹出框消失
	$(".selectAward-pullUp .leaveLater").click(function () {
		$(".selectAward-pullUp").hide();
	});
	
	
	


});

