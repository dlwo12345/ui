$(document).ready(function () {
    $(document).scroll(function () {
        // 현재 스크롤 위치를 변수에 담는부분
        var sc_top = $(document).scrollTop();

        // 화면 상단 오른쪽 위에 표시되는 스크롤text
        $('.score').text(sc_top);

        // 스크롤이 100이상이면 숨겨져있는 메뉴가 나타나도록 효과 주는 부분
        if (sc_top >= 100) {
            $('.sc_spy2').addClass('on');
        } else {
            $('.sc_spy2').removeClass('on');
        }
    });

});