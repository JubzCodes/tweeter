$(document).ready(function() {
  $("#tweet-text").on("keydown", function () {
    let counter = 140;
    counter = counter -  $(this).val().length;
    $(".counter").text (counter);
    if (counter < 0 ) {
      $(".counter").css("color", "red")
    } else {
      $(".counter").css("color", "black")
    }
  });
});