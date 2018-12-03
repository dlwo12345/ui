$(document).ready(function () {
    $('.lnb>ul>li').hover(function () {
        $(this).find('.sub').stop().slideToggle();
    });
    $('.more').click(function (event) {
        event.preventDefault();
        $('.right_gnbWrap').addClass('on');
    });
    $('.close').click(function (event) {
        event.preventDefault();
        $('.right_gnbWrap').removeClass('on');
        setTimeout(function () {
            $('.right_gnb>li>a').removeClass('on');
            $('.right_gnb>li>ul').slideUp();
        }, 300)
    });
    $('.right_gnb>li>a').click(function () {

        var check = $(this).hasClass('on');
        if (check) {
            $(this).removeClass('on');
            $(this).siblings('ul').stop(true, true).slideUp();
        } else {
            $('.right_gnb>li>a').removeClass('on');
            $('.right_gnb>li>ul').stop().slideUp();
            $(this).addClass('on');
            $(this).siblings('ul').stop(true, true).slideDown();
        }
    });
    $(window).resize(function () {
        $('.right_gnbWrap').removeClass('on');
    });
});