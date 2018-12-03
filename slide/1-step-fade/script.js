$(document).ready(function () {
    // 좌우버튼, 동그라미 버튼 연동 //
    var wid = $(".slider").width();
    var i = $(".btn li.on").index();
    var len = $(".panel li").length;

    $(".prev").click(function () {
        if (i == 0) {
            i = len - 1;
        } else {
            i = i - 1;
        }
        showSlide();
    });

    $(".next").click(function () {
        if (i == 3) {
            i = 0;
        } else {
            i = i + 1;
        }
        showSlide();
    });

    $(".btn li").click(function () {
        i = $(this).index();
        showSlide();
    });

    function showSlide() {
        $(".btn li").removeClass("on");
        $(".btn li").eq(i).addClass("on");
        $(".panel li").stop(true, true).fadeOut();
        $(".panel li").eq(i).stop(true, true).fadeIn();
    }
});