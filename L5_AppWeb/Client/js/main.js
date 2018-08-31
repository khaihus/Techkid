//js for index.html
$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:6969/question',
        method: 'GET',
        success: function (data) {
            $('#questionContent').text(data.question.questionContent);
            $('.answer').attr("data-id", data.question.id);
        },
        error: function () {
            console.log("fail!");
        }
    });

    $('.answer').on('click', function (event) {
        let answer = $(event.target).attr('data-answer');
        let questionId = $(event.target).attr('data-id');

        console.log(answer, questionId);

        $.ajax({
            url: 'http://localhost:6969/answer',
            method: 'PUT',
            dataType: 'html',
            data: {
                answer: answer,
                id: questionId
            },
            success: function (data) {
                $('#questionContent').text(data.question.questionContent);
                $('.answer').attr("data-id", data.question.id);

                // questions.txt
                // $.post(
                //     'http://localhost:6969/answer', {
                //         
                //     },
                //     function () {
                //         console.log("post func Success!");
                //     }, 'JSON'
                // )
            },
            error: function () {
                console.log("put func Fail!");
            }
        });
    });


    
    // $('.result').on('click', function (event) {
    //     let answer = $(event.target).attr('data-answer');
    //     let questionId = $(event.target).attr('data-id');

    //     console.log(answer, questionId);

    //     $.ajax({
    //         url: 'http://localhost:6969/answer',
    //         method: 'PUT',
    //         dataType: 'html',
    //         data: {
    //             answer: answer,
    //             id: questionId
    //         },
    //         success: function (data) {
    //             $('#questionContent').text(data.question.questionContent);
    //             $('.answer').attr("data-id", data.question.id);

    //             $.post(
    //                 'http://localhost:6969/answer', {
    //                     id: questionId,
    //                     y: yes,
    //                     n: no
    //                 },
    //                 function () {
    //                     console.log("post func Success!");
    //                 }, 'JSON'
    //             )
    //         },
    //         error: function () {
    //             console.log("fail!");
    //         }
    //     });
    // });
});