$(function() {

	/* 发型分类下拉列表的显示与隐藏 */
	$("li.intel").click(function() {
		if ( $(".overlay").css("display") == "block" ) {
			$(".overlay").hide();
			$("body").css("overflow","auto");
		} else {
			$(".overlay").show();
			$("body").css({"overflow-y": "hidden"});
			$(".overlay-allArea").hide();
		}

	})

	/* 当点击遮罩层的时候，隐藏遮罩层和智能排序的选择列表项 */
	$(".overlay").click(function(){
		// 隐藏自身
		// $(this).hide();

		// 隐藏列表项
		// $("ul.intel-sort").hide();
	})


	/* 智能排序下拉列表的点击时的各种效果 */
	// 点击是选中项为灰色
	$(".intel-sort li").click(function() {

		// 隐藏遮罩层
		$(".overlay").hide();
		$("body").css({"overflow-y": "auto"});

		// 改变列表项的背景颜色和其中文字的颜色
		$(this).css({ "background": "#aaa"});
		$(this).find("a").css({ "color": "#fff"});

		$(this).siblings("li").css({ "background": "#fff"});
		$(this).siblings("li").find("a").css({ "color": "#bbb"});

		// 点击列表中列表项的任意一项，列表隐藏
		// $(this).parent().hide();

		// 只有当列表项的内部文字不是 ”智能排序“ 的时候，才会改变发型分类的文字和图片
		// 否则还是显示 “智能排序” 字样。
		if ( $(this).find("a").text() != "智能排序" ) {
			// 智能排序触发（链接）改变文字
			$("li.intel").find("span").text( $(this).find("a").text() ).css({"color": "#f00"});
			// 改变图片
			$("li.intel img").attr("src", "img/Image/city－arrow－up@2x.png");
		} else {
			$("li.intel").find("span").text( "智能排序" ).css({"color": "#000"});
			$("li.intel img").attr("src", "img/Image/city－arrow－down@2x.png");
		}
		
	})

	/* 实现全部区域的点击效果，一开始全部区域遮罩层和列表是隐藏的，点击全部区域之后
	遮罩层和其中的内容才可以显示出来，左边的选择区域栏是在点击的时候更换背景颜色和其中的文字颜色，
	右边区域中的文字在点击之后是变成红色的，之后全部区域中的文字会变为相应的地址同时颜色改变，变为红色。 */

	// 当点击全部区域的时候，会显示遮罩层。
	$(".all-area").click(function() {
		if ( $(".overlay-allArea").css("display") == "block" ) {
			$(".overlay-allArea").hide();
			$("body").css({"overflow-y": "auto"});
		} else {
			$(".overlay-allArea").show();
			$("body").css({"overflow-y": "hidden"});
			$(".overlay").hide();
		}
	})

	$(".overlay-allArea .allArea li").click(function() {

		$(this).css({"background": "transparent"});
		$(this).find("a").css({"color": "#000"});

		$(this).siblings("li").css({"background": "#fff"});
		$(this).siblings("li").find("a").css({"color": "#bbb"});
	})

	// 地址文字的颜色变为红色
	$(".area-addr li").click(function() {

		$(this).find("a").css({"color":"#f00"});
		$(this).siblings("li").find("a").css({"color":"#000"});

		$(".overlay-allArea").fadeOut(100);
		$("body").css({"overflow-y": "auto"});

		$(".all-area").find("span.red").text( $(this).find("a").text() ).css({
			"font-size": ".6em",
			"color": "#f00"
		});

		$(".all-area").find("img").attr("src","img/Image/city－arrow－up@2x.png");
	})

	// 点击搜索图标的时候，出来搜索框，提示输入设计师的姓名
	$(".title .right").click(function() { $(".search").show(); })

	// 取消设计师搜索
	// 点击设计师搜索中的取消按钮
	$(".cancel-search").click(function() { 
		// 设计师搜索容器隐藏
		$(".search").hide(); 
		// 窗口滚动条置顶
		$(window).scrollTop(0);
	})

	// $(window).scroll(function() {
	// 	$(".search").css({"position": "fixed"});
	// })

	setInterval(function() {
		// if($(window).scrollTop() == 0) {
		// 	$(".search").css({"position": "static"});
		// }

		if($(".search input").val() != "") {
			$(".search img").show();

		} else {
			$(".search img").hide();
		}

	},50);

	// 当搜索框中的删除按钮点击的时候，将文本框中的内容清空
	$(".search img").click(function() {
		$(".search input").val("");
	})

	// 分页显示
	var counter = 0;
	// 每页展示4个
	var num = 4;
	var pageStart = 0,pageEnd = 0;

	// dropload
	$('.outer-container').dropload({
  	scrollArea : window,
    // 每一次下拉的时候都执行一次该函数
    loadDownFn : function(me){
      $.ajax({
        type: 'GET',
        url: './json/stylist.json',
        dataType: 'json',
        success: function(data){
          // console.log(data);
          var result = '';
          counter++; // 1 2 3
          pageEnd = num * counter; // 4 8 12
          pageStart = pageEnd - num; // 0 4 8

          for(var i = pageStart; i < pageEnd; i++){
            result += '<div class="col-xs-12 opacity"><a href="stylist-details.html"><div class="img-content"><div class="location"><img src="img/image/pos.png"> <span class="location-txt">' + data.lists[i]["location-txt"] + '</span></div><ul class="first-minus"></ul><img class="stylist" src="'+ data.lists[i].stylist +'"></div></a><div class="appoint-content"><div class="stylistIntro clearfloat"><div class="intro"><a href="stylist-elegant.html"><span class="name">' + data.lists[i].name + '</span><span class="level">' + data.lists[i].level + '</span><ul><li><span class="colls">' + data.lists[i].colls + '</span> 收藏</li><li>|</li><li><span class="mos">' + data.lists[i].mos + '</span> 美单</li><li>|</li><li>剪发 <span class="text-danger price">' + data.lists[i].price + '</span></li></ul></a></div><div class="appoint"><span class="line"></span><a href="appoint.html"><img src="img/Image/iconImage/others-icon/设计师列表(发型详情)-预约@3x.png"></a></div></div></div></div>';
            if((i + 1) >= data.lists.length){
              // 锁定
              me.lock();
              // 无数据
              me.noData();
              break;
            }

              
          } // for -->

          // 为了测试，延迟1秒加载
          setTimeout(function(){
            $('.row').append(result);
            // 每次数据加载完，必须重置
            me.resetload();

          },1000);


        },
        error: function(xhr, type){
          alert('Ajax error!');
          // 即使加载出错，也得重置
          me.resetload();
        }
      }); // ajax -->
    } // loadDownFn -->
	}); // dropload -->

})