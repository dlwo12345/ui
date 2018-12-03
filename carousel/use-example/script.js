// 캐러셀 시작
function carousel() {
    var auto = null;
    var $carousel_list = null;
    var $section_carousel = null;
    var $carousel_prev = null;
    var $carousel_next = null;

    function start() {
        init();
        eventInit();
    }

    function init() {
        $carousel_list = $('.carousel_list');
        $section_carousel = $('.section_carousel');
        $carousel_prev = $('.carousel_prev');
        $carousel_next = $('.carousel_next');
    }

    function eventInit() {
        // 왼쪽 화살표 눌렀을때
        $carousel_prev.click(function () {
            carousel_prevMove();
        });

        // 오른쪽 화살표 눌렀을때
        $carousel_next.click(function () {
            carousel_nextMove();
        });

        // 자동실행
        carousel_autoPlay();

        // 자동실행 멈춤
        carousel_autoPlayStop();
        
        // 자동실행 재시작
        carousel_autoPlayRestart();

        // 리사이즈 사이즈 재조정
        resize();
    }
    // 자동실행
    function carousel_autoPlay() {
        auto = setInterval(function () {
            carousel_nextMove();
        }, 5000);
    }
    // 자동실행 멈춤
    function carousel_autoPlayStop() {
        /* 마우스 올렸을때 캐러셀 자동 멈춤 */
        $(".carousel_view").mouseenter(function () {
            clearInterval(auto);
        });
    }
    // 자동실행 재시작
    function carousel_autoPlayRestart() {
        $(".carousel_view").mouseleave(function () {
            carousel_autoPlay();
        });
    }
    // 다음버튼 눌렀을때,자동실행 실제 동작하는 부분
    function carousel_prevMove() {
        $carousel_list.stop().animate({
            'margin-left': '0px'
        }, function () {
            $carousel_list.children('li').last().prependTo('.carousel_list');
            $carousel_list.css({
                marginLeft: -$carousel_list.children('li').outerWidth(true)
            });
        });
    }

    // 이전버튼 눌렀을때 실제 동작하는 부분
    function carousel_nextMove() {
        $carousel_list.stop().animate({
            'margin-left': -$carousel_list.children('li').outerWidth(true) * 2
        }, function () {
            $carousel_list.children('li').first().appendTo('.carousel_list');
            $carousel_list.css({
                'margin-left': -$carousel_list.children('li').outerWidth(true)
            });
        });
    }

    // 화면크기 조정시 화면 재설정
    function resize() {
        $(window).resize(function () {
            init();
        });
    }
    start();
}
// 캐러셀 끝