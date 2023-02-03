$(document).ready(function () {
  $("#tweet-text").on('keyup', function () {
    let inputLength = $(this).val().length;
    let maxChars = 140;
    let countLimit = maxChars - inputLength;

    $(".counter").html(countLimit);

    if (countLimit < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black"); ß
    }
  })
});