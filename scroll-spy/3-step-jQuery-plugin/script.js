/* 2017.11.13 제작자 이재홍
   version 1.0
*/

/*   
   사용방법 -> 

1.scroll되는 영역은 class값으로 scroll을 부여한다
 
    ex)
    <div class="scroll">영역1</div>
    <div class="scroll">영역2</div>
    <div class="scroll">영역3</div>

2. 퀵메뉴 구조는 nav.hong_q_menu>ul>li*갯수로 한다(퀵메뉴 단추의 갯수(li)는 스크롤될 영역 갯수만큼 만든다)
    ex)
    <nav class="hong_q_menu">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </nav>
    
3. ready안에서 호출 $(".hong_q_menu").hongScroll();
*/

$(document).ready(function () {
    $(".hong_q_menu").hongScroll();
});

(function ($) {
    // 생성자
    function HongScroll(selector) {
        // 제이쿼리 최적화용 변수들
        this.$html = null;
        this.$q_menu = null;
        this.$q_menu_ul = null;
        this.$q_menu_li = null;

        this.fixChk = false; // 고정여부 확인

        this.now_scroll = 0; // 현재 나의 스크롤 위치값 저장하는 변수

        this.scroll_num = []; // 영역별 스크롤 위치값 저장하기 위한변수
        this.scroll_last_bottom = 0; // 마지막 위치값 저장하기

        this.$select_li = null; // 메뉴 선택된것이 있는지 체크
        this.select_num = null; // 선택 할때 몇번 선택했는지 체크

        this.start(selector); // 기능 실행
    }

    // start
    HongScroll.prototype.start = function (selector) {
        this.init(selector); // 변수초기화
        this.initEvent(); // 기능
        this.menu_select(); // 첫 시작용 메뉴선택함수 호출
    }

    // 변수 초기화(처음부터 초기화하고 시작하는 변수들)
    HongScroll.prototype.init = function (selector) {
        this.$html = $("html,body");
        this.$q_menu = $(selector); // 퀵메뉴 영역
        this.$q_menu_ul = this.$q_menu.children('ul'); // 퀵메뉴 ul
        this.$q_menu_li = this.$q_menu_ul.children('li'); // 퀵메뉴 li
        this.$scroll = $(".scroll"); // 메뉴 클릭시 이동될 영역들
        this.scroll_length = this.$scroll.length; // 메뉴 클릭시 이동될 영역들 갯수

        this.nav_top = this.$q_menu_ul.offset().top; // 메뉴 고정 실행되는 스크롤 위치

        // 영역별 스크롤 위치값 저장하기
        for (var i = 0; i < this.scroll_length; i++) {
            this.scroll_num[i] = this.$scroll.eq(i).offset().top;
        }
        // 영역의 마지막 bottom값 구하기
        this.scroll_last_bottom = this.$scroll.last().offset().top + this.$scroll.last().outerHeight(true);
        //        alert(this.scroll_last_bottom);
    }

    // 이벤트 모음
    HongScroll.prototype.initEvent = function () {
        // 하위 이벤트에서 실행 주체가 바뀌기 때문에 현재 this값 저장하고 아래에서 땡겨서 사용한다.
        var objThis = this;

        // 이동 메뉴 클릭했을때
        objThis.$q_menu_li.click(function () {
            var index = $(this).index(); // 내가 클릭한 번호
            objThis.$html.animate({
                'scrollTop': objThis.scroll_num[index]
            }); // 이동
        });

        // 윈도우 스크롤 이벤트
        $(window).scroll(function () {
            // 현재 나의 스크롤 위치값 갱신
            objThis.now_scroll = $(window).scrollTop();

            objThis.nav_fixed(); // 헤더 고정함수 호출

            objThis.menu_select(); // 선택 함수 호출(위치값에 해당하는 버튼 색상변경)
        });
    }

    // 헤더 고정 로직
    HongScroll.prototype.nav_fixed = function () {
        // 현재 내 스크롤값이 헤더 네비게이션 위치만큼 왔을때
        if (this.now_scroll >= this.nav_top) {
            // fix여부를 확인한후(거짓이면 실행)
            if (this.fixChk === false) {
                // 고정하고
                this.$q_menu_ul.addClass('fixed');

                // fix 되었다고 값저장
                this.fixChk = true;
            }
        } else { // 현재 내 스크롤이 헤더 네비게이션 위치보다 위에 있을때
            // fix 여부를 확인한후(참이면 실행)
            if (this.fixChk === true) {
                // 고정 풀기
                this.$q_menu_ul.removeClass('fixed');

                // fix를 풀었다고 값저장
                this.fixChk = false;
            }
        }
    }

    // 현재 위치별 메뉴 select(색상변경)
    HongScroll.prototype.menu_select = function () {

        // 각 시작영역과 크거나 같고 다음영역보다 작을때
        for (var i = 0; i < this.scroll_length - 1; i++) {
            // 첫번째 영역 진입 전
            if (this.now_scroll < this.scroll_num[0]) {
                this.select_remove(-1); // select 지우기
            }
            // 각 영역
            else if (this.now_scroll >= this.scroll_num[i] && this.now_scroll < this.scroll_num[i + 1]) {
                this.select(i);
            }

            // 영역이 마지막 또는 그 이후일때
            else if (i == this.scroll_length - 2) {
                // 영역이 마지막일때
                if (this.now_scroll >= this.scroll_num[this.scroll_length - 1] && this.now_scroll < this.scroll_last_bottom) {
                    this.select(this.scroll_length - 1);
                }

                // 영역 마지막 이후 처리
                else if (this.now_scroll > this.scroll_last_bottom) {
                    this.select_remove(-1); // select 지우기
                }
            }
        }
    }

    // 현재 위치별 메뉴 select(색상변경) 체크 및 실행
    HongScroll.prototype.select = function (num) {
        this.select_remove(num); // select 지우기
        this.select_add(num); // select 추가하기
    }


    // 현재 위치별 메뉴 select(색상변경) 지우기
    HongScroll.prototype.select_remove = function (num) {
        if (this.$select_li != null) {
            if (this.select_num != num) {
                this.$select_li.removeClass('select');
                this.$select_li = null;
            }
        }
    }

    // 현재 위치별 메뉴 select(색상변경) 추가하기
    HongScroll.prototype.select_add = function (num) {
        this.$select_li = this.$q_menu_li.eq(num);
        this.$select_li.addClass('select');
        this.select_num = num;
    }

    $.fn.hongScroll = function () {
        this.each(function (index) {
            var hongScroll = new HongScroll(this);
        })
        return this;
    }
})(jQuery)