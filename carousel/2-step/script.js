$(document).ready(function () {
    $('.prev').click(function () {
        $('.box').stop().animate({
            'margin-left': '-400px'
        }, function () {
            $('.box div:first-child').appendTo('.box');
            $('.box').css({
                'margin-left': '-200px'
            });
        });
    });

    $('.next').click(function () {
        $('.box').stop().animate({
            'margin-left': '0px'
        }, function () {
            $('.box div:last-child').prependTo('.box');
            $('.box').css({
                'margin-left': '-200px'
            });
        });
    });
});