$(function() {

	/* 发型分类下拉列表的显示与隐藏 */
	$("li.sort").click(function() {
		if ( $(".overlay").css("display") == "block" ) {
			// 显示遮罩层
			$(".overlay").hide();
			$("body").css("overflow","auto");
		} else {
			$(".overlay").show();
			$("body").css("overflow","hidden");
		}

		
	})

	/* 关注和时间点击之后变换文字颜色和图片 */
	$(".attention, .time").click(function() {
		$(this).find("span").css("color","#f00");
		$(this).find("img").attr("src", "img/Image/arrow_down@2x.png");

		// $(this).siblings(".red").find("span").css("color","#000");
		// $(this).siblings(".red").find("img").attr("src", "img/Image/arrow_default@2x.png");
	})

	/* 当点击遮罩层的时候，隐藏遮罩层和发型分类的选择列表项 */
	$(".overlay").click(function(){
		// 隐藏自身
		$(this).hide();

	})


	/* 发型分类下拉列表的点击时的各种效果 */
	// 点击是选中项为灰色
	$(".hairdo-sort li").click(function() {

		// 隐藏遮罩层
		$(".overlay").hide();

		// 改变列表项的背景颜色和其中文字的颜色
		$(this).css({ "background": "#ddd"});
		$(this).find("a").css({ "color": "#f00"});

		$(this).siblings("li").css({ "background": "#fff"});
		$(this).siblings("li").find("a").css({ "color": "#bbb"});

		// 点击列表中列表项的任意一项，列表隐藏
		// $(this).parent().hide();

		// 只有当列表项的内部文字不是 ”全部“ 的时候，才会改变发型分类的文字和图片
		// 否则还是显示 “发型分类” 字样。
		if ( $(this).find("a").text() != "全部" ) {
			$("li.sort").find("span").text( $(this).find("a").text() ).css("color","#f00");
			// 改变图片
			$("li.sort img").attr("src", "img/Image/screen－arrow－up@2x.png");
		} else {
			$("li.sort").find("span").text( "发型分类" ).css("color","#000");
			$("li.sort img").attr("src", "img/Image/city－arrow－down@2x.png");
		}
		
	})


	// $(".row .col-xs-6").find("span").attr("contenteditable","true");

	// setInterval(function() {
	// 	$(".row .col-xs-6").find("span").each(function() {
	// 		if($(this).text().length <= 13) {
	// 			$(this).css({
	// 				"height": "3em",
	// 				"line-height": "3em"
	// 			});
	// 		} else {
	// 			$(this).css({"line-height": "normal"});
	// 		}
	// 	});
	// },50);

	$(".anchor img").wrap("<a href='#top'>");

	

	// setInterval(function() {
	// 	if ( $(window).scrollTop() == 0 ) {
	// 		$(".anchor").fadeOut(50);
	// 	}
	// },30)

	$(window).scroll(function() {
		$(".anchor").fadeIn();

		if ( $(window).scrollTop() == 0 ) {
			$(".anchor").fadeOut(50);
		}
	})

	// 分页显示
		var counter = 0;
		// 每页展示4个
		var num = 4;
		var pageStart = 0,pageEnd = 0;

		// dropload
		$('.container-fluid').dropload({
	  	scrollArea : window,
	    // 每一次下拉的时候都执行一次该函数
	    loadDownFn : function(me){
	      $.ajax({
	        type: 'GET',
	        url: './json/hairdo.json',
	        dataType: 'json',
	        success: function(data){
	          // console.log(1);
	          var result = '';
	          counter++; // 1 2 3
	          pageEnd = num * counter; // 4 8 12
	          pageStart = pageEnd - num; // 0 4 8

	          for(var i = pageStart; i < pageEnd; i++){
	            result += '<div class="col-xs-6 opacity"><div class="wrapper"><a href="hairdo-details2.html"><img class="pic img-responsive" src="'+ data.lists[i].pic +'"></a><div class="flex"><span class="des">' + data.lists[i].des + '</span></div></div></div>';
	            if((i + 1) >= data.lists.length){
	              // 锁定
	              me.lock();
	              // 无数据
	              me.noData();
	              break;
	            }

	            // me.lock();

	              
	          } // for -->

	          // 为了测试，延迟1秒加载
	          // $(window).on("touchend",function() {
		          setTimeout(function(){
		          	// me.unlock();
	          		$('.row').append(result);
	          		// 每次数据加载完，必须重置
	          		me.resetload();
		          },1000);
	          // });
	          
	        },
	        error: function(xhr, type){
	          alert('Ajax error!');
	          // 即使加载出错，也得重置
	          me.resetload();
	        }
	      }); // ajax -->
	    } // loadDownFn -->
		}); // dropload -->


		// $("body").on("touchstart",function() {
		// 	console.log("觉得双方均");
		// });




})