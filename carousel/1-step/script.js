$(document).ready(function () {
    $('.prev').click(function () {
        $('.list').stop().animate({
            'margin-left': '-800px'
        }, function () {
            $('.list li:first-child').appendTo('.list');
            $('.list').css({
                'margin-left': '-400px'
            });
        });
    });
    $('.next').click(function () {
        $('.list').stop().animate({
            'margin-left': '0px'
        }, function () {
            $('.list li:last-child').prependTo('.list');
            $('.list').css({
                'margin-left': '-400px'
            });
        });
    });
});