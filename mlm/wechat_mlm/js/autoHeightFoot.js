// var AHFoffsetY = 0
// var AHFobj = document.createElement("div")
// AHFobj.id = 'AHFobj'
// AHFobj.style.width = '100%'
// document.getElementById("box").appendChild(AHFobj)
// document.addEventListener('touchstart', function(event) {
// // 　　　　 event.preventDefault()
//     AHFoffsetY  = event.targetTouches[0].pageY
// }, false)
// document.addEventListener('touchmove', function(event) {
// // 　　　　 event.preventDefault()
//     AHFobj.style.height = AHFoffsetY  - event.targetTouches[0].pageY + 'px'
// }, false)
// document.addEventListener('touchend', function(event) {
// // 　　　　 event.preventDefault()
//     AHFobj.style.height = 0
// }, false)

function stopDrop() {
    var lastY,lastX;//最后一次y坐标点
    $(document.body).on('touchstart', function(event) {
    		//点击屏幕时记录最后一次Y度坐标。
        lastY = event.originalEvent.changedTouches[0].clientY;
    });
    $(document.body).on('touchmove', function(event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度
        //如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。  
        if (y >= lastY && st <= 2) {
            lastY = y;
            event.preventDefault();
        }
        lastY = y;
 
    });
}
