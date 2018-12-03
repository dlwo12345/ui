$(document).ready(function () {
    $('.prev').click(function () {
        $('.list').stop().animate({
            'margin-left': '-900px'
        }, function () {
            $('.list>li').eq(0).appendTo('.list');
            $('.list').css({
                'margin-left': '-450px'
            });
        });
    });
    $('.next').click(function () {
        $('.list').stop().animate({
            'margin-left': '0px'
        }, function () {
            $('.list>li').eq(2).prependTo('.list');
            $('.list').css({
                'margin-left': '-450px'
            });
        });
    });
});