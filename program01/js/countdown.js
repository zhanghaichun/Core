// 将正常canvas的宽和高定义为常亮
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;

// 定义圆的半径
var RADIUS = 8;

var MARGIN_LEFT = 30;
var MARGIN_TOP = 60;

const endTime = new Date();

// 将事件改变成距离现在一个小时
endTime.setTime( endTime.getTime() + 3600 * 1000 );

var curShowTimeSeconds = 0;

// 声明用来盛装小球的数组
var balls = [];

// 声明颜色的数组，小球的颜色从中任意选取
const colors = ["#0044cc", "#00bfff", "#5cd6d6", "#8533ff", "#33ffad", "#00cccc", "#ffa64d", "#ffdb4d", "#ff5c33", "#333300"];



window.onload = function() {

	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;

	MARGIN_LEFT = Math.round( WINDOW_WIDTH / 10 );
	RADIUS = Math.round( WINDOW_WIDTH * 4 / 5 /108 ) - 1;

	MARGIN_TOP = Math.round( WINDOW_HEIGHT / 5 );
	// 获得canvas对象
	var canvas = document.getElementById('canvas');

	// 获得context对象
	var context = canvas.getContext("2d");

	// 设置canvas的宽度和高度
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();

	setInterval(function() {
		// 开始渲染电子钟
		render( context );

		update();
	}, 50)
	


}


/* 用来更新时间的函数 */
function update() {

	// 获取显示的下一秒的时间。
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

		// 定义显示的时间
	var nextHours = parseInt( nextShowTimeSeconds / 3600 );
	var nextMinutes = parseInt( ( nextShowTimeSeconds - nextHours * 3600 ) / 60);
	var nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt( curShowTimeSeconds / 3600 );
	var curMinutes = parseInt( ( curShowTimeSeconds - curHours * 3600 ) / 60);
	var curSeconds = curShowTimeSeconds % 60;

	if ( nextSeconds != curSeconds ) {

		// 设置小时
		if ( parseInt( curHours / 10 ) != parseInt( nextHours / 10 )) {
			addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt( curHours / 10 ));
		}

		if ( parseInt( curHours % 10 ) != parseInt( nextHours % 10 )) {
			addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt( curHours % 10 ));
		}

		// 设置分钟
		if ( parseInt( curMinutes / 10 ) != parseInt( nextMinutes / 10 )) {
			addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt( curMinutes / 10 ));
		}

		if ( parseInt( curMinutes % 10 ) != parseInt( nextMinutes % 10 )) {
			addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt( curMinutes % 10 ));
		}

		// 设置秒数
		if ( parseInt( curSeconds / 10 ) != parseInt( nextSeconds / 10 )) {
			addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt( curSeconds / 10 ));
		}

		if ( parseInt( curSeconds % 10 ) != parseInt( nextSeconds % 10 )) {
			addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt( curSeconds % 10 ));
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();

	console.log(balls.length);

}

// 使小球动起来 
function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= WINDOW_HEIGHT - RADIUS) { // 当小球接触到底部边缘的时候，会被再次反弹起
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75; // 重力加速度设置为反向
		}
	}

	var cnt = 0;
	for (var i = 0; i < balls.length; i++) {
		// 确保小球在画布中 
		if( balls[i].x + RADIUS > 0 /* 左边 */&&  balls[i].x - RADIUS < WINDOW_WIDTH ) {
			balls[cnt++] = balls[i];
		}
	}

	while (balls.length > Math.min(300, cnt)) {
		balls.pop(); // 跳出屏幕之外的小球将会被移出数组
	}

	
}

/* 添加小球的方法 */
function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if ( digit[num][i][j] == 1 ) {
				// 定义单个小球的所有参数
				// 并把所有参数定义到对象中
				var aBall = {
					"x": x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					"y": y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					"g": 1.5 + Math.random(),
					"vx": Math.pow( -1, Math.ceil( Math.random() * 1000 ) ) * 4,
					"vy": -5,
					"color": colors[ Math.floor( Math.random() * colors.length ) ]
				};

				balls.push( aBall );
			}
			
		}// 内层for循环
	} // 外层for循环
} // addBalls()结束


/* 返回显示当前的时间 */
function getCurrentShowTimeSeconds() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round( ret / 1000 );

	return ret >= 0 ? ret : 0;
}



/* 此方法用来绘制电子钟的最初样式，定义显示的最初始的时间， 
使用的是digit.js中的矩阵。 */
function render( cxt ) {

	// 此方法对canvas进行刷新
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	// 定义显示的时间
	var hours = parseInt( curShowTimeSeconds / 3600 );
	var minutes = parseInt( ( curShowTimeSeconds - hours * 3600 ) / 60);
	var seconds = curShowTimeSeconds % 60;

	// 定义渲染数字的方法(使用矩阵)
	// 绘制小时
	renderDigit( MARGIN_LEFT, MARGIN_TOP, parseInt( hours / 10 ), cxt );
	renderDigit( MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt( hours % 10 ), cxt );
	renderDigit( MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt );

	// 绘制分钟
	renderDigit( MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt( minutes / 10 ), cxt );
	renderDigit( MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt( minutes % 10 ), cxt );
	renderDigit( MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt );

	// 绘制秒数
	renderDigit( MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt( seconds / 10 ), cxt );
	renderDigit( MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt( seconds % 10 ), cxt );

	for (var i = 0; i < balls.length; i++) {

			cxt.fillStyle = balls[i].color;
			cxt.beginPath();
			cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);
			cxt.closePath();

			cxt.fill();
	}

} // render方法结束

/* 此方法是用来渲染除数字的
	参数x, y是指绘制的起始点的
*/
function renderDigit(x, y, num, cxt ) {

	// 设置填充的圆球的颜色
	cxt.fillStyle = "#0DAEFF";

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			
			// 判断相应位置的数组如果为 1 ，那么就进行圆形的绘制
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1) + (RADIUS+1), y+i*2*(RADIUS+1) + (RADIUS+1), RADIUS, 0, 2*Math.PI );
				cxt.closePath();

				cxt.fill(); // 进行颜色填充
			}

		}
	}
} // renderDigit方法结束