var ingredient;
var defaultIngredient = 'muffin'

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
  ingredient = $('#recipe-search').val().toLowerCase().trim();

  if (topics.includes(ingredient)) {
    // do nothing
  } else if (ingredient === '') {
    // do nothing
  } else {
    topics.push(ingredient);

    makeFavBtn(ingredient);

    addClickEvent();
  }
})
//---

//---
// search using form input
$('#recipe-click').on('click', function() {
  event.preventDefault();

  removeGifs();

  ingredient = $('#recipe-search').val().toLowerCase().trim();

  if (ingredient === '') {
    ingredient = defaultIngredient;
  }

  giphySearch(ingredient);
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
  topicButton.addClass('topic-button grey-text m-1');
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

    ingredient = $(this).attr('data-food');

    giphySearch(ingredient);
  });
}

// API interaction
function giphySearch(ingredient) {
  ingredient = ingredient.replace(/\s/gi, '+');

  // Giphy API
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=recipe+' +
    ingredient +
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

      // Get the image and insert it inside the modal
      gifImage.on('click', function() {
        $('#my-modal').addClass('modal');
        $('#modal-img').attr('src', $(this).attr('data-animate'));
      })

      // Append the gifImage we created to the "gifDiv" div we created
      gifDiv.append(gifImage);

      $('#gif-results').append(gifDiv);
    }

    // close modal
    $('.close').on('click', function() {
      $('#my-modal').removeClass('modal');
      $('#modal-img').attr('src', '');
    })
  });
}
