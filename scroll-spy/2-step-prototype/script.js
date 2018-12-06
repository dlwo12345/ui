$(document).ready(function () {
    var scroll = new Scroll();
});

// 생성자
function Scroll() {
    // 제이쿼리 최적화용 변수들
    this.$html = null;
    this.$header = null;
    this.$header_ul = null;
    this.$header_li = null;

    this.nav_top = 0; // 헤더가 네비게이션 위치만큼 왔을때 고정시키기 위하여 변수값 찾기
    this.fixChk = false; // 고정 여부 확인하기


    this.now_scroll = 0; // 현재 나의 스크롤 위치값 저장하는 변수

    this.scroll_num = []; // 영역별 스크롤 위치값 저장하기 위한변수


    this.$select_li = null; // 메뉴 선택된것이 있는지 체크
    this.select_num = null; // 선택 할때 몇번 선택했는지 체크

    this.start(); // 기능 실행
}

// start
Scroll.prototype.start = function () {
    this.init(); // 변수초기화
    this.initEvent(); // 기능
}

// 변수 초기화(처음부터 초기화하고 시작하는 변수들)
Scroll.prototype.init = function () {
    this.$html = $('html,body');
    this.$header = $('.header');
    this.$header_ul = this.$header.children('ul');
    this.$header_li = this.$header_ul.children('li');
    this.$scroll = $(".scroll"); // 메뉴 클릭시 이동기능 실행될 대상들

    this.nav_top = this.$header.offset().top; // 메뉴 고정 실행되는 스크롤 위치

    this.scroll_length = this.$scroll.length; // 메뉴 클릭시 이동 실행될 대상들 갯수

    // 영역별 스크롤 위치값 저장하기
    for (var i = 0; i < this.scroll_length; i++) {
        this.scroll_num[i] = this.$scroll.eq(i).offset().top;
    }
}

// 이벤트 모음
Scroll.prototype.initEvent = function () {
    // 하위 이벤트에서 실행 주체가 바뀌기 때문에 현재 this값 저장하고 아래에서 땡겨서 사용한다.
    var objThis = this;

    // 이동 메뉴 클릭했을때
    objThis.$header_li.click(function () {
        var index = $(this).index(); // 내가 클릭한 번호
        objThis.$html.animate({
            'scrollTop': objThis.scroll_num[index]
        });
    });

    // 윈도우 스크롤 이벤트
    $(window).scroll(function () {
        // 현재 나의 스크롤 위치값 갱신
        objThis.now_scroll = $(window).scrollTop();

        objThis.header_fixed(); // 헤더 고정함수 호출

        objThis.header_select(); // 메뉴 클릭시 이동 함수 호출

        objThis.test(); // 디버깅용 함수 호출
    });
}

// 현재 위치별 메뉴 select(색상변경)
Scroll.prototype.header_select = function () {

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

        // 영역이 마지막일때
        else if (i == this.scroll_length - 2) {
            if (this.now_scroll >= this.scroll_num[this.scroll_length - 1]) {
                this.select(this.scroll_length - 1);
            }
        }

    }
}

// 현재 위치별 메뉴 select(색상변경) 체크 및 실행
Scroll.prototype.select = function (num) {
    this.select_remove(num); // select 지우기
    this.select_add(num); // select 추가하기
}

// 현재 위치별 메뉴 select(색상변경) 지우기
Scroll.prototype.select_remove = function (num) {
    if (this.$select_li != null) {
        if (this.select_num != num) {
            this.$select_li.removeClass('select');
            this.$select_li = null;
        }
    }
}

// 현재 위치별 메뉴 select(색상변경) 추가하기
Scroll.prototype.select_add = function (num) {
    this.$select_li = this.$header_li.eq(num);
    this.$select_li.addClass('select');
    this.select_num = num;
}

// 헤더 고정 로직
Scroll.prototype.header_fixed = function () {
    // 현재 내 스크롤값이 헤더 네비게이션 위치만큼 왔을때
    if (this.now_scroll >= this.nav_top) {
        // fix여부를 확인한후(거짓이면 실행)
        if (this.fixChk === false) {
            // 고정하고
            this.$header_ul.addClass('fixed');

            // fix 되었다고 값저장
            this.fixChk = true;
        }
    } else { // 현재 내 스크롤이 헤더 네비게이션 위치보다 위에 있을때
        // fix 여부를 확인한후(참이면 실행)
        if (this.fixChk === true) {
            // 고정 풀기
            this.$header_ul.removeClass('fixed');

            // fix를 풀었다고 값저장
            this.fixChk = false;
        }
    }
}

// 디버깅용(스크롤 위치값 파악하기)
Scroll.prototype.test = function () {
    $('.scrollhtml').html(
        "현재 나의  스크롤 위치는? : " + this.now_scroll +
        "<br>헤더영역 고정 위치값 : " + this.nav_top +
        "<br>scroll_num[0] : " + this.scroll_num[0] +
        "<br>scroll_num[1] : " + this.scroll_num[1] +
        "<br>scroll_num[2] : " + this.scroll_num[2] +
        "<br>scroll_num[3] : " + this.scroll_num[3] +
        "<br>scroll_num[4] : " + this.scroll_num[4]
    );
}