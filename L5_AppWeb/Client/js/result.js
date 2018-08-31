// $(document).ready(function (){


// function doPoll(){
//     $.post('./result.html', function(data) {
//         alert(data);  // process results here
//         setTimeout(doPoll,5000);
//     });
// }
// });

$(document).ready(function poll() {

    setTimeout(function () {
        $.ajax({
            url: "http://localhost:8080/",
            type: "PUT",
            success: function (data) {
                console.log("polling");
            },
            dataType: "json",
            complete: poll,
            timeout: 2000
        })
    }, 5000);
})();