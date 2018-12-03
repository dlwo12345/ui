$(document).ready(function () {
    $(".btn").click(function () {
        $(".modal").fadeIn();
    });
    $(".btn_close").click(function () {
        $(".modal").fadeOut();
    });
});