$(document).ready(function () {
    var list = 0;
    $(".tab_btn li").click(function () {
        list = $(this).index();
        $('.tab_btn li').removeClass('on');
        $('.tab_btn li').eq(list).addClass('on');

        $('.tab_cont > li').hide();
        $('.tab_cont > li').eq(list).show();
    });

    var auto = setInterval(function () {
        if (list == 3) {
            list = 0;
        } else {
            list = list + 1;
        }
        $('.tab_btn li').removeClass('on');
        $('.tab_btn li').eq(list).addClass('on');

        $('.tab_cont > li').hide();
        $('.tab_cont > li').eq(list).show();
    }, 3000);

    $(".tab_wrap").mouseenter(function () {
        clearInterval(auto);
    });

    $(".tab_wrap").mouseleave(function () {
        auto = setInterval(function () {
            if (list == 3) {
                list = 0;
            } else {
                list = list + 1;
            }
            $('.tab_btn li').removeClass('on');
            $('.tab_btn li').eq(list).addClass('on');

            $('.tab_cont > li').hide();
            $('.tab_cont > li').eq(list).show();

        }, 3000);
    });
});