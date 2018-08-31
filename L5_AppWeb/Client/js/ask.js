const questionInput = document.getElementById('questionInput');
const count = document.getElementById('count');
questionInput.addEventListener("input", function () {
    count.innerText = 200 - questionInput.value.length;
});

//cách làm = jquery ở thư mục /Practice/Lesson5

//cách 2:
// $(document).ready(function() {
//     $('#questionInput').on("input", function() {
//       $('#count').text($('#questionInput').attr('maxlength') - $('#questionInput').val().length);
//     });
//   });