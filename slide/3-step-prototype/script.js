// 슬라이드 생성자
function Slide() {
    this.wid = 0;
    this.now_num = 0;
    this.slide_length = 0;
    this.auto = null;
    this.$dotli = null;
    this.$panel = null;
    this.$panelLi = null;
    this.start(); // start
}

// start
Slide.prototype.start = function () {
    this.init();
    this.initEvent()
}
// 변수 초기화
Slide.prototype.init = function () {
    this.wid = $('.slide').width();
    this.now_num = $('.dot>li.on').index();
    this.$dotli = $('.dot>li');
    this.slide_length = this.$dotli.length;
    this.$panel = $('.panel');
    this.$panelLi = this.$panel.children('li');
}

// 이벤트 묶음
Slide.prototype.initEvent = function () {
    var objThis = this;
    // 슬라이드 하단 dot버튼 클릭했을때
    objThis.$dotli.click(function () {
        objThis.now_num = $(this).index();
        objThis.slideMove();
    });

    // 이후 버튼 클릭했을때
    $('.next').click(function () {
        objThis.nextChkPlay();
    });

    // 이전 버튼 클릭했을때
    $('.prev').click(function () {
        objThis.prevChkPlay();
    });

    // 오토플레이
    objThis.autoPlay();

    // 오토플레이 멈춤
    objThis.autoPlayStop();

    // 오토플레이 재시작
    objThis.autoPlayRestart();

    // 화면크기 재설정 되었을때
    objThis.resize();
}

// 자동실행 함수
Slide.prototype.autoPlay = function () {
    var objThis = this;
    objThis.auto = setInterval(function () {
        objThis.nextChkPlay();
    }, 3000);
}

// 자동실행 멈춤
Slide.prototype.autoPlayStop = function () {
    var objThis = this;
    objThis.$panelLi.mouseenter(function () {
        clearInterval(objThis.auto);
    });
}


// 자동실행 멈췄다가 재실행
Slide.prototype.autoPlayRestart = function () {
    var objThis = this;
    objThis.$panelLi.mouseleave(function () {
        objThis.auto = setInterval(function () {
            objThis.nextChkPlay();
        }, 3000);
    });
}

// 이전 버튼 클릭시 조건 검사후 슬라이드 무브
Slide.prototype.prevChkPlay = function () {
    if (this.now_num == 0) {
        this.now_num = this.slide_length - 1;
    } else {
        this.now_num--;
    }
    this.slideMove();
}

// 이후 버튼 클릭시 조건 검사후 슬라이드 무브
Slide.prototype.nextChkPlay = function () {
    if (this.now_num == this.slide_length - 1) {
        this.now_num = 0;
    } else {
        this.now_num++;
    }
    this.slideMove();
}

// 슬라이드 무브
Slide.prototype.slideMove = function () {
    this.$panel.stop().animate({
        'margin-left': (this.wid * -1) * this.now_num
    });
    this.$dotli.removeClass('on');
    this.$dotli.eq(this.now_num).addClass('on');
}

// 화면크기 조정시 화면 재설정
Slide.prototype.resize = function () {
    var objThis = this;
    $(window).resize(function () {
        objThis.init();
        objThis.$panel.css({
            'margin-left': (objThis.wid * -1) * objThis.now_num
        });
    });
}