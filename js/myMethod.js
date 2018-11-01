window.onload = function () {
    // 图片数组
    var imgArr = ["http://localhost:63342/carouseMapByJquery/images/1.jpg",
        "http://localhost:63342/carouseMapByJquery/images/2.jpg",
        "http://localhost:63342/carouseMapByJquery//images/3.jpg",
        "http://localhost:63342/carouseMapByJquery/images/4.jpg",
        "http://localhost:63342/carouseMapByJquery/images/5.jpg"];
    // 图片切换的时间间隔
    var interval;

    var imgNum = imgArr.length;
    var $container = $("#container");
    var $imgs = $("#imgs");
    var offset = $imgs.css("left");
    var $buttons = $("#buttons");
    // var $spans = $("span");


    // index表示按钮的索引
    var index = 0;
    var myInterval;

    createMarquee(imgArr);

    var $spans = $('span');
    // 页面加载时就要开始轮播
    play();

    // 创建一个跑马灯方法，其中myInterval为可选参数，表示图片切换的时间间隔
    function createMarquee(imgArr, ...myInterval) {
        if (myInterval.length === 0){
            // 默认一秒切换一次
            interval = 1000;
        }else{
            interval = myInterval[0];
        }
        createImg(imgArr);
        createButton(imgArr);
    }

    // 该方法用于动态加载出图片元素
    function createImg(imgArr) {
        // 创建过渡img
        var $img = $("<img/>");
        $img.prop("src",imgArr[imgArr.length-1]);
        $imgs.append($img);

        $.each(imgArr, function (index, item) {
            var $img = $("<img/>");
            $img.prop("src", item);
            $imgs.append($img);
        });

        // 创建末尾的过渡img
        var $img = $("<img/>");
        $img.prop("src", imgArr[0]);
        $imgs.append($img);
    }

    // 该方法用于动态加载按钮
    function createButton(imgArr) {
        $.each(imgArr, function (index, item) {
            var $span = $("<span></span>");
            $span.prop("index",index);
            // 如果是第0个节点，将class设为active
            if (index === 0){
                $span.css("background","#000");
                // $span.prop("background","#000");// 设置style属性可以用css(),也可以用prop().
                $span.addClass("active");
                // $span.prop("class","active");// 这种方法会把class属性的值全部替换掉，如果需要添加class属性，应该用addClass方法
            }
            $buttons.append($span);
        });
    }

    $("#pre").on("click", function () {
        change(300);
    });
    $("#next").on("click", function () {
        change(-300);
    });

    // change方法包装了点击上一张或者下一张按钮时，发生的事件，其中shift表示图片还需要移动的距离
    function change(shift) {
        offset = parseInt(offset) + shift +"px";
        // 表示要展示第五张照片
        if (parseInt(offset) > -300){
            offset = -300*imgNum + "px";
            index = imgNum-1;
        }
        // 表示要展示第一张照片
        else if (parseInt(offset) < -300*imgNum){
            offset = -300 + "px";
            index = 0;
        }
        // 点击下一张按钮
        else if(shift < 0) {
            index+=1;
        }
        // 点击上一张按钮
        else {
            index-=1;
        }
        $imgs.css("left",offset);
        showButton();
    }

    // 当切换到图片时，使得对应的圆圈按钮背景色变黑，并且使它的class名称设为空
    function showButton() {

        $spans.each(function (index, item) {
            // item是一个dom对象
            var $item = $(item);
            if ($item.prop("class") === "active") {
                $item.css("background","#fff");
                $item.prop("class","");
                // each（）里如果要达到break;效果，应该return false;如果要达到continue;效果，应该return true;
                return false;
            }
        });
        $($spans[index]).prop('class','active');
        $($spans[index]).css('background','#000');
    }

    // 停止自动播放
    function pause() {
        clearInterval(myInterval);
    }

    // 开始自动播放
    function play() {
        myInterval = setInterval(function () {
            next.click()
        },interval);
        // myInterval = setInterval("next.click()",1000);//这种写法也可以
    }
    // 鼠标移动到container容器上时，需要停止自动轮播功能
    $container.on("mouseover",pause);
    // 鼠标离开container容器时，需要开启自动轮播功能
    $container.on("mouseout",play);
    
    $spans.each(function (i, item) {
        $(item).on("click", function () {
            if ($(this).prop("class") === "on"){
                return;
            }
            var myIndex = parseInt($(this).prop("index"));
            var shift = -300 * (myIndex - index);
            change(shift);
            index = myIndex;
            showButton();
        });
    });
}