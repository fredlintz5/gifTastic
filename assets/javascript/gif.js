   
var gifs = ["Cats", "Honey Badger", "Batman"];
    

renderButtons();
getData();
create();
remove();
animate();
// deAnimate();


function create() {
  $("#inputButton").click(function(event) {
    event.preventDefault();

    var gif = $("#inputForm").val()

    if (gif !== "") {
      gifs.push(gif);
      $('#buttons').empty();
      renderButtons();
      getData();
    }

  });
}


function remove() {
  $("#removeGifs").click(function() {

      gifs.pop();
      $("#buttons").empty();
      renderButtons();
      getData();

  });
}


function getData() {
  $("#buttons div").click(function() {

    $("#gifs").empty();

    var buttonInput = $(this).html();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonInput +"&api_key=d7b7211e027547b09b92844a2907e598&limit=10&rating";

    $.ajax({
      url: queryURL,
      method: 'GET',
    })
    .done(function(response) {
      $("#gifs").append("<img data-html='" + buttonInput + "' src='" + response.data[0].images.downsized_still.url + "' width='250' >");
    })

  }); 
  
}


function animate() {
  $("#gifs").on("click", "img", function() { 
    
    var buttonInput = $("img").data("html");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonInput +"&api_key=d7b7211e027547b09b92844a2907e598&limit=10&rating";

    if ($("img").data("html") === buttonInput) {
      $.ajax({
        url: queryURL,
        method: 'GET',
      })
      .done(function(response) {
        $("img").replaceWith("<img data-clicked='yes' src='" + response.data[0].images.downsized.url + "' width='250' >");
      }) 
    }
  }); 
}

// function deAnimate() {
//   $("#gifs").on("click", "img", function() { 

//     var buttonInput = $("img").data("html");
//     console.log(buttonInput);
//     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonInput +"&api_key=d7b7211e027547b09b92844a2907e598&limit=10&rating";

//     if ($("img").data("html") === "yes") {
//       $.ajax({
//         url: queryURL,
//         method: 'GET',
//       })
//       .done(function(response) {
//         $("#gifs").replaceWith("<img data-html='" + buttonInput + "' src='" + response.data[0].images.downsized_still.url + "' width='250' >");
//       })
//     }
//   });
// }


function renderButtons() {
  for (var i = 0; i < gifs.length; i++) {
      $("#buttons").append("<div class='btn btn-info btn-block'>" + gifs[i] + "</div>");
  }    
}

 







