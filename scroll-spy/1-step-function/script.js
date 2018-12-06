$(document).ready(function () {
    scroll();
});

function scroll() {
    // 제이쿼리 최적화용 변수들
    var $html = null;
    var $header = null;
    var $header_ul = null;
    var $header_li = null;

    var nav_top = 0; // 헤더가 네비게이션 위치만큼 왔을때 고정시키기 위하여 변수값 찾기
    var fixChk = false; // 고정 여부 확인하기

    var now_scroll = 0; // 현재 나의 스크롤 위치값 저장하는 변수

    var section_con_top = []; // 영역별 스크롤 위치값 저장하기 위한변수
    var section_con_length = 0; // 영역 갯수

    var $select_li = null; // 메뉴 선택된것이 있는지 체크
    var select_num = null; // 선택 할때 몇번 선택했는지 체크

    // start
    function start() {
        init();
        event();
    }

    // 변수 초기화(처음부터 초기화하고 시작하는 변수들)
    function init() {
        $html = $('html,body');
        $header = $('.header');
        $header_ul = $header.children('ul');
        $header_li = $header_ul.children('li');

        nav_top = $header.offset().top;
        section_con_length = $header_li.length;

        // 영역별 스크롤 위치값 저장하기
        for (var i = 0; i < section_con_length; i++) {
            section_con_top[i] = $('.section>section').eq(i).offset().top;
        }
    }

    // 이벤트 모음
    function event() {
        // 이동 메뉴 클릭했을때
        $header_li.click(function () {
            var index = $(this).index(); // 내가 클릭한 번호
            $html.animate({
                'scrollTop': section_con_top[index]
            });
        });

        // 윈도우 스크롤 이벤트
        $(window).scroll(function () {
            // 현재 나의 스크롤 위치값 갱신
            now_scroll = $(window).scrollTop();
            header_fixed(); // 헤더 고정함수 호출
            header_select(); // 메뉴 클릭시 이동 함수 호출
            test(); // 디버깅용 함수 호출
        });
    }

    function header_select() {
        if (now_scroll >= section_con_top[0] && now_scroll < section_con_top[1]) {
            select(0);
        } else if (now_scroll >= section_con_top[1] && now_scroll < section_con_top[2]) {
            select(1);
        } else if (now_scroll >= section_con_top[2] && now_scroll < section_con_top[3]) {
            select(2);
        } else if (now_scroll >= section_con_top[3] && now_scroll < section_con_top[4]) {
            select(3);
        } else if (now_scroll >= section_con_top[4]) {
            select(4);
        } else if (now_scroll < section_con_top[0]) {
            if ($select_li != null) {
                $select_li.removeClass('select');
                $select_li = null;
            }
        }
        //        for(var i=0;i<section_con_length-1;i++){
        //            if(now_scroll>=section_con_top[i] && now_scroll<section_con_top[i+1]){
        //                select(i);
        //            }
        //            if(i==section_con_length-2){
        //                if(now_scroll>=section_con_top[section_con_length-1]){
        //                    select(section_con_length-1);
        //                }
        //            }
        //        }  
    }

    // 메뉴 select 체크 및 실행
    function select(num) {
        select_remove(num);
        select_add(num);
    }

    function select_remove(num) {
        if ($select_li != null) {
            if (select_num != num) {
                $select_li.removeClass('select');
                $select_li = null;
            }
        }
    }

    function select_add(num) {
        $select_li = $header_li.eq(num);
        $select_li.addClass('select');
        select_num = num;
    }

    // 헤더 고정 로직
    function header_fixed() {
        // 현재 내 스크롤값이 헤더 네비게이션 위치만큼 왔을때
        if (now_scroll >= nav_top) {
            // fix여부를 확인한후(거짓이면 실행)
            if (fixChk === false) {
                // 고정하고
                $header_ul.addClass('fixed');

                // fix 되었다고 값저장
                fixChk = true;
            }
        } else { // 현재 내 스크롤이 헤더 네비게이션 위치보다 위에 있을때
            // fix 여부를 확인한후(참이면 실행)
            if (fixChk === true) {
                // 고정 풀기
                $header_ul.removeClass('fixed');

                // fix를 풀었다고 값저장
                fixChk = false;
            }
        }
    }

    // 디버깅용(스크롤 위치값 파악하기)
    function test() {
        $('.scrollhtml').html(
            "현재 나의  스크롤 위치는? : " + now_scroll +
            "<br>헤더영역 고정 위치값 : " + nav_top +
            "<br>section_con_top[0] : " + section_con_top[0] +
            "<br>section_con_top[1] : " + section_con_top[1] +
            "<br>section_con_top[2] : " + section_con_top[2] +
            "<br>section_con_top[3] : " + section_con_top[3] +
            "<br>section_con_top[4] : " + section_con_top[4]
        );
    }
    start();
}