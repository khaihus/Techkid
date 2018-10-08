$(document).ready(function () {
    $('#AddGame').on('click', function (e) {
        $.ajax({
            url: `http://localhost:6969/game`,
            method: 'POST',
            data: {
                name1: $('#name1').val(),
                name2: $('#name2').val(),
                name3: $('#name3').val(),
                name4: $('#name4').val(),
            },
            error: function () {
                console.log("Can't create new game!!!");
            }
        });
    });
});