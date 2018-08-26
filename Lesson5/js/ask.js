$(document).ready(function () {
    var maxLength = 200;
    $('textarea').keyup(function () {
        var length = $(this).val().length;
        var length = maxLength - length;
        $('#count').text(length);
    });
});