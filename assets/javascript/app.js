var animals = ["dog", "cat", "fish", "bird"];

function displayAnimalGif() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      var rating = (results[i].rating); 
      var p = $("<p>").text("Rating: " + rating); 
      var gifAnimate = (results[i].images.fixed_height.url);
      var gifStill = (results[i].images.fixed_height_still.url); 
      var animalImage = $("<img class='gif'>");

      animalImage.attr("src", gifStill);
      animalImage.attr("url-animate", gifAnimate);
      animalImage.attr("url-still", gifStill);
      animalImage.attr("data-state", "still");

      var gifDiv = $("<div class='item'>"); 
      gifDiv.append(animalImage);
      gifDiv.append(p);

      $("#animal-gifs").prepend(gifDiv);

      //CLEAR
      $(".animal-btn").on("click", function() {
        $(".item").empty();
      });
    };
    //ANIMATE
    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("url-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("url-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
}

function renderButtons() {

  $("#animal-buttons").empty();

  for (var i = 0; i < animals.length; i++) {

    var a = $("<button>");
    a.addClass("animal-btn");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#animal-buttons").append(a);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
});

$(document).on("click", ".animal-btn", displayAnimalGif);
renderButtons();

