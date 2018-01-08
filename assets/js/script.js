var recipe;
var defaultRecipe = 'cupcakes'

//---
// initial favorite searches
var topics = [
  'chicken', 'bread', 'burrito', 'ramen', 'pizza', 'cheese', 'steak', 'chickpeas'
];
for (var i = 0; i < topics.length; i++) {
  makeFavBtn(topics[i]);
}
addClickEvent();
//---

//---
// Search using favorites
$('#add-to-favs').on('click', function() {
  recipe = $('#recipe-search').val().toLowerCase().trim();
  console.log(recipe);

  if (topics.includes(recipe)) {
    // do nothing
  } else if (recipe === '') {
    // do nothing
  } else {
    topics.push(recipe);

    makeFavBtn(recipe);

    addClickEvent();
  }
})
//---

//---
// search using form input
$('#recipe-click').on('click', function() {
  event.preventDefault();

  removeGifs();

  recipe = $('#recipe-search').val().toLowerCase().trim();

  if (recipe === '') {
    recipe = defaultRecipe;
  }

  giphySearch(recipe);
});
//---

//------------------------------------------------------------------------------
// functions
//------------------------------------------------------------------------------

// remove gifs
function removeGifs() {
  $('#gif-results').children().remove();
}

// add topic button to favorites
function makeFavBtn(topic) {
  var topicButton = $('<button>');

  topicButton.text(topic);
  topicButton.attr('data-food', topic);
  topicButton.addClass('topic-button m-1');
  $('#fav-topics').append(topicButton);

  // var topicClose = $("<button>");
  //
  // topicClose.addClass("close-box");
  // topicClose.append("x");
  //
  // topicButton = topicButton.prepend(topicClose);
}

// add click event to favorite buttons
function addClickEvent() {
  $('.topic-button').on('click', function() {
    removeGifs();

    recipe = $(this).attr('data-food');

    giphySearch(recipe);
  });
}

function animateGifs() {
  $(".gif").on("click", function() {
    var state = $(this).attr('data-state');

    var still = $(this).attr('data-still');
    var animate = $(this).attr('data-animate');

    if (state === 'still') {
      $(this).attr('src', animate);
      $(this).attr('data-state', 'animate');

    } else {
      $(this).attr('src', still);
      $(this).attr('data-state', 'still');
    }
    console.log($(this).attr('data-state'));
  });
}

// API interaction
function giphySearch(recipe) {
  recipe = recipe.replace(/\s/gi, '+');

  // Giphy API
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=recipe+' +
    recipe +
    '&limit=20' +
    '&rating=g' +
    '&api_key=dc6zaTOxFJmzC';


  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      // div to hold gif
      var gifDiv = $("<div class='gif-item m-1'>");

      // Creating an image tag
      var gifImage = $('<img>');

      // Giving the image tag a src attribute of a proprty pulled off the
      // result item
      gifImage.attr('src', results[i].images.fixed_height_still.url);
      gifImage.attr('data-still', results[i].images.fixed_height_still.url)
      gifImage.attr('data-animate', results[i].images.fixed_height.url)
      gifImage.attr('data-state', 'still')

      gifImage.addClass('gif');

      // Append the gifImage we created to the "gifDiv" div we created
      gifDiv.append(gifImage);

      $('#gif-results').append(gifDiv);
    }
    animateGifs();
    console.log(results);
  });
}
