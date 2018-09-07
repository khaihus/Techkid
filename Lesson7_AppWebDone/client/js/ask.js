$(document).ready(function() {
  $('#questionInput').on("input", function() {
    $('#count').text($('#questionInput').attr('maxlength') - $('#questionInput').val().length);
  });
});